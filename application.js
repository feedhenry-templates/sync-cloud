var express = require('express');
var mbaasApi = require('fh-mbaas-api');
var mbaasExpress = mbaasApi.mbaasExpress();

// Define custom sync handlers and interceptors
require('./lib/sync.js');

// Securable endpoints: list the endpoints which you want to make securable here
var securableEndpoints = [];

var app = express();

// Note: the order which we add middleware to Express here is important!
app.use('/sys', mbaasExpress.sys(securableEndpoints));
app.use('/mbaas', mbaasExpress.mbaas);

// Note: important that this is added just before your own Routes
app.use(mbaasExpress.fhmiddleware());

// Add extra routes here

// Important that this is last!
app.use(mbaasExpress.errorHandler());

var port = process.env.FH_PORT || process.env.VCAP_APP_PORT || 8001;
var server = app.listen(port, function(){
  console.log("App started at: " + new Date() + " on port: " + port);
});
