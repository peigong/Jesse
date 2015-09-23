gulp = require 'gulp'
$ = require('gulp-load-plugins')()
merge = require 'merge-stream'
config = require '../config'

tmp = "#{config.tmp}/css"
gulp.task 'build:css', () ->
    gulp.src config.less
    .pipe $.plumber { errorHandler: config.errorHandler }
    .pipe $.less()
    .pipe $.size { showFiles: true, title: 'build:css source' }
    .pipe $.filter 'index.css'
    .pipe $.minifyCss()
    .pipe gulp.dest config.styles
    .pipe $.size { showFiles: true, title: 'build:css minified' }
