const passport = require("passport");
const querystring = require("querystring");

//Redirect URL (returnTo) is passed as query parameter, stored in passport authenticate
//function and then parsed in callback route to redirect the tokens and user profile data.
exports.login = (req, res, next) => {
  const { returnTo } = req.query;
  const state = returnTo
    ? Buffer.from(JSON.stringify({ returnTo })).toString("base64")
    : undefined;
  const authenticator = passport.authenticate("spotify", {
    scope: [
      "user-read-private",
      "user-read-email",
      "user-top-read",
      "playlist-modify-private",
      "playlist-modify-public"
    ],
    showDialog: true,
    state
  });
  authenticator(req, res, next);
};

exports.callback = (req, res) => {
  const { state } = req.query;
  const {
    accessToken,
    refreshToken,
    displayName,
    profileUrl,
    photos
  } = req.user;

  const { returnTo } = JSON.parse(Buffer.from(state, "base64").toString());
  if (typeof returnTo === "string") {
    return res.redirect(
      `${returnTo}?${querystring.stringify({
        access_token: accessToken,
        refresh_token: refreshToken,
        displayName,
        profileUrl,
        profilePicURL: photos[0]
      })}`
    );
  }
};
