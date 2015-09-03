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
  'lint',
  'build',
  'serve'
]);

gulp.task('lint', function() {
  return gulp.src([
      path.join(config.paths.app, '**/*.js'),
      path.join(config.paths.js, '**/*.js'),
    ])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

gulp.task('build', [
  'clean',
  'scripts',
  'styles'
]);

gulp.task('clean', function() {
  return del.sync(config.paths.min);
});

gulp.task('styles', function() {
  var stream = mergeStream();

  if (config.paths.css) {
    stream.add(gulp.src(path.join(config.paths.css, '**/*.css')));
  }
  if (config.paths.sass) {
    stream.add(gulp.src(path.join(config.paths.sass, '**/*.{sass, scss}'))
      .pipe(plugins.sass().on('error', plugins.util.log)));
  }
  if (config.paths.less) {
    stream.add(gulp.src(path.join(config.paths.less, '**/*.less'))
      .pipe(plugins.less().on('error', plugins.util.log)));
  }

  return stream.isEmpty() ? null : stream.pipe(plugins.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(plugins.concat('style.min.css'))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(config.paths.min));
});

gulp.task('scripts', function() {
  return gulp.src(path.join(config.paths.js, '**/*.js'))
    .pipe(plugins.concat('main.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(config.paths.min));
});

gulp.task('serve', [
  'nodemon',
  'browser-sync',
  'watch'
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

gulp.task('watch', function() {
  gulp.watch(path.join(config.paths.less, '**/*.less'), ['less']);
  gulp.watch(path.join(config.paths.app, '**/*'), function() {
    // Ensure that plugins.nodemon reloads before browser refresh
    setTimeout(reload, 2000);
  });
});
