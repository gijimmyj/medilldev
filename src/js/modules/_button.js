jQuery(function($) {

  if ($('.news__events__category__label').length && window.innerWidth <= 767) {
    $('.news__events__category__label').attr('tabindex', '0');

    var toggleButtonGroup = function() {
      $('.news__events__category__container .button__tag__group').toggle();
    }

    $('.news__events__category__label').on('click', toggleButtonGroup);
  }

});