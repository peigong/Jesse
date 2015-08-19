var gulp = require('gulp'),
    runSequence = require('run-sequence');
    
gulp.task('archive', function(cb) {
  runSequence([
      'archive:copy:favicon'
    ], cb);
});

gulp.task('archive:copy:favicon', function() {
    return gulp.src('./src/favicon.ico', { base: './src' })
    .pipe(gulp.dest('./dist/jesse/'));
});
