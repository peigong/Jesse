var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

gulp.task('clean', function() {
    gulp.src('./dist')
    .pipe(plugins.clean({ force: true }));
});

gulp.task('move', ['clean'], function() {
    gulp.src('./src/favicon.ico', { base: './src' })
    .pipe(gulp.dest('./dist/jesse/'));
});

gulp.task('less', ['clean'], function() {
    gulp.src('./src/less/*.less')
    .pipe(plugins.less())
    .pipe(gulp.dest('./dist/jesse/styles'));
});

gulp.task('jade', ['less'], function() {
    gulp.src('./src/*.jade')
    .pipe(plugins.jade())
    .pipe(gulp.dest('./dist/jesse/'));
});

gulp.task('default', ['move', 'jade']);
