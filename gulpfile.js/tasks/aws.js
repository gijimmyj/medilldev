var gulp = require('gulp');
var AWS = require('aws-sdk');
var awspublish = require('gulp-awspublish');
var zip = require('gulp-zip');
var config = require('../config');
var error = require('../util/error');

gulp.task('publish', function() {
  var publisher = awspublish.create({
    region: '',
    params: {
      Bucket: ''
    },
    credentials: new AWS.SharedIniFileCredentials({profile: 'default'})
  });
  return gulp.src('./dist/**/*')
    .pipe(publisher.publish())
    .pipe(publisher.sync())
    .pipe(awspublish.reporter());
});

gulp.task('zip', function() {
  return gulp.src('dist/**/*')
  .pipe(zip('archive.zip'))
  .pipe(gulp.dest('dist'));
});