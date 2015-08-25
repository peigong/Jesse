gulp = require 'gulp'
$ = require('gulp-load-plugins')()
config = require '../config'

bower_components = [
    'bower_components/underscore/underscore.js',
    'bower_components/JavaScript-MD5/js/md5.js',
    'bower_components/way.js/way.js',
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
]

useminOptions =
    assetsDir: '.'
    #js: [$.uglify()]

gulp.task 'build:html', (cb) ->
    gulp.src 'bower_components/requirejs/require.js', { base: './bower_components/requirejs' }
    .pipe gulp.dest config.scripts

    gulp.src config.jade
    .pipe $.jade({
        pretty: true
    })
    .pipe $.inject gulp.src bower_components, { read: false }
    .pipe $.usemin useminOptions
    .pipe gulp.dest config.dist
