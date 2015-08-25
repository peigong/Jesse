gulp = require 'gulp'
$ = require('gulp-load-plugins')()
merge = require 'merge-stream'
config = require '../config'

gulp.task 'build:css', (cb) ->
    sCss = gulp.src config.css, { base: './src/css' }
        .pipe gulp.dest "#{config.tmp}/css"
    sLess = gulp.src config.less
        .pipe $.less()
        .pipe gulp.dest "#{config.tmp}/css"

    merge sCss, sLess
    .pipe $.minifyCss()
    .pipe $.filter 'index.css'
    .pipe gulp.dest config.styles
