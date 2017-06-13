var browserify = require('browserify');
var gulp = require('gulp');
var util = require('gulp-util');
var moment = require('moment');
var watchify = require('watchify');
var config = require('../config');
var bundle = require('../util/bundle');
var resave = require('../util/resave');

// setup browserify and wrap with watchify
var b = watchify(browserify(config.browserify.src, config.browserify.opts));

// update bundle when a source file changes
b.on('update', function() {
  return bundle(b);
});

// display the compile time after updating
b.on('time', function(time) {
  var duration = moment.duration(time);
  util.log('Updated', util.colors.cyan('\'browserify\''), 'in', util.colors.magenta(duration + ' ms'));
});

// create watchify bundle
gulp.task('watchify', function() {
  // watch files for any changes
  var watcher = gulp.watch(config.browserify.watch);
  // resave files containing glob requires when a file is added
  watcher.on('add', function() {
    resave(config.browserify.resave);
  });
  // resave files containing glob requires when a file is deleted
  watcher.on('unlink', function() {
    resave(config.browserify.resave);
  });
  // return the bundle
  return bundle(b);
});
