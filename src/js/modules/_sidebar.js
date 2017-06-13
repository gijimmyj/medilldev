jQuery(function($) {
  $(window).on("scroll",function(){
    if ($('.sidebar__right').length) {
      var winTop = $(this).scrollTop();
      var mainSectionHeight = $('.sidebar__sticky').height();
      var sidebarHeight = $('.sidebar__button__group').outerHeight();
      var sidebarStick = $('.sidebar__right').offset().top;
      var limit = sidebarStick + mainSectionHeight - sidebarHeight;
      if (winTop >= sidebarStick && window.innerWidth >= 1024) {
        $('.sidebar__button__group').addClass('sticky');
        if (winTop > limit) {
          $('.sidebar__button__group').removeClass('sticky');
        }
      }

      else {
        $('.sidebar__button__group').removeClass('sticky');
      }
    }
  });
});