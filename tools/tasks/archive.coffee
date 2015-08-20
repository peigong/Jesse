gulp = require 'gulp'
runSequence = require 'run-sequence'

gulp.task 'archive', (cb) ->
  runSequence [
      'archive:copy:favicon'
    ], cb

gulp.task 'archive:copy:favicon', (cb) ->
    gulp.src './src/favicon.ico', { base: './src' }
    .pipe gulp.dest './dist/jesse/'
