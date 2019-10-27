<h1>Spotify Auth Backend</h1>
<p>Node server that handles authentication with Spotify account and it's set to dinamically redirect to a client app passing to it tokens and user data as query parameters.</p>
<h2>Prerequisites</h2>
<ul>
<li>A Heroku account for deployment.</li>
</ul>
<h2>App registration</h2>
For app registration login in <a href='https://developer.spotify.com/dashboard/' target='_blank'>Spotify dashboard</a>, create a new app & get your client ID and secret. Whitelist redirect_uri as http://localhost:8888/callback.<br>

<h2>Installing</h2>
<ol>
<li><p>Clone this repo.</p></li>
<li>
  <p>Install dependencies:</p>
  <code>npm install</code></li>
<li>
  <p>Create and .env file & declare env variables for development:</p>
  <code>touch .env</code><br>
  <p>Env file:</p>
<code>CLIENT_SECRET=ENTER_SPOTIFY_APP_CLIENT_SECRET_HERE</code><br>
<code>CLIENT_ID=ENTER_SPOTIFY_APP_CLIENT_ID_HERE</code>
</li>
</ol>
<h2>Development</h2>
<ul>
<li>Modify the scope array to get other permissions. Check <a href='https://developer.spotify.com/documentation/web-api/' target='_blank'>Spotify Web API</a> for more data.</li>
<li>Hit <strong>http://localhost:8888/login?returnTo=http://localhost:3000</strong> and after the auth flow it's completed it will be redirected to localhost:3000 with the access token to make further requests and other user data as query parameters.</li>
</ul>
<h2>Deployment</h2>
<p>This assumes you have installed Heroku CLI tools. Otherwise, you can always link your repo directly to your app in Heroku dashboard.</p>
<ol>
  <li>In the root directory of the repo, run <code>heroku create</code></li>
  <li>Run <code>git push heroku master</code> for building server and client and deploying.</li>
  <li>
  <p>For setting config variables in Heroku:</p>
  <code>heroku config:set CONFIG_VARIABLE=example_value</code>
  </li>
</ol>
<h2>Dependencies</h2>
<ul>
<li>passport</li>
<li>passport-spotify</li>
</ul>
