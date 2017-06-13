var gulp = require('gulp');
var jshint = require('gulp-jshint');
var lintspaces = require('gulp-lintspaces');
var sassLint = require('gulp-sass-lint');
var config = require('../config');

// check file formatting based on editorconfig
gulp.task('lint-format', function() {
  return gulp.src(config.lint.format)
    .pipe(lintspaces({editorconfig: '.editorconfig'}))
    .pipe(lintspaces.reporter());
});

// lint js with jshint
gulp.task('lint-js', function() {
  return gulp.src(config.lint.js)
    .pipe(jshint())
    .pipe(jshint.reporter());
});

// lint sass with sass lint
gulp.task('lint-sass', function() {
  return gulp.src(config.lint.sass)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});
