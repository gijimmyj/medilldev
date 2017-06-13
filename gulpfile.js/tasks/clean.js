var del = require('del');
var gulp = require('gulp');
var config = require('../config');

// clean out build directory
gulp.task('clean', function() {
  return del([config.clean.target]);
});
