/* jshint node:true */
'use strict';

var path = require('path');

module.exports = function(config) {
  config.gulp = {
    dist: path.join(config.paths.public, 'dist'),
    lint: {
      js: [
        path.join(config.paths.app, '**/*.js'),
      ],
    },
    views: {
      jade: config.paths.modules.map(function(folder) {
        return path.join(folder, 'views', '**/*.jade');
      }),
    },
    scripts: { // client scripts
      js: config.paths.modules.map(function(folder) {
        return path.join(folder, 'scripts', '**/*.js');
      }),

      file: 'scripts.js',
      min: 'scripts.min.js',
    },
    styles: {
      css: config.paths.modules.map(function(folder) {
        return path.join(folder, 'styles', '**/*.css');
      }),

      sass: config.paths.modules.map(function(folder) {
        return path.join(folder, 'styles', '**/*.{sass,scss}');
      }),

      // less: config.paths.modules.map(function(folder) {
      //   return path.join(folder, 'styles', '**/*.less');
      // }),

      file: 'styles.css',
      min: 'styles.min.css',
    },
  };

  config.gulp.nodemon = {
    ext: 'js',
    ignore: [
      config.gulp.dist,
      config.paths.nodeModules,
      config.paths.bowerComponents,
    ].concat(config.paths.modules.map(function(folder) {
      return path.join(folder, 'scripts');
    })),
  };
};
