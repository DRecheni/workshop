/*
* Advanced Cloud Code Example
*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser')
const lodash = require("lodash")
const querystring = require('querystring');

app.use(bodyParser.json())


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*
* Exporting of module.exports.app is required.
* we mount it automaticaly to the Parse Server Deployment.
*/

module.exports = app


