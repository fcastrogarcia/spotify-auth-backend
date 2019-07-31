const { tokens, generateRandomString } = require("./utils");
const querystring = require("querystring");

const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;
const frontend_uri = process.env.FRONTEND_URI;

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

  res.clearCookie(stateKey);

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch"
        })
    );
  }

  const data = querystring.stringify({
    code: code,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code"
  });

  const response = await tokens
    .post("/", data)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      res.redirect(frontend_uri);
    });

  const { access_token, refresh_token } = response;

  // res.redirect(
  //   frontend_uri +
  //     "home?" +
  //     querystring.stringify({
  //       access_token: access_token,
  //       refresh_token: refresh_token
  //     })
  // );
  res.json({ access_token, refresh_token });
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
