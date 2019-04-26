const querystring = require('querystring')
const request = require('request')
const axios = require('axios')

const client_id = process.env.CLIENT_ID
const redirect_uri = process.env.REDIRECT_URI
const client_secret = process.env.CLIENT_SECRET

const generateRandomString = length => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijqlmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
      text += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
    }
    return text;
  };

const stateKey = 'spotify_auth_state'

const tokens = axios.create({
  baseURL: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  responseType: 'json'
})

module.exports = (app) => { 
  
//Authorization code request
  app.get('/login', (req, res) => {

    const state = generateRandomString(16)
    res.cookie(stateKey, state) 

    const scope = 'user-read-private user-read-email user-top-read';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }))
    })

    
//Tokens request 
  app.get('/callback', async (req, res) => {

    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    res.clearCookie(stateKey)
    
    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    }
    
    const data = querystring.stringify({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    })
    
    const response = await tokens.post('/', data)
      .then(res => { return res.data })
      .catch(err=>{console.log(err)})

    const { access_token, refresh_token } = response
    //probar sacar data desde acá
    res.redirect('/#' +
      querystring.stringify({
        access_token: access_token,
        refresh_token: refresh_token
        }))
      });       
}
    
       
 
