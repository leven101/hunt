function createRequest() {
  var result = null;
  if (window.XMLHttpRequest) {
    // FireFox, Safari, etc.
    result = new XMLHttpRequest();
  }
  return result;
}
function handleResponse(req) {
    var resp = req.responseText;
    alert(resp); 
}
function postRequest(lat, lon) {
  var req = createRequest(); // defined above
  // Create the callback:
  req.onreadystatechange = function() {
    if (req.readyState != 4) return; // Not there yet
    if (req.status != 200) {
      // Handle request failure here...
      alert(req.status);
      return;
    }
    // Request successful, read the response
    handleResponse(req)
  }
  var url = "https://eemcaf250g.execute-api.us-east-1.amazonaws.com/prod/venus_alpha";
  req.open("POST", url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  var jsonString = '{"lat":"' + lat + '","long":"' + lon + '"}'; 
  req.send(jsonString);
} 
function buildLatLonJson(lat, lon) {
  var obj =  new Object();
  obj.lat = lat;
  obj.lon = lon;
  return JSON.stringify(obj);
}
App.controller('home', function (page) {
  // this runs whenever a 'home' page is loaded
  // 'page' is the HTML app-page element
    $(page)
        .find('#btnSearch')
            .on('click', function () {
              var address = $('#btnAddress').val();
              if (address) {
                alert(address);
              }
            });
    $(page)
        .find('#btnLocation')
            .on('click', function () {
              navigator.geolocation.getCurrentPosition(function(location) {
                var lat =  location.coords.latitude;
                var lon = location.coords.longitude;
                console.log(buildLatLonJson(lat, lon));
                postRequest(lat, lon);
              });
            });
});
/* put your javascript here */
try {
  App.restore(); // it loads/restores the app
} catch (err) {
  App.load('home'); // in case of error it loads the default page
}
