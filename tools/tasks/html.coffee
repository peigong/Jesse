gulp = require 'gulp'
$ = require('gulp-load-plugins')()
config = require '../config'

gulp.task 'build:html', () ->
    gulp.src config.jade
    .pipe $.plumber { errorHandler: config.errorHandler }
    .pipe $.size { showFiles: true, title: 'source' }
    .pipe $.jade({
        pretty: true
    })
    .pipe gulp.dest config.dist
    .pipe $.size { showFiles: true, title: 'minified' }
