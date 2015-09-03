/* jshint node:true */
'use strict';

var config = require('./config');
var path = require('path');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var mergeStream = require('merge-stream');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('default', [
  'build',
  'serve'
]);

gulp.task('build', [
  'clean',
  'lint',
  'scripts',
  'styles'
]);

gulp.task('clean', function() {
  return del.sync(config.paths.dist);
});

gulp.task('lint', function() {
  return gulp.src([
      path.join(config.paths.app, '**/*.js'),
      path.join(config.paths.public, '**/*.js'),
    ])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

gulp.task('scripts', function() {
  return gulp.src([
      path.join(config.paths.app, '*/scripts/*.js'),
      path.join(config.paths.public, '**/*.js'),
    ])
    .pipe(plugins.concat('main.js'))
    .pipe(gulp.dest(config.paths.dist))
    .pipe(plugins.uglify())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('styles', function() {
  var stream = mergeStream();

  if (config.paths.css) {
    stream.add(gulp.src([
      path.join(config.paths.app, '*/styles/*.css'),
      path.join(config.paths.public, '*/styles/*.css')
    ]));
  }
  if (config.paths.sass) {
    stream.add(gulp.src([
        path.join(config.paths.styles, '*/styles/*.{sass, scss}'),
        path.join(config.paths.public, '*/styles/*.{sass, scss}')
      ])
      .pipe(plugins.plumber(function(error) {
        plugins.util.beep();
        plugins.util.log(error);
        this.emit('end'); // need this
      }))
      .pipe(plugins.sass()));
  }
  if (config.paths.less) {
    stream.add(gulp.src([
        path.join(config.paths.styles, '*/styles/*.less'),
        path.join(config.paths.public, '*/styles/*.less')
      ])
      .pipe(plugins.plumber(function(error) {
        plugins.util.beep();
        plugins.util.log(error);
        this.emit('end'); // need this
      }))
      .pipe(plugins.less()));
  }

  return stream.isEmpty() ? null : stream.pipe(plugins.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(plugins.concat('style.css'))
    .pipe(gulp.dest(config.paths.dist))
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('serve', [
  'nodemon',
  'browser-sync',
  'watch:styles',
  'watch:browser-sync'
]);

gulp.task('nodemon', function() {
  plugins.nodemon({
    script: config.main
  });
});

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: 'localhost:' + config.port
  });
});

gulp.task('watch:styles', function() {
  gulp.watch(path.join(config.paths.app, '*/styles/*.{css, sass, scss, less}'), ['styles'], reload);
});

gulp.task('watch:browser-sync', function() {
  gulp.watch(path.join(config.paths.app, '**/*'), function() {
    // Ensure that plugins.nodemon reloads before browser refresh
    setTimeout(reload, 2000);
  });
});
