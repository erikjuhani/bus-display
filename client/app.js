load().then((data) => {
  console.log(data);
  const server = {
    url: 'http://localhost',
    port: 3000
  }
  const map = L.map('map').setView([60, 24], 13);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const busIcon = L.icon({
      iconUrl: './assets/img/busIcon.png',
      iconSize: [128, 128]
  });

  const stopIcon = L.icon({
    iconUrl: './assets/img/stopIcon.png',
    iconSize: [128, 128]
  });

  let bus = L.marker([60, 24], {icon: busIcon}).addTo(map);

  let stops = data.data.pattern.stops;
  stops.map(x => {
    L.marker([x.lat, x.lon]).addTo(map);
  })
  
  const socket = io(server.url + ':' + server.port);
  socket.on('data', (data) => {
    console.log(data[1]);
    const coordinate = data[1] ? data[1].coordinate : null;
    if(coordinate && !isNaN(coordinate.lat) && !isNaN(coordinate.lon)) {
      map.panTo([coordinate.lat, coordinate.lon], 15);
      bus.setLatLng([coordinate.lat, coordinate.lon]);
    }
  });
})