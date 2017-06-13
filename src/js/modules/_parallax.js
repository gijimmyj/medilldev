jQuery(function($) {
  var parallaxContainer = $('.parallax__container');

  if (parallaxContainer.length) {
    $(parallaxContainer).waypoint(function(direction) {
      if (direction === 'down') {
       parallaxContainer.addClass('parallax--animated');
      }
    }, {
      offset: '80%'
    });
  }

});