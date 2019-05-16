const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./auth/auth.routes");

app.use(cors()).use(cookieParser());

app.use("/", authRoutes);

const PORT = process.env.PORT || 8888;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
