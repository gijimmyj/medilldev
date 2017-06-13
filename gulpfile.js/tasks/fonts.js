var browserSync = require('browser-sync').get('server');
var gulp = require('gulp');
var changed = require('gulp-changed');
var config = require('../config');

// copy fonts to dist if modified
gulp.task('fonts', function() {
  return gulp.src(config.fonts.src)
    .pipe(changed(config.fonts.dist))
    .pipe(gulp.dest(config.fonts.dist))
    .pipe(browserSync.stream());
});
