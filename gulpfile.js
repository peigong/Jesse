var gulp = require('gulp');
var copy = require('gulp-copy');
var jade = require('gulp-jade');

gulp.task('default', function() {
    gulp.src('./src/favicon.ico')
    .pipe(copy('./dist/jesse/'));

    gulp.src('./src/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist/jesse/'));
});
