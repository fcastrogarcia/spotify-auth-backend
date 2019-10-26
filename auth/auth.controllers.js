const { tokens, generateRandomString } = require("./utils");
const querystring = require("querystring");
const request = require("request");

const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;
const frontend_uri = process.env.FRONTEND_URI;
const client_secret = process.env.CLIENT_SECRET;

const stateKey = "spotify_auth_state";

const loginController = (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope =
    "user-read-private user-read-email user-top-read playlist-modify-private playlist-modify-public";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
        show_dialog: true
      })
  );
};

const callbackController = async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch"
        })
    );
  }

  res.clearCookie(stateKey);

  const auth = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  //set options for the request
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code"
    },
    headers: {
      Authorization: `Basic ${auth}`
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token,
        refresh_token = body.refresh_token;

      const options = {
        url: "https://api.spotify.com/v1/me",
        headers: { Authorization: "Bearer " + access_token },
        json: true
      };

      res.redirect(
        frontend_uri +
          "home?" +
          querystring.stringify({
            access_token,
            refresh_token
          })
      );
    } else {
      res.redirect(frontend_uri);
    }
  });
};

const getNewToken = async (req, res) => {
  const { refresh_token } = req.params;
  const refresh_token_data = querystring.stringify({
    grant_type: "refresh_token",
    refresh_token: refresh_token
  });
  const response = await tokens
    .post("/", refresh_token_data)
    .catch(error => error.response);

  res.json(response.data);
};

module.exports.login = loginController;
module.exports.callback = callbackController;
module.exports.new_token = getNewToken;
