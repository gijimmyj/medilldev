jQuery(function($) {


  // Feature slider move
  var featureSliderContainer = $('.feature__slider');
  // Animate move slider
  if (featureSliderContainer.length && window.innerWidth >= 787) {
    var featureSliderWaypoint = new Waypoint({
      element: featureSliderContainer,
      handler: function(direction) {
        if (direction === 'down') {
          TweenLite.to(featureSliderContainer, .8, {y: '-=15%'});
          this.destroy();
        }
      },
      offset: '50%'
    });
  }

  // Two column feature
    if ($('.feature-two-col__match-height').length && window.innerWidth >= 787) {
    $('.feature-two-col__match-height').matchHeight();
  }



var zoomIn = function(elem) {
  $(elem).addClass('feature__image__active');
}

var zoomOut = function(elem) {
  $(elem).removeClass('feature__image__active');
}


$('.zoom-image').on('mouseenter', function() {
  zoomIn(this);
});

$('.zoom-image').on('mouseleave', function() {
  zoomOut(this);
});


});