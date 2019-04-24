const express = require('express')
const router = express.Router()
const querystirng = require('querystring')
const axios = require('axios')

const client_id = process.env.CLIENT_ID
const redirect_uri = process.env.REDIRECT_URI
const client_secret = process.env.CLIENT_SECRET


//random string que se pasa como state 
const generateRandomString = (length) => {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijqlmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        text+= possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

const stateKey = 'spotify_auth_state'


//Authorization request 
router.get('/login', (req, res) => {
    var state = generateRandomString(16)
    res.cookie(stateKey, state) 

    var scope = 'user-read-private user-read-email user-top-read';
    res.redirect('https://accounts.spotify.com/authorize' +
        querystirng.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }))
    })    

//Access token y refresh token request    
router.get('/callback', (req, res) => {
    const code = req.query.code || null
    const state = req.query.state || null
    const storedState = req.cookies ? req.cookies[stateKey] : null

    if (state === null || state !== storedState) {
        res.redirect('#' +
        querystring.stringify({
            error: 'state_mismatch'
        }))
    } else {
        res.clearCookie(stateKey)
        
        const data = querystring.stringify({
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        })
//Axios instance for getting Tokens        
        const tokens = axios.create({
            baseURL: 'https://accounts.spotify.com/api/token',
            headers: {
              'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
          })
        
        tokens.post('/', data)
            .then( res => {
                console.log(res)
            })
            .catch( error => {
                console.log(error)
            })
    }

    
})    
    
module.exports = router