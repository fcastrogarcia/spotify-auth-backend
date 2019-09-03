const axios = require("axios");

const client_secret = process.env.CLIENT_SECRET;
const client_id = process.env.CLIENT_ID;

const generateRandomString = length => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijqlmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
const auth = Buffer.from(
  `${client_id}:${client_secret}`
).toString("base64");

const tokens = axios.create({
  baseURL: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      `Basic ${auth}`,
    "Content-Type": "application/x-www-form-urlencoded"
  },
  responseType: "json"
});

module.exports = {
  generateRandomString: generateRandomString,
  tokens: tokens
};
