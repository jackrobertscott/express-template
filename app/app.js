/* jshint node:true */
'use strict';

var config = require('../config/config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

// Get express app
var app = module.exports = express();

// Load view folders within each module
app.set('views', config.paths.modules.views);
app.set('view engine', config.view.engine);
app.set('view options', config.view.options);

// Uncomment after placing your favicon in /public
//app.use(favicon(path.join(config.paths.public, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cookieParser());

// Load static files
app.use(express.static(config.paths.public));
app.use(express.static(config.paths.bowerComponents));

// load in the controllers from each module
config.paths.modules.controllers.forEach(function(controller) {
  if (!fs.existsSync(controller)) return;

  // Check the module is a '*.js' file then require
  fs.readdirSync(controller)
    .filter(function(file) {
      return (/\.js$/i).test(file);
    })
    .forEach(function(file) {
      require(path.join(controller, file))(app);
    });
});

// No route matched; catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler, will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler, no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});
