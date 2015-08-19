var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    merge = require('merge-stream');

var config = {
    path: {
      less: './src/less/*.less'
    },
    dist: {
      css: './dist/jesse/styles'
    }
};

gulp.task('build:css', function() {
    var sCss = gulp.src('./src/css/*.css', { base: './src/css' })
        .pipe(gulp.dest(config.dist.css));
    var sLess = gulp.src(config.path.less)
        .pipe($.less())
        .pipe(gulp.dest(config.dist.css));
    var filter = $.filter(['index.css'], { restore: true });
    merge(sCss, sLess)
    .pipe($.minifyCss())
    .pipe(gulp.dest(config.dist.css))
    .pipe($.ignore.include('index.css'))
    .pipe(filter)
    .pipe(filter.restore)
    .pipe(gulp.dest(config.dist.css))
});
