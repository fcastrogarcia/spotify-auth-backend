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
        profile.accessToken = accessToken;
        profile.refreshToken = refreshToken;
        // User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
        //   return done(err, user);
        // });
        return done(null, profile);
      }
    )
  );
};
