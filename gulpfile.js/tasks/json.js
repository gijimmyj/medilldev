var browserSync = require('browser-sync').get('server');
var gulp = require('gulp');
var changed = require('gulp-changed');
var config = require('../config');

// copy json to dist if modified
gulp.task('json', function() {
  return gulp.src(config.json.src)
    .pipe(changed(config.json.dist))
    .pipe(gulp.dest(config.json.dist))
    .pipe(browserSync.stream());
});

// copy map.js to dist

gulp.task('map', function() {
  return gulp.src(config.map.src)
    .pipe(changed(config.map.dist))
    .pipe(gulp.dest(config.map.dist))
    .pipe(browserSync.stream());
});