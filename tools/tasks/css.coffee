gulp = require 'gulp'
$ = require('gulp-load-plugins')()
merge = require 'merge-stream'
config = require '../config'

tmp = "#{config.tmp}/css"
gulp.task 'build:css', () ->
    sCss = gulp.src config.css, { base: './src/css' }
    sLess = gulp.src config.less, { base: './src/less'}
        .pipe $.less()

    merge sCss, sLess
    .pipe gulp.dest tmp
    .on 'end', () ->
        console.log tmp
        gulp.src tmp
        .pipe $.size { showFiles: true, title: 'source' }
        .pipe $.minifyCss()
        .pipe $.filter 'index.css'
        .pipe gulp.dest config.styles
        .pipe $.size { showFiles: true, title: 'minified' }
