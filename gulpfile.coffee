gulp = require 'gulp'
$ = require('gulp-load-plugins')()
browserSync = require('browser-sync').create()

del = require 'del'
requireDir = require 'require-dir'
runSequence = require 'run-sequence'

config = require './tools/config'
tasks = requireDir './tools/tasks'

gulp.task 'build:clean', (cb) ->
    del [config.dist, config.tmp], cb

gulp.task 'build', (cb) ->
    runSequence 'build:clean',
        ['archive', 'build:css', 'build:js', 'build:html'],
    cb

gulp.task 'serve', () ->
    settings =
        server:
            baseDir: config.dist

    browserSync.init settings

    gulp.watch [config.css, config.less], ['build:css']
    gulp.watch config.coffee, ['build:js']
    gulp.watch config.jade, ['build:html']
    gulp.watch ["#{config.dist}/**", './gulpfile.coffee', './tools/**']
    .on 'change', browserSync.reload

gulp.task 'default', ['serve']
