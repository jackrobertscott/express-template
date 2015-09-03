/* jshint node:true */
'use strict';

var config = require('./config');
var path = require('path');
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
      path.join(config.paths.public, 'scripts/**/*.js'),
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

  if (config.build.css) {
    stream.add(gulp.src([
      path.join(config.paths.app, '*/styles/*.css'),
      path.join(config.paths.public, 'styles/**/*.css')
    ]));
  }
  if (config.build.sass) {
    stream.add(gulp.src([
        path.join(config.paths.app, '*/styles/*.{sass,scss}'),
        path.join(config.paths.public, 'styles/**/*.{sass,scss}')
      ])
      .pipe(plugins.plumber(function(error) {
        plugins.util.beep();
        plugins.util.log(error);
        this.emit('end'); // need this
      }))
      .pipe(plugins.sass()));
  }
  if (config.build.less) {
    stream.add(gulp.src([
        path.join(config.paths.app, '*/styles/*.less'),
        path.join(config.paths.public, 'styles/**/*.less')
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
  'browser-sync:nodemon',
  'watch:styles',
  'watch:browser-sync'
]);

/**
 * BrowserSync without using nodemon.
 */
gulp.task('browser-sync', browserSyncInit);

/**
 * BrowserSync with using nodemon.
 */
gulp.task('browser-sync:nodemon', ['nodemon'], browserSyncInit);

function browserSyncInit() {
  browserSync.init({
    proxy: 'localhost:' + config.port
  });
}

gulp.task('nodemon', function(cb) {
  plugins.nodemon({
      script: config.main
    })
    .once('start', cb);
});

gulp.task('watch:scripts', function() {
  gulp.watch([
      path.join(config.paths.app, '*/scripts/*.js'),
      path.join(config.paths.public, 'scripts/**/*.js'),
    ], ['scripts'])
    .on('change', reload);
});

gulp.task('watch:styles', function() {
  gulp.watch([
      path.join(config.paths.app, '*/styles/*.{css,sass,scss,less}'),
      path.join(config.paths.public, 'styles/**/*.{css,sass,scss,less}')
    ], ['styles'])
    .on('change', reload);
});

gulp.task('watch:browser-sync', function() {
  gulp.watch([
    path.join(config.paths.app, '**/*'),
    '!' + path.join(config.paths.app, '*/scripts/*.js'),
    '!' + path.join(config.paths.app, '*/styles/*.{css,sass,scss,less}')
  ], function() {
    // Ensure that plugins.nodemon reloads before browser refresh
    setTimeout(reload, 2000);
  });
});
