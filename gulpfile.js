var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

var del = require('del'),
    requireDir = require('require-dir'),
    runSequence = require('run-sequence');

var tasks = requireDir('./tools/tasks');

gulp.task('build:clean', function(cb) {
    del(['./dist'], cb);
});

gulp.task('build', function(cb) {
    runSequence(
        'build:clean',
        ['archive', 'build:css', 'build:js', 'build:html'],
    cb);
});

gulp.task('watch', function() {
    gulp.watch(config.path.less, ['build:less']);
    gulp.watch(config.path.jade, ['build:html']);
});

gulp.task('default', ['build']);
