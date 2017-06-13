jQuery(function($) {
    function switchTab(target) {
      $('.module__content div').hide();
      $('.module__tabs a').removeClass('active').attr('aria-selected', 'false');
      $(target.attr('href')).show();
      target.addClass('active').attr('aria-selected', 'true');
    }

    // tab clicks
    $('.module__tabs a[aria-controls]').click(function (e) {
      switchTab($(this));
      e.preventDefault();
    });

    // select first tab when page loads
    if ($('.module__tabs a[aria-controls]').length) {
      switchTab($('#tab1'));
    }
});
