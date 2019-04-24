const dotenv = require('dotenv').config()
const express = require('express')
const app = express() 
const authRouter = require('./auth/auth.routes')

app.use('/', authRouter)
  

const PORT = process.env.PORT
app.listen(PORT, console.log(`Server is running on port ${PORT}`))