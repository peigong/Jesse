var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

var del = require('del'),
    runSequence = require('run-sequence');

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
var bower_components = [
    'bower_components/requirejs/require.js',
    'bower_components/underscore/underscore.js',
    'bower_components/JavaScript-MD5/js/md5.js',
    'bower_components/zeptojs/src/zepto.js',
    'bower_components/zeptojs/src/event.js',
    'bower_components/zeptojs/src/ajax.js',
    'bower_components/zeptojs/src/ie.js',
    'bower_components/zeptojs/src/detect.js',
    'bower_components/zeptojs/src/fx.js',
    'bower_components/zeptojs/src/deferred.js',
    'bower_components/zeptojs/src/callbacks.js',
    'bower_components/zeptojs/src/touch.js',
    'bower_components/zeptojs/src/gesture.js'
];


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

gulp.task('build:html', function() {
    gulp.src(config.path.jade)
    .pipe($.jade({
        pretty: true
    }))
    .pipe($.inject(gulp.src(bower_components, { read: false })))
    .pipe($.usemin({
        assetsDir: '.',
        js: [$.uglify()]
    }))
    .pipe(gulp.dest(config.dist.jade))
});

gulp.task('build', function(cb) {
    runSequence(
        'build:clean',
        ['archive', 'build:less', 'build:html'],
    cb);
});

gulp.task('watch', function() {
    gulp.watch(config.path.less, ['build:less']);
    gulp.watch(config.path.jade, ['build:html']);
});

gulp.task('default', ['build']);
