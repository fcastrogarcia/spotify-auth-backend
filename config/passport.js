const SpotifyStrategy = require("passport-spotify").Strategy;
const User = require("../models/User");
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
        User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          return done(err, user);
        });
      }
    )
  );
};
