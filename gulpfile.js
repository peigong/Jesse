var del = require('del');
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

var config = {
    path: {
      less: './src/less/*.less',
      jade: './src/*.jade'
    },
    dist: {
      css: './dist/jesse/styles',
      jade: './dist/jesse'
    }
};
gulp.task('archive', function(cb) {
  runSequence([
      'archive:copy:favicon',
      'archive:copy:css'
    ], cb);
});

gulp.task('archive:copy:favicon', function() {
    return gulp.src('./src/favicon.ico', { base: './src' })
    .pipe(gulp.dest('./dist/jesse/'));
});

gulp.task('archive:copy:css', function() {
    return gulp.src('./src/css/*.css', { base: './src/css' })
    .pipe(gulp.dest(config.dist.css))
});

gulp.task('build:clean', function(cb) {
    del(['./dist'], cb);
});

gulp.task('build:less', function() {
    gulp.src(config.path.less)
    .pipe($.less())
    .pipe(gulp.dest(config.dist.css))
});

gulp.task('build:jade', function() {
    gulp.src(config.path.jade)
    .pipe($.jade())
    .pipe(gulp.dest(config.dist.jade))
});

gulp.task('build', function(cb) {
    runSequence(
        'build:clean',
        ['archive', 'build:less', 'build:jade'],
    cb);
});

gulp.task('watch', function() {
    gulp.watch(config.path.less, ['build:less']);
    gulp.watch(config.path.jade, ['build:jade']);
});

gulp.task('default', ['build', 'watch']);
