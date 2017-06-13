var notify = require('gulp-notify');

// notify when a task has errors
module.exports = function() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end');
};
