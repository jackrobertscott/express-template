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
      layout: false,
    },
  },
};

/**
 * Set app paths.
 */
config.paths = {
  app: path.join(baseDir, 'app'),
  public: path.join(baseDir, 'public'),
  bowerComponents: path.join(baseDir, 'bower_components'),
  nodeModules: path.join(baseDir, 'node_modules'),
};
var modules = require(path.join(config.paths.app, 'modules.json'));
config.paths.modules = {
  dirs: modules.map(function(mod) {
    return path.join(config.paths.app, mod.dir);
  }),
  models: modules.map(function(mod) {
    return path.join(config.paths.app, mod.dir, mod.models || 'models');
  }),
  views: modules.map(function(mod) {
    return path.join(config.paths.app, mod.dir, mod.views || 'views');
  }),
  controllers: modules.map(function(mod) {
    return path.join(config.paths.app, mod.dir, mod.controllers || 'controllers');
  }),
  scripts: modules.map(function(mod) {
    return path.join(config.paths.app, mod.dir, mod.scripts || 'scripts');
  }),
  styles: modules.map(function(mod) {
    return path.join(config.paths.app, mod.dir, mod.styles || 'styles');
  }),
};


modules.map(function(mod) {
  mod.dir = path.join(config.paths.app, mod.dir);
  return {
    dir: mod.dir,
    scripts: path.join(mod.dir, mod.scripts || 'scripts'),
    styles: path.join(mod.dir, mod.styles || 'styles'),
    views: path.join(mod.dir, mod.views || 'views'),
    controllers: path.join(mod.dir, mod.controllers || 'controllers'),
    models: path.join(mod.dir, mod.models || 'models'),
  };
});

/**
 * Require other config files.
 */
require('./gulp')(config);
require('./firebase')(config);
