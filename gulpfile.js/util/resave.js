var gulp = require('gulp');
var savefile = require('gulp-savefile');

// resave source
module.exports = function(src) {
  return gulp.src(src)
    .pipe(savefile());
};
