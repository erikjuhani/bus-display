const map = L.map('map').setView([60, 24], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let bus = L.marker([0, 0]).addTo(map);

const socket = io('http://localhost:3000');
socket.on('data', (data) => {
  console.log(data);
  if(data) {
    map.panTo([data.coordinate.lat, data.coordinate.lon], 15);
    bus.setLatLng([data.coordinate.lat, data.coordinate.lon]);
  }
});