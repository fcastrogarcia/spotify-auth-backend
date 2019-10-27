require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./auth/auth.routes");

app.use(cors());
app.use(cookieParser());
//passport config
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/", authRoutes);

const PORT = process.env.PORT || 8888;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
