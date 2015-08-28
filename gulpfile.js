var config = require('./config');
var path = require('path');
var gulp = require('gulp');
var util = require('gulp-util');
// Server
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
// Build
var rimraf = require('gulp-rimraf');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
// Style
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

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
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('build', [
  'clean',
  'less',
  'js'
]);

gulp.task('clean', function() {
  return gulp.src(config.paths.min, {
      read: false
    })
    .pipe(rimraf());
});

gulp.task('less', function() {
  return gulp.src(path.join(config.paths.less, 'style.less'))
    .pipe(less().on('error', util.log))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.paths.min));
});

gulp.task('js', function() {
  return gulp.src(path.join(config.paths.js, '**/*.js'))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.paths.min));
});

gulp.task('serve', [
  'nodemon',
  'browser-sync',
  'watch'
]);

gulp.task('nodemon', function() {
  nodemon({
    script: './bin/www'
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
    // Ensure that nodemon reloads before browser refresh
    setTimeout(browserSync.reload, 2000);
  });
});
