gulp = require 'gulp'
$ = require('gulp-load-plugins')()
config = require '../config'

gulp.task 'build:html', () ->
    gulp.src config.jade
    .pipe $.jade({
        pretty: true
    })
    .pipe gulp.dest config.dist
