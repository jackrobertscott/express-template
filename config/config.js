/* jshint node:true */
'use strict';

var path = require('path');
var fs = require('fs');

// set this to root directory
var baseDir = path.join(__dirname, '..');

/**
 * Set main app variables.
 */
var config = module.exports = {
  // Don't set port to 3000 or the browserSync will fail
  port: process.env.PORT || 5000,
  main: path.join(baseDir, 'server.js'),
  view: {
    engine: 'jade',
    options: {
      layout: false
    }
  }
};

/**
 * Set app paths.
 */
config.paths = {
  app: path.join(baseDir, 'app'),
  public: path.join(baseDir, 'public'),
  bower_components: path.join(baseDir, 'bower_components'),
  node_modules: path.join(baseDir, 'node_modules'),

  // App modules
  modules: [
    path.join(baseDir, 'app', 'base'),
    path.join(baseDir, 'app', 'blog'),
    path.join(baseDir, 'app', 'page')
  ]
};

/**
 * Require other config files.
 */
require('./gulp')(config);
require('./firebase')(config);
