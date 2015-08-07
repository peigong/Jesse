var gulp = require('gulp');
var clean = require('gulp-clean');
var jade = require('gulp-jade');

gulp.task('default', function() {
    gulp.src('./dist')
    .pipe(clean({ force: true }));

    gulp.src('./src/favicon.ico', { base: './src' })
    .pipe(gulp.dest('./dist/jesse/'));

    gulp.src('./src/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist/jesse/'));
});
