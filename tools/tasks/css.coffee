gulp = require 'gulp'
$ = require('gulp-load-plugins')()
merge = require 'merge-stream'

config =
    tmp: './.tmp/css'
    less: './src/less/*.less'
    css: './dist/jesse/styles'

gulp.task 'build:css', (cb) ->
    sCss = gulp.src './src/css/*.css', { base: './src/css' }
        .pipe gulp.dest config.tmp
    sLess = gulp.src config.less
        .pipe $.less()
        .pipe gulp.dest config.tmp

    merge sCss, sLess
    .pipe $.minifyCss()
    .pipe $.filter 'index.css'
    .pipe gulp.dest config.css
