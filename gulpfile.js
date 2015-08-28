var config = require('./config');
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
// Server
var livereload = require('gulp-livereload');
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
  'watch'
]);

gulp.task('lint', function() {
  return gulp.src([
      path.join(config.paths.app, '**/*.js'),
      path.join(config.paths.javascripts, '**/*.js'),
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('build', ['clean', 'styles', 'scripts']);

gulp.task('clean', function() {
  return gulp.src(config.paths.build, {
      read: false
    })
    .pipe(rimraf());
});

gulp.task('scripts', function() {
  return gulp.src(path.join(config.paths.javascripts, '**/*.js'))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.paths.build));
});

gulp.task('styles', function() {
  return gulp.src(path.join(config.paths.stylesheets, 'style.less'))
    .pipe(less().on('error', gutil.log))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.paths.build));
});

gulp.task('watch', function() {
  gulp.watch(path.join(config.paths.public, '**/*.less'), ['styles']);
});
