const server = {
  url: 'http://localhost',
  port: 3000
};

const options = {
  zoomControl: false,
};

const map = L.map('map', options).setView([60, 24], 13);

L.tileLayer('http://api.digitransit.fi/map/v1/{id}/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ',
  id: 'hsl-map'}).addTo(map);

let bus = L.marker([0, 0]).addTo(map);

const socket = io(server.url + ':' + server.port);
socket.on('data', (data) => {
  console.log(data[1]);
  const coordinate = data[1] ? data[1].coordinate : null;
  if(coordinate && !isNaN(coordinate.lat) && !isNaN(coordinate.lon)) {
    map.panTo([coordinate.lat, coordinate.lon], 15);
    bus.setLatLng([coordinate.lat, coordinate.lon]);
  }
});
