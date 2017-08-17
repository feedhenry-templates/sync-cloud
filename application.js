var express = require('express');
var mbaasApi = require('fh-mbaas-api');
var mbaasExpress = mbaasApi.mbaasExpress();
var Promise = require('bluebird');
var sync = require('./lib/sync');

// Initialise sync, define custom handlers, and interceptors
Promise.resolve()
  .then(() => sync.init())
  .then(() => {

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

    var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
    var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
    var server = app.listen(port, host, function() {
      console.log("App started at: " + new Date() + " on port: " + port); 
    });
  })
  .catch((err) => {
    console.error('failed to start application', err);
    process.exit(1);
  });
