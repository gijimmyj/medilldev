var browserSync = require('browser-sync').get('server');
var gulp = require('gulp');
var changed = require('gulp-changed');
var config = require('../config');

// copy video to dist if modified
gulp.task('videos', function() {
  return gulp.src(config.videos.src)
    .pipe(changed(config.videos.dist))
    .pipe(gulp.dest(config.videos.dist))
    .pipe(browserSync.stream());
});
