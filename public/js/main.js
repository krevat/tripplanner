

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

function getCoordinates(name, model){
  var locId;
  var coords;
  for(var i = 0; i < model.length; i ++){
    if(name === model[i].name){
      locId = model[i].placeId
      break;
    }
  }
  for(var i = 0; i < places.length; i++){
    if(locId === places[i].id){
      coords = places[i].location;
      break;
    }
  }
  return [coords, locId];
}

  // function to add event to itinerary
  // takes an ID (STR) & a childNum (INT)
  function addEventToItinerary(id, childNum, model){
    $(id).closest('div').find('button').on('click', function(){
      var selectedItem = $(this).closest('div').find('option:selected').val();
      var coords = getCoordinates(selectedItem, model)
      var itineraryItem = $("<div class='itinerary-item'></div>");
      var idSpan = $("<span class='title'></span>").text(selectedItem);
      var xbutton = $("<button class='btn btn-xs btn-danger remove btn-circle'></button>").text('x');
      itineraryItem.append(idSpan,xbutton);
      


      if (!markerExists(coords[1])){
        $('.list-group:nth(' + childNum + ')').append(itineraryItem);
        drawMarker(model, coords[0], coords[1]);
      }

    });
  }

  addEventToItinerary('#hotel-choices', 0, hotels);
  addEventToItinerary('#restaurant-choices', 1, restaurants);
  addEventToItinerary('#activity-choices', 2, activities);

  // function to remove items from itinerary
    $('.panel-default').on('click', '.remove', function () {
      //we want to delete this
      var itineraryDiv = $(this).closest('.itinerary-item').closest('div');
      var whichItinerary = itineraryDiv.closest('ul').siblings().text().substr(3);
      var nameOfPlace = $(this).closest('.itinerary-item').find('span.title').text();
      
      // get the model
      var model;
      if (whichItinerary === 'Hotel'){
        model = hotels;
      } else if (whichItinerary === 'Restaurants'){
        model = restaurants;
      } else {
        model = activities;
      }

      // get the placeId
      var locId;
      for (var i = 0; i < model.length; i++) {
        if (nameOfPlace === model[i].name){
          locId = model[i].placeId;
          break;
        }
      }
      // console.log(locId);

      // remove from markers
      removeMarker(locId);
      // remove element from dom
      itineraryDiv.remove();
    });

    $('#day-add').on('click', function() {
      var newDayNum = +$(this).prev().text() + 1;
      var newDayButton = $('<button class="btn btn-circle day-btn num-btn"></button>').text(newDayNum);
      $(newDayButton).insertBefore($(this));
      // get the current day button,
      var currentDay = $('.day-buttons').find('.current-day')
      // console.log(currentDay)
      var idx = +currentDay.text()
      domArr[idx] = $('#itinerary').clone()
      currentDay.removeClass('current-day')
      newDayButton.addClass('current-day')
      $('#itinerary').replaceWith(domArr[0].clone())
      // console.log(domArr);
      // save that day's stuff to domArr,
      // then switch current day to newdaynum
      // add domarr[0] to the dom / display none
    });

    $('.day-buttons').on('click', '.num-btn', function(){
      var dayNum = +$(this).text();
      var currentDay = $('.day-buttons').find('.current-day')
      var idx = +currentDay.text()
      domArr[idx] = $('#itinerary').clone()
      // console.log(dayNum)
      currentDay.removeClass('current-day')
      $(this).addClass('current-day')
      $('#itinerary').replaceWith(domArr[dayNum].clone())
    })

    var domArr = [];
    domArr.push($('#itinerary').clone())
    console.log(domArr)


});