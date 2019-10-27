const SpotifyStrategy = require("passport-spotify").Strategy;
const { client_id, client_secret, redirect_uri } = require("./keys");

module.exports = passport => {
  passport.use(
    new SpotifyStrategy(
      {
        clientID: client_id,
        clientSecret: client_secret,
        callbackURL: redirect_uri
      },
      function(accessToken, refreshToken, expires_in, profile, done) {
        try {
          const user = {
            ...profile,
            accessToken,
            refreshToken,
            expires_in
          };
          done(null, user);
        } catch (err) {
          done(err, null, {
            message: "An error ocurred trying to authenticate the user"
          });
        }
      }
    )
  );
};
