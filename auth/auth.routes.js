const router = require('express').Router();

const authControllers = require('./auth.controllers')



//Authorization code request
  router.get('/login', authControllers.login)

    
//Tokens request 
  router.get('/callback', authControllers.callback)


module.exports = router
    
       
 
