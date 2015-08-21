gulp = require 'gulp'
$ = require('gulp-load-plugins')()
merge = require 'merge-stream'

config =
    tmp: './.tmp/css'
    css: './src/css/*.css'
    less: './src/less/*.less'
    styles: './dist/jesse/styles'

gulp.task 'build:css', (cb) ->
    sCss = gulp.src config.css, { base: './src/css' }
        .pipe gulp.dest config.tmp
    sLess = gulp.src config.less
        .pipe $.less()
        .pipe gulp.dest config.tmp

    merge sCss, sLess
    .pipe $.minifyCss()
    .pipe $.filter 'index.css'
    .pipe gulp.dest config.styles

gulp.watch [config.css, config.less], ['build:css']
