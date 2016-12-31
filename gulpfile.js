var gulp = require('gulp');
var mocha = require('gulp-mocha');
var browserify = require('gulp-browserify');

gulp.task('test', function() {
  gulp.
    src('./test/test.js').
    pipe(mocha()).
    on('error', function(err) {
      this.emit('end');
    });
});

gulp.task('browserify', function() {
  return gulp.
    src('./app.js').
    pipe(browserify()).
    pipe(gulp.dest('./bin'));
});


gulp.task('watch', function() {
 // gulp.watch('./**/*.js', ['test']);
   gulp.watch('./**/*.js', ['browserify']);
});

