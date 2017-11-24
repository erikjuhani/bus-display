const map = L.map('map').setView([60, 24], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let bus = L.marker().addTo(map);

const socket = io('http://localhost:3000');
socket.on('data', (data) => {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
  bus.setLatLng([data.coordinate.lat, data.coordinate.lon]);
});