var config = require('./config');
var path = require('path');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
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
  'less',
  'js'
]);

gulp.task('clean', function() {
  return del.sync(config.paths.min);
});

gulp.task('less', function() {
  return gulp.src(path.join(config.paths.less, 'style.less'))
    .pipe(plugins.less().on('error', plugins.util.log))
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.paths.min));
});

gulp.task('js', function() {
  return gulp.src(path.join(config.paths.js, '**/*.js'))
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename({
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
