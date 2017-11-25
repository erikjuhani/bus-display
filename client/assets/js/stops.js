var stops  = [];
var currentStop  = "";
var previousStop = "";
var nextStop  = "";
var dir = 1;
var state = "";
var dontChange = false;

function load(){
	return getBusStops();
}

function listenStops(bus, stops, dir = 1){
	///getBusStops().then(response => {

	var coords = bus.getLatLng();

	var closest = NearestCity(stops, coords.lat, coords.lng);
	var busDistanceToStop        = getDistanceFromLatLonInKm(coords.lat, coords.lng, stops[closest].lat, stops[closest].lon);
	var oldStopDistanceToNewStop = getDistanceFromLatLonInKm(stops[closest].lat, stops[closest].lon, stops[closest++].lat, stops[closest++].lon);

	//console.log(busDistanceToStop * 1000);
	//console.log(oldStopDistanceToNewStop * 1000);

	console.log(stops[closest].name);

	$('[data-stop=current]').text(stops[closest].name);

	var prev = "-";
	var next = "-";

	if( typeof stops[closest - 1 ] === 'undefined' || stops[closest - 1 ] === null ){
	    prev = '-';
	}else{
		prev = stops[closest - 1 ].name;
	}

	if( typeof stops[closest + 1 ] === 'undefined' || stops[closest + 1 ] === null ){
	    next = '-';
	}else{
		next = stops[closest + 1 ].name;
	}

	if(dir == 1){
		$('[data-stop=next]').text(next);
		$('[data-stop=previous]').text(prev);
	}else{
		$('[data-stop=next]').text(prev);
		$('[data-stop=previous]').text(next);
	}

	//});
}


function getBusStops(){
	return new Promise((resolve, reject) => {
		$.ajax({
			url: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ "query": "{ pattern(id:\"HSL:10" + routeId + ":0:01\") { name stops {name lat lon } } }"}),
			success: function(response){
				resolve(response);
			},
			error: function(err){
				reject(err);
			}
		});
	});

}

function getItinerary(response){
	return new Promise((resolve, reject) => {
		$.ajax({
			url: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ "query": "plan( from: {lat: 60.4, lon: 24.5} to: {lat: 60.41, lon: 24.51} numItineraries: 3  ) { itineraries {   legs {  startTime  endTime  mode  duration  realTime  distance  transitLeg   } }  }"}),
			success: function(response){
				resolve(response);
			},
			error: function(err){
				reject(err);
			}
		});
	});
}

function drawBusStops(){

}

function drawItinerary(){

}

function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
  lat1 = deg2rad(lat1);
  lat2 = deg2rad(lat2);
  lon1 = deg2rad(lon1);
  lon2 = deg2rad(lon2);
  var R = 6371; // km
  var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  var y = (lat2 - lat1);
  var d = Math.sqrt(x * x + y * y) * R;
  return d;
}

function NearestCity(stops, latitude, longitude) {
  var mindif = 99999;
  var closest;

  for (index = 0; index < stops.length; ++index) {
    var dif = PythagorasEquirectangular(latitude, longitude, stops[index].lat, stops[index].lon);
    if (dif < mindif) {
      closest = index;
      mindif = dif;
    }
  }

  return closest;

  //alert(stops[closest]);
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}