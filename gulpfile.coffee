gulp = require 'gulp'
$ = require('gulp-load-plugins')()
browserSync = require('browser-sync').create()

del = require 'del'
requireDir = require 'require-dir'
runSequence = require 'run-sequence'

tasks = requireDir './tools/tasks'

gulp.task 'build:clean', (cb) ->
    del ['./dist', './.tmp'], cb

gulp.task 'build', (cb) ->
    runSequence 'build:clean',
        ['archive', 'build:css', 'build:js', 'build:html'],
    cb

gulp.task 'serve', ['build'], () ->
    console.log 'ok'
    settings =
        server:
            baseDir: './dist/jesse'

    browserSync.init settings

    gulp.watch './dist/jesse/**'
    .on 'change', browserSync.reload

gulp.task 'default', ['serve']
