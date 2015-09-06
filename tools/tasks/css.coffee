gulp = require 'gulp'
$ = require('gulp-load-plugins')()
merge = require 'merge-stream'
config = require '../config'

tmp = "#{config.tmp}/css"
gulp.task 'build:css', () ->
    sCss = gulp.src config.css, { base: './src/css' }
        .pipe gulp.dest tmp
    sLess = gulp.src config.less
        .pipe $.less()
        .pipe gulp.dest tmp

    merge sCss, sLess
    .pipe $.minifyCss()
    .pipe $.filter 'index.css'
    .pipe gulp.dest config.styles
