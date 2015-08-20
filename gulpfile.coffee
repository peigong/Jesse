gulp = require 'gulp'
$ = require('gulp-load-plugins')()

del = require 'del'
requireDir = require 'require-dir'
runSequence = require 'run-sequence'

tasks = requireDir './tools/tasks'

gulp.task 'build:clean', (cb) ->
    del ['./dist'], cb

gulp.task 'build', (cb) ->
    runSequence 'build:clean',
        ['archive', 'build:css', 'build:js', 'build:html'],
    cb

gulp.task 'default', ['build']
