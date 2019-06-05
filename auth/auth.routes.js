const router = require("express").Router();

const authControllers = require("./auth.controllers");

//Authorization code request
router.get("/login", authControllers.login);

//Tokens request
router.get("/callback", authControllers.callback);

//new token from refresh token
router.get("/newtoken/:refresh_token", authControllers.new_token);

module.exports = router;
