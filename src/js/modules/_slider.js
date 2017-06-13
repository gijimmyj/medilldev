jQuery(function($) {

  var swipers = [];
  $( ".swiper-container" ).each(function( index ) {
    var next_button = $('.swiper-button-next:eq('+index+')');
    var prev_button = $('.swiper-button-prev:eq('+index+')');
    var container = $(this);
    swipers.push(new Swiper(
      this, {
        slidesPerView: 1,
        keyboardControl: true,
        nextButton: next_button,
        prevButton: prev_button,
        loop: false,
        a11y: true,
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
        onInit: function(swiper) {
          container.on('click', '.refresh-button', function() {
            swiper.slideTo(0);
          });
        },
        onSlideChangeEnd: function(swiper) {
          if (swiper.isEnd) {
            $('.refresh-button').css({
              "display": "block",
              "visibility": "visible"
            });
          }
          else {
            $('.refresh-button').css({
              "display": "none",
              "visibility": "hidden"
            });
          }
        }

      })
    );
  });

  if ($('.slider__match-height').length && window.innerWidth >= 1024) {
    $('.slider__match-height').matchHeight();
  }


});