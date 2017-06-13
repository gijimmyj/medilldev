var browserSync = require('browser-sync').create('server');
var gulp = require('gulp');
var config = require('../config');

// complete all initial tasks before starting browser-sync
gulp.task('browser-sync', function() {
  return browserSync.init(config.browserSync.opts);
});
