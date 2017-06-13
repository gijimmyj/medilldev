var browserSync = require('browser-sync').get('server');
var frontMatter = require('front-matter');
var gulp = require('gulp');
var data = require('gulp-data');
var htmlmin = require('gulp-htmlmin');
var nunjucksHtml = require('gulp-nunjucks-html');
var config = require('../config');
var error = require('../util/error');

// render and optimize nunjucks templates to html
gulp.task('nunjucks', function() {
  return gulp.src(config.nunjucks.src)
    .pipe(data(function(file) {
      var content = frontMatter(String(file.contents));
      file.contents = new Buffer(content.body);
      return content.attributes;
    }))
    .pipe(nunjucksHtml(config.nunjucks.opts))
    .on('error', error)
    // .pipe(htmlmin(config.nunjucks.htmlmin))
    .pipe(gulp.dest(config.nunjucks.dist))
    .on('end', browserSync.reload);
});
