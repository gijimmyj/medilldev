jQuery(function($) {


  var mapStyles = [ {
    "elementType": "geometry",
    "stylers": [
    { "visibility": "off" }
    ]
  },{
    "elementType": "labels",
    "stylers": [
    { "visibility": "on" }
    ]
  },{
    "featureType": "poi",
    "stylers": [
    { "visibility": "off" }
    ]
  },{
    "featureType": "landscape",
    "stylers": [
    { "color": "#E9E9E9" },
    { "visibility": "off" }
    ]
  },{
    "featureType": "transit.line",
    "stylers": [
    { "visibility": "off" }
    ]
  },{
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
    { "visibility": "on" }
    ]
  },{
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
    { visibility: "simplified" },
    { "color": "#c9c9c9" }
    ]
  },{
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
    { "visibility": "off" }
    ]
  },{
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
    { "visibility": "on" }
    ]
  },{
    "featureType": "transit",
    "elementType": "labels",
    "stylers": [
    { "visibility": "off" }
    ]
  },{
    "featureType": "water",
    "elementType": "labels",
    "stylers": [
    { "visibility": "off" },
    { "color": "#c9c9c9" }
    ]
  },{
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
    { "color": "#ffffff" }
    ]
  },{
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
    { "color": "#cccccc" }
    ]
  },{
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
    { "color": "#444444" }
    ]
  },{
    "featureType": "transit.station.bus",
    "stylers": [
    { "visibility": "off" }
    ]
  },{
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
    { "color": "#dddddd" }
    ]
  }
  ];
  var _json = '';
  var _index = -1;

  var map;

  function initialize() {
    var center = new google.maps.LatLng(0,0);
    var minZoomLevel = 1;

    var mapOptions = {
      zoom: 1,
      center: center,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      scrollwheel: false,
      loginControl: false,
      zoomControl: true,
      mapTypeControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
        style: google.maps.ZoomControlStyle.SMALL
      },
      styles: mapStyles
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),  mapOptions);
    var btn = $('#btn-campus'),
    info = $('#info-canvas'),
    path = 'index.json';



    $.get(path + '?' + new Date().getTime(), function (data) {
      _json = data.locations;
      setMarkers(map, data.locations);
    // After initial data load, select first marker
    // showDetail(_json, 0, true);
    // updateMarkers(markers[0]);
  }, 'json');

    map.setCenter(center, 17);

    google.maps.event.addDomListener(map, 'idle', function() {
      center = map.getCenter();
    });

    google.maps.event.addDomListener(window, 'resize', function() {
      map.setCenter(center);
    });

    google.maps.event.addListener(map, 'zoom_changed', function() {
      if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
    });
  }

// markers setup
var image = { url: 'http://www.northwestern.edu/common/v8/css/images/icons/purple-marker.png',
size: new google.maps.Size(24, 34),
origin: new google.maps.Point(0,0),
anchor: new google.maps.Point(12, 30)
};
var shape = {
  coords: [1,18,1,26,10,33,16,33,24,25,24,17,13,1],
  type: 'poly'
};
var imageActive = {
  url: 'http://www.northwestern.edu/common/v8/css/images/icons/purple-active-marker.png',
  size: new google.maps.Size(43, 60),
  origin: new google.maps.Point(0,0),
  anchor: new google.maps.Point(22, 60)
};

var markers = [];

/**
 * place markers on the map
 * @param map
 * @param locations
 */
 function setMarkers(map, locations) {

  // place icons on the map
  for (var i = 0; i < locations.length; i++) {
    var place = locations[i];

    var latLng = new google.maps.LatLng(place.lat, place.lng);
    var marker;
    marker = new google.maps.Marker({
      position: latLng,
      map: map,
      icon: image,
      shape: shape,
      title: place.title,
      zIndex: place.zIndex,
      mType: 'standard'
    });

    google.maps.event.addListener(marker, 'click', (function(marker, index) {
      return function(){
        updateMarkers(marker);
        showDetail(locations, index);
        try {ga('send', 'event', 'map', 'click');} catch(err) {}
      }
    })(marker, i));

    markers.push(marker);
  }
}

google.maps.event.addDomListener(window, 'load', initialize);

/**
 * reset markers and set the clicked one to active
 * @param marker
 */
 function updateMarkers(marker,setActive) {
  // reset all icons to the normal state
  for (var i = 0; i < markers.length; i++) {
    markers[i].setIcon(image);
    markers[i].setClickable(true);
  }

  if (marker != -1) {
    function setActive(marker) {
      marker.setIcon(imageActive);
      marker.setClickable(false);
      map.setCenter(marker.getPosition());
      map.setZoom(11);
    }
    setActive(marker); // callback
  }
  else {
    map.setCenter({lat: 0, lng: 0});
    map.setZoom(1);

  }

}

/**
 * Populate the location detail
 * @param index
 * @param locations
 */

 var backupOriginalData = $('.inner__map__canvas').html();
 var backupOrigionalDataImg = $('#info-canvas').css('background-image');
 function showDetail(locations, index, init) {

  if (index === -1) {
    $('.inner__map__canvas').html(backupOriginalData);
    $('#info-canvas').css('background-image', backupOrigionalDataImg);
    $('#map-feature').removeClass('button--active');
    updateMarkers(-1);
  } else {

    $('#map-feature').addClass('button--active');
    _index = index;
    var _el = $('.inner__map__canvas'),
    _l = locations[index];
    _el.html('');
    _el.parent().css('background-image', "url(" + _l.imageUrl +")");
    _el.append('<h3>'+  _l.title + '</h3>');
    _el.append('<p>' + _l.description +'</p>');

    if (_l.linkUrl !== undefined) {
      var linkText = 'Learn More';
      var target = '';

      if (_l.linkText !== undefined) {
        linkText = _l.linkText;
      }
      _el.append('<a class="button__link" href="' + _l.link + '"' + target + '>' + linkText + '</a>');
    }
    if ($('.mobile-nav-link').is(":visible") && !init) {
      $('#info-canvas').goTo().focus();
    }
  }

}

$('.map__navigation__previous').on("click",function(e) {
  _index--;
  if (_index < 0) { _index = _json.length - 1; }
  showDetail(_json, _index);
  updateMarkers(markers[_index]);
});

$('.map__navigation__next').on("click",function(e) {
  _index++;
  if (_index >= _json.length) { _index = 0; }
  showDetail(_json, _index);
  updateMarkers(markers[_index]);
});

$('#btn-campus').on("click", function(e) {
  showDetail(0,-1);
});

(function($) {
  $.fn.goTo = function() {
    $('html, body').animate({
      scrollTop: $(this).offset().top + 'px'
    }, 'fast');
    return this; // for chaining
  }
})(jQuery);

});