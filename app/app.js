var config = require('../config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var wrench = require('wrench');

// Get express app
var app = module.exports = express();

////////////
// CONFIG //
////////////

// View engine setup
app.set('views', config.paths.views);
app.set('view engine', 'jade');

////////////////
// MIDDLEWARE //
////////////////

// Uncomment after placing your favicon in /public
//app.use(favicon(path.join(config.paths.public, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(lessMiddleware(config.paths.public));
app.use(express.static(config.paths.public));

//////////////////////////
// CONTROLLERS / ROUTES //
//////////////////////////

wrench.readdirSyncRecursive(config.paths.controllers)
  .map(function(file) {
    require(path.join(config.paths.controllers, file))(app);
  });

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

////////////
// ERRORS //
////////////

// Development error handler, will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler, no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
