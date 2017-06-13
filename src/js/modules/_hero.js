jQuery(function($) {
  // fix viewport height mobile iOS safari issue
  var mobileSafari = /iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i.test(navigator.userAgent);



  if (true) {}


    if ($('.home__hero__content').length > 0) {
      if (mobileSafari) {
        var getHeroWidth = $('.home__hero__container').outerWidth();
        var getHeroHeight = $('.home__hero__container').outerHeight() - 69;
        $('.home__hero__cta').css('bottom', '6.5rem' );

      } else {
        var getHeroWidth = $('.home__hero__container').outerWidth();
        var getHeroHeight = $('.home__hero__container').outerHeight();
      }


      var header = $('.home__hero--header'),
      title = $('.home__hero--title'),
      leftLine = $('.left-line'),
      rightLine = $('.right-line'),
      svgBtn = $('.home__hero__cta--bg'),
      bgImg = $('.home__hero__container');

    // set the size of the svg container based on the main hero container (vh/vw)
    $('.home__hero__svg').attr({
      'height': getHeroHeight,
      'width': getHeroWidth,
      'viewBox': '0 0 ' + getHeroHeight + ' ' + getHeroWidth
    });

    // set the size of the left line based on the svg container
    $('.left-line').attr({
      'd': 'M' + getHeroWidth / 2 + ',50 ' + '50,50 ' + '50,' + (getHeroHeight - 50) + ' ' + ((getHeroWidth / 2) - 30) + ',' + (getHeroHeight - 50)
    });

    // set the size of the right line based on the svg container
    $('.right-line').attr({
      'd': 'M' + getHeroWidth / 2 + ',50 ' +
      (getHeroWidth - 50) +',50 ' +
      (getHeroWidth - 50) + ',' + (getHeroHeight - 50) +
      ' ' + ((getHeroWidth / 2) + 30) + ',' + (getHeroHeight - 50)
    });

    var svgContainer = $('.home__hero__svg');
    var animation = new TimelineMax();
    var animation2 = new TimelineMax();
    animation.pause();
    animation2.pause();


    var leftSvgPaths = $('.left-line');
    for(var x = 0; x < leftSvgPaths.length; x++){
      var leftPath = leftSvgPaths[x];
      var leftPathDimensions = leftPath.getTotalLength();
      leftPath.style.strokeDasharray = (leftPathDimensions)+' '+(leftPathDimensions);
      leftPath.style.strokeDashoffset = leftPathDimensions;
      animation.add(TweenMax.to(leftPath.style,2,{strokeDashoffset:'0px', delay: 1.5}));
      animation.add(TweenMax.to(leftPath.style,2,{strokeDashoffset:''+-(leftPathDimensions)+'px'}));
    }

    var rightSvgPaths = $('.right-line');
    for(var y = 0; y < rightSvgPaths.length; y++){
      var rightPath = rightSvgPaths[y];
      var rightPathDimensions = rightPath.getTotalLength();
      rightPath.style.strokeDasharray = (rightPathDimensions)+' '+(rightPathDimensions);
      rightPath.style.strokeDashoffset = rightPathDimensions;
      animation2.add(TweenMax.to(rightPath.style,2,{strokeDashoffset:'0px', delay: 1.5}));
      animation2.add(TweenMax.to(rightPath.style,2,{strokeDashoffset:''+-(rightPathDimensions)+'px'}));
    }

    animation.play();
    animation2.play();


    // Animating text
    TweenLite.fromTo(header,.8,{y: '+=200%'}, {y: '-=200%', ease:Power0.easeIn, delay: .5});
    TweenLite.fromTo(title,.8,{y: '+=200%'}, {y: '-=200%', ease:Power0.easeIn, delay: 1.75});

    // Scaling hero image
    // TweenLite.to(bgImg,7,{zIndex: 1, scale: 1.2});

    // Animating arrow button
    TweenLite.fromTo(svgBtn,.5,{height: 0}, {opacity: 1, height: 30, delay: 5})
    TweenLite.fromTo(svgBtn,.5,{height: 30}, {height: 0, delay: 6})


    var heroCTA = function(e) {
      e.preventDefault;
      var targetOffset = $('.parallax__container').offset().top;
      TweenMax.to(window,1, { scrollTo:{ y:targetOffset }, ease:Power3.easeOut });
    }

    $('.home__hero__cta').on('click', heroCTA);

    // Hide hero content text
    setTimeout(function() {
      $('.home__hero__content').css('opacity', 1);
    }, 1000)

  }


});