
const authControllers = require('./auth.controllers')


module.exports = (app) => { 
  
//Authorization code request
  app.get('/login', authControllers.login)

    
//Tokens request 
  app.get('/callback', authControllers.callback)

}
    
       
 
