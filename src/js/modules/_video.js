// Autoplay video no supported in iOS devices so hide
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
var android = /Android/.test(navigator.userAgent);

if(iOS || android) {
  jQuery('body').addClass('mobile');

  if (document.querySelector('.hero__video') != null) {
      document.querySelector('.hero__video').style.display = 'none';
  var heroBackgroundImage = document.querySelector('.hero--video').getAttribute('data-background-image');

  document.querySelector('.hero--video').style.backgroundImage = 'url(' + heroBackgroundImage + ')';
  }

}
