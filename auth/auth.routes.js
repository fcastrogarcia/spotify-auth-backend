const router = require("express").Router();
const passport = require("passport");

const { login, callback } = require("./auth.controllers");

//Authorization code request
router.get("/login", login);

//Tokens request
router.get(
  "/callback",
  passport.authenticate("spotify", {
    failureMessage: "Error while authenticating"
  }),
  callback
);

module.exports = router;
