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
      jade: config.paths.modules.map(function(mod) {
        var subdir = mod.views || 'views';
        return path.join(mod.dir, subdir, '**/*.jade');
      }),
    },
    scripts: { // client scripts
      js: config.paths.modules.map(function(mod) {
        var subdir = mod.scripts || 'scripts';
        return path.join(mod.dir, subdir, '**/*.js');
      }),

      file: 'scripts.js',
      min: 'scripts.min.js',
    },
    styles: {
      css: config.paths.modules.map(function(mod) {
        var subdir = mod.styles || 'styles';
        return path.join(mod.dir, subdir, '**/*.css');
      }),

      sass: config.paths.modules.map(function(mod) {
        var subdir = mod.styles || 'styles';
        return path.join(mod.dir, subdir, '**/*.{sass,scss}');
      }),

      // less: config.paths.modules.map(function(mod) {
      //   var subdir = mod.styles || 'styles';
      //   return path.join(mod.dir, subdir, '**/*.less');
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
