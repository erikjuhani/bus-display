var stops  = [];
var currentStop  = "";
var previousStop = "";
var nextStop  = "";

function load(){
	getBusStops().then(response => {

		drawBusStops(response);
		
		console.log(response);
	});
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
