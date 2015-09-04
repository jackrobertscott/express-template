/* jshint node:true */
'use strict';

var config = require('./config');
var path = require('path');
var _ = require('lodash');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var mergeStream = require('merge-stream');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('default', function() {
  // Make sure build is finished before start serve
  runSequence('build', 'serve');
});

gulp.task('build', [
  'clean',
  'lint',
  'scripts',
  'styles'
]);

gulp.task('clean', function() {
  return del.sync(config.gulp.dist);
});

gulp.task('lint', function() {
  return gulp.src(config.gulp.lint.js)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

gulp.task('scripts', function() {
  return gulp.src(config.gulp.scripts.js)
    .pipe(plugins.concat(config.gulp.scripts.file))
    .pipe(gulp.dest(config.gulp.dist))
    .pipe(plugins.uglify())
    .pipe(plugins.rename(config.gulp.scripts.min))
    .pipe(gulp.dest(config.gulp.dist));
});

gulp.task('styles', function() {
  var stream = mergeStream();

  if (config.gulp.styles.css) {
    stream.add(gulp.src(config.gulp.styles.css));
  }
  if (config.gulp.styles.sass) {
    stream.add(gulp.src(config.gulp.styles.sass)
      .pipe(plugins.plumber(function(error) {
        plugins.util.beep();
        plugins.util.log(error);
        this.emit('end'); // need this
      }))
      .pipe(plugins.sass()));
  }
  if (config.gulp.styles.less) {
    stream.add(gulp.src(config.gulp.styles.less)
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
    .pipe(plugins.concat(config.gulp.styles.file))
    .pipe(gulp.dest(config.gulp.dist))
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename(config.gulp.styles.min))
    .pipe(gulp.dest(config.gulp.dist));
});

gulp.task('serve', [
  'browser-sync',
  'watch:nodemon',
  'watch:scripts',
  'watch:styles',
  'watch:views'
]);

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init({
    proxy: 'localhost:' + config.port,
    // Make sure browser sync not on same port as proxy
    // port: (isNaN(config.port)) ? 3000 : Number(config.port) + 1000
  });
});

gulp.task('nodemon', function(cb) {
  var called = false;
  plugins.nodemon({
      script: config.main,
      ext: config.gulp.nodemon.ext,
      ignore: config.gulp.nodemon.ignore
    })
    .on('start', function() {
      if (!called) {
        called = true;
        cb();
      }
    });
});

gulp.task('watch:nodemon', function() {
  gulp.watch(path.join(config.paths.app, '**/*.js'), function() {
    setTimeout(reload, 2000);
  });
});

gulp.task('watch:scripts', function() {
  gulp.watch(config.gulp.scripts.js, ['scripts']);
});

gulp.task('watch:styles', function() {
  gulp.watch(_.union(
      config.gulp.styles.css,
      config.gulp.styles.sass,
      config.gulp.styles.less
    ), ['styles'])
    .on('change', reload);
});

gulp.task('watch:views', function() {
  gulp.watch(config.gulp.views.jade, reload);
});
