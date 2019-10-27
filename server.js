require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { mongo_uri } = require("./config/keys");
const authRoutes = require("./auth/auth.routes");

app.use(cors());
app.use(cookieParser());
//db config
const db = mongo_uri;
//db connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("db connected succesfully"))
  .catch(err => console.log(err));
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
