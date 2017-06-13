jQuery(function($) {


  $('.tweet__container').each(function(indx) {

    var tweetContainer = $(this);
   tweetContainer.waypoint(function(direction) {
      if (direction === 'down') {
        var tweetHeight = tweetContainer.outerHeight();
        var tweetWidth = tweetContainer.outerWidth();

        var tl = new TimelineLite();
        tl
        .fromTo(tweetContainer.find(".tL"), 1, {width:0}, {"border-color": "#df6400", width:tweetWidth})
        .fromTo(tweetContainer.find(".tR"), 1, {height:0}, {"border-color": "#df6400", height:tweetHeight})
        .fromTo(tweetContainer.find(".bR"), 1, {width:0}, {"border-color": "#df6400", width:tweetWidth})
        .fromTo(tweetContainer.find(".bL"), 1, {height:0}, {"border-color": "#df6400", height:tweetHeight})


        tl.timeScale(4)
        this.destroy();
      }
    }, {
      offset: '50%'
    });
  });
});