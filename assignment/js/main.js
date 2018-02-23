/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

  var downloadData;
  //parse download data
  var parseData = function(downloadData) {
    return JSON.parse(downloadData);
  };

  var inputURL;
  var latitudeKey;
  var longitudeKey;

  //define a function to update the user input value
  var myFunction = function(){
     inputURL = $('#text-input1').val();
     latitudeKey = $('#text-input2').val();
     longitudeKey = $('#text-input3').val();
  };

  // a function to use your parsed data to create a bunch of marker objects (don't plot them!)
  var makeMarkers = function(data) {
    var collection = [];
    for(i = 0; i < data.length; i++){
      var marker = L.marker([data[i][latitudeKey],data[i][longitudeKey]]);
      collection.push(marker) ;
    }
    return collection;
  };

  // a function that takes this collection of markers and puts them on the map
  var plotMarkers = function(markers) {
    for(i = 0; i < markers.length; i++){
    markers[i].addTo(map);
    }
  };
  
// click the button to map the data
  $('button').click(function(){
    $(document).ready(function(){
      myFunction();
      var downloadData = $.ajax(inputURL);
      downloadData.done(function(data) {
      var parsed = parseData(data);
      var markers = makeMarkers(parsed);
      plotMarkers(markers);
      });

    });

  });
