var drawMarker;
var iconURLs;
var currentMap;
var removeMarker;
// var markers;
var markerArr;

$(function initializeMap (){

  var graceHopperAcademy = new google.maps.LatLng(40.705086, -74.009151);

  var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

  var mapCanvas = document.getElementById('map-canvas');

  var currentMap = new google.maps.Map(mapCanvas, {
    center: graceHopperAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  // markerArr.push({});
  markerArr = [];
  markerArr.push({});

  // markers = {};
  drawMarker = function(type, coords, placeId, day){

    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    // console.log(placeId);
    // markers[placeId] = marker;
    markerArr[day-1][placeId] = marker;
    marker.setMap(currentMap);
    // console.log(markers);
  };

  removeMarker = function(placeId, day){
    // markers[placeId].setMap(null);
    // markers[placeId] = null;
    markerArr[day-1][placeId].setMap(null);
    // markerArr[day-1][placeId] = null;
    delete markerArr[day-1][placeId];
  };

  wipeMap = function(day){
    console.log(day)
    for (var marker in markerArr[day-1]){
      // console.log(marker)
      markerArr[day-1][marker].setMap(null);
    }
  }

  fillMap = function(day){
    for (var marker in markerArr[day-1]){
      markerArr[day-1][marker].setMap(currentMap);
    }
  }

  markerExists = function(placeId, day){
    if (!markerArr[day-1][placeId]){
    // if (!markers[placeId]){
      return false;
    }
    return true;
  };

  // drawMarker('hotel', [40.705137, -74.007624]);
  // drawMarker('restaurant', [40.705137, -74.013940]);
  // drawMarker('activity', [40.716291, -73.995315]);

  // mapArr.push(currentMap);

});