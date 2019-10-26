<h1>Backend Your Top Music</h1>
<p></p>
<h2>Prerequisites</h2>
<ul>
<li>A Heroku account for deployment.</li>
</ul>
<h2>Installing</h2>
<ol>
<li><p>Clone this repo.</p></li>
<li>
  <p>Install both server and client dependencies:</p>
  <code>npm install && npm run client-install</code></li>
<li>
  <p>Create and .env file & declare env variables for development:</p>
  <code>touch .env</code><br>
  <p>Env file:</p>
  <code>MONGO_URI='ENTER_MONGO_URI_HERE'<br>
SECRET=ENTER_SECRET_HERE</code>
</li>
</ol>
<h2>Development</h2>
<p>Run both server and client with Concurrently package:</p>
<code>npm run dev</code>

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
