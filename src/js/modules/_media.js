jQuery(function($) {
  if (window.innerWidth >= 1024) {
    var mediaItemAnimate = $('.module__media');
  // Animate move slider
  if (mediaItemAnimate.length) {
    var featureSliderWaypoint = new Waypoint({
      element: mediaItemAnimate,
      handler: function(direction) {
        if (direction === 'down') {
          TweenLite.to(mediaItemAnimate, .8, {y: '-=15%'});
          this.destroy();
        }
      },
      offset: '50%'
    });
  }
}


});