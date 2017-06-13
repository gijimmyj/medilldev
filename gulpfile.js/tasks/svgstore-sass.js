var gulp = require('gulp');
var baseimg = require('gulp-baseimg');
var config = require('../config');

// generate sass for svgstore files based on template settings
gulp.task('svgstore-sass', function() {
  return gulp.src(config.svgstore.src)
    .pipe(baseimg({
      styleTemplate: config.svgstore.template,
      styleName: config.svgstore.sass
    }))
    .pipe(gulp.dest(config.svgstore.out));
});
