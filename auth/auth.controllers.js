const generateRandomString = require('./auth.funcs').generateRandomString
const tokens = require('./auth.funcs').tokens
const querystring = require('querystring')

const client_id = process.env.CLIENT_ID
const redirect_uri = process.env.REDIRECT_URI

const stateKey = 'spotify_auth_state'

const loginController = (req, res) => {

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
    }

const callbackController = async (req, res) => {

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
      .then( res => { return res.data })
      .catch( err => { res.redirect('/#' +
        querystring.stringify({
          error: 'invalid_token'
        }))})

    const { access_token, refresh_token } = response
    //probar sacar data desde acá
    res.redirect('http://localhost:3000/home?' +
      querystring.stringify({
        access_token: access_token,
        refresh_token: refresh_token
        }))
    
    
      }

module.exports.login = loginController  
module.exports.callback = callbackController //hacer un obejto solo