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

  function drawMarker (type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    marker.setMap(currentMap);
  }

  // drawMarker('hotel', [40.705137, -74.007624]);
  // drawMarker('restaurant', [40.705137, -74.013940]);
  // drawMarker('activity', [40.716291, -73.995315]);

});

$(document).ready(function(){

  // populate the options
  for (var i = 0; i<hotels.length; i++){
    var newhotel = $("<option></option>").text(hotels[i].name);
    $('#hotel-choices').append(newhotel);
  }

  for (var i = 0; i<restaurants.length; i++){
    var newrest = $("<option></option>").text(restaurants[i].name);
    $('#restaurant-choices').append(newrest);
  }

  for (var i = 0; i<activities.length; i++){
    var newactivity = $("<option></option>").text(activities[i].name);
    $('#activity-choices').append(newactivity);
  }

  var selectedHotel;


  // adding choices to itinerary
  $('#hotel-choices').closest('div').find('button').on('click', function(){
    var selectedHotel = $(this).closest('div').find('option:selected').val();
    var itineraryItem = $("<div class='itinerary-item'></div>");
    var hotelSpan = $("<span class='title'></span>").text(selectedHotel);
    var xbutton = $("<button class='btn btn-xs btn-danger remove btn-circle'></button>").text('x');
    itineraryItem.append(hotelSpan,xbutton);
    $('.list-group:first').append(itineraryItem);
  });

    $('#restaurant-choices').closest('div').find('button').on('click', function(){
    var selectedRest = $(this).closest('div').find('option:selected').val();
    var itineraryItem = $("<div class='itinerary-item'></div>");
    var restSpan = $("<span class='title'></span>").text(selectedRest);
    var xbutton = $("<button class='btn btn-xs btn-danger remove btn-circle'></button>").text('x');
    itineraryItem.append(restSpan,xbutton);
    $('.list-group:nth(1)').append(itineraryItem);
  });

      $('#activity-choices').closest('div').find('button').on('click', function(){
    var selectedActivity = $(this).closest('div').find('option:selected').val();
    var itineraryItem = $("<div class='itinerary-item'></div>");
    var actSpan = $("<span class='title'></span>").text(selectedActivity);
    var xbutton = $("<button class='btn btn-xs btn-danger remove btn-circle'></button>").text('x');
    itineraryItem.append(actSpan,xbutton);
    $('.list-group:nth(2)').append(itineraryItem);
  });




});