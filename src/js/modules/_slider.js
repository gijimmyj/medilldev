jQuery(function($) {

  var swipers = [];
  $( ".swiper-container" ).each(function(index, element) {
    $(this).addClass('s'+index);
    var next_button = $('.s'+index+' .swiper-button-next');
    var prev_button = $('.s'+index+' .swiper-button-prev');
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
          $('.s'+index+' .refresh-button').on('click', function() {
            swiper.slideTo(0);
          });
        },
        onSlideChangeEnd: function(swiper) {
          if (swiper.isEnd) {
            $('.s'+index+' .refresh-button').css({
              "display": "block",
              "visibility": "visible"
            });
            $('.s'+index+' .refresh-button').removeClass('swiper-button-disabled');
          }
          else {
            $('.s'+index+' .refresh-button').css({
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