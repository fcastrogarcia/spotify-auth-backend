const dotenv = require('dotenv').config()
const express = require('express')
const app = express() 
const querystring = require('querystring')
const axios = require('axios')
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./auth/authRoutes')


app.use(cors())
   .use(cookieParser());

authRoutes(app)

 

const PORT = process.env.PORT
app.listen(PORT, console.log(`Server is running on port ${PORT}`))