var browserSync = require('browser-sync').get('server');
var gulp = require('gulp');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var config = require('../config');

// optimize only images that have changed since the last time the task ran
gulp.task('images', function() {
  return gulp.src(config.images.src)
    .pipe(changed(config.images.dist))
    .pipe(imagemin())
    .pipe(gulp.dest(config.images.dist))
    .pipe(browserSync.stream());
});
