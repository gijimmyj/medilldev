var gulp = require('gulp');
var config = require('../config');

// complete browser-sync before watching any files
gulp.task('watch', function() {
  gulp.watch(config.sass.src, gulp.registry().get('sass'));
  gulp.watch(config.images.src, gulp.registry().get('images'));
  gulp.watch(config.videos.src, gulp.registry().get('videos'));
  gulp.watch(config.json.src, gulp.registry().get('json'));
    gulp.watch(config.json.src, gulp.registry().get('map'));
  gulp.watch(config.fonts.src, gulp.registry().get('fonts'));
  gulp.watch(config.svgstore.src, gulp.parallel('svgstore', 'svgstore-sass'));
  gulp.watch(config.svgstore.template, gulp.registry().get('svgstore-sass'));
  gulp.watch(config.nunjucks.watch, gulp.registry().get('nunjucks'));
});
