// global jquery
global.jQuery = require('jquery');

// fastclick eliminates click delay in certain browsers
var fastclick = require('fastclick');
fastclick(document.body);

// svg polyfill for better xlink support
var svg4everybody = require('svg4everybody');
svg4everybody();


// modernizr
require('./util/_modernizr');

// Add touchevents class to html
if (Modernizr.touchevents) {
  jQuery('body').addClass('no-touch');
}


require('swiper');

require('./util/_match-height');
//
require('./util/northwestern');

require('waypoints');

require('./util/_tweenMax');



// automatically require all modules
require('./modules/**/*.js', {mode: 'expand'});
