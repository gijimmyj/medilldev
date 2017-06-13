var browserify = require('browserify');
var gulp = require('gulp');
var config = require('../config');
var bundle = require('../util/bundle');

// setup browserify
var b = browserify(config.browserify.src, config.browserify.opts);

// create browserify bundle
gulp.task('browserify', function() {
  return bundle(b);
});
