var browserSync = require('browser-sync').get('server');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var config = require('../config');
var error = require('../util/error');

// function to bundle browserify files
module.exports = function(b) {
  return b.bundle()
    .on('error', error)
    .pipe(source(config.browserify.bundle))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    // .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.browserify.dist))
    .pipe(browserSync.stream({once: true}));
};
