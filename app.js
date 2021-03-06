/*eslint-env node*/

var requestHandlers = require('./server/requestHandlers');
//instagramHelper interfaces with the instagram api, 
//and parses data received from it
var instagramHelper = require('./server/instagramHelper');
// var cors = require('cors');

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

app.get('/api/allImages', instagramHelper.getAllImages);

app.get('/api/flights', requestHandlers.getFlights);
app.get('/api/place', requestHandlers.getImagesFromPlace);

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
