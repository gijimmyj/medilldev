jQuery(function($) {
  var delay = 100;

  $(".block__item--animate").waypoint(function(direction) {
    if (direction === 'down') {
      var item = $(this.element);

      setTimeout(function(){
        item.addClass('block__item--animated');
      }, delay * item.parent().parent().index());
    }
  }, {
    offset: '90%'
  });

});