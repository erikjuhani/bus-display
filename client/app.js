function lerp(v0, v1, t) {
  return v0 + t * (v1 - v0);
}

load().then((data) => {
  console.log(data);
  const server = {
    url: 'http://localhost',
    port: 3000
  }

  const options = {
    zoomControl: false,
  };

  const map = L.map('map', options).setView([60, 24], 13);
  
  L.tileLayer('http://api.digitransit.fi/map/v1/{id}/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ',
  id: 'hsl-map'}).addTo(map);

  const busIcon = L.icon({
      iconUrl: './assets/img/busIcon.png',
      iconSize: [32, 32]
  });

  const stopIcon = L.icon({
    iconUrl: './assets/img/stopIcon.png',
    iconSize: [16, 16]
  });

  let bus = L.marker([60, 24], {icon: busIcon}).addTo(map);
  let bus2 = L.marker([0, 0], {icon: busIcon}).addTo(map);
  
  let stops = data.data.pattern.stops;
  let path = [];
  let dir = 0;

  stops.map(x => {
    path.push(L.latLng(x.lat, x.lon));
    L.marker([x.lat, x.lon], {icon: stopIcon, zIndexOffset: -1}).addTo(map);
  });

  for (let i = path.length-1; i >= 0; i--) {
    path.push(path[i]);
  }

  let animMarker = L.Marker.movingMarker(path, 200000, {icon: busIcon}).addTo(map);
  animMarker.start();

  console.log(animMarker.getLatLng());

  console.log(animMarker);
  /*setInterval(() => {
    map.panTo([path[i].lat, path[i].lon], 15);
    let latLerp;
    let lonLerp;

    if (dir === 0) {
      i++;
      latLerp = lerp(path[i-1].lat, path[i].lat, 0.5);
    }
    if (dir === 1) {
      i--;
      latLerp = lerp(path[i+1].lat, path[i].lat, 0.5);
    }

    bus.setLatLng([path[i].lat, path[i].lon]);    

    if (i === path.length - 1) {
      dir = 1;
    } else if (i === 0) {
      dir = 0;
    }

  }, 1000);*/
  
  const socket = io(server.url + ':' + server.port);
  socket.on('data', (data) => {
    console.log(data[1]);
    const coordinate = data[1] ? data[1].coordinate : null;
    if(coordinate && !isNaN(coordinate.lat) && !isNaN(coordinate.lon)) {
      //map.panTo([coordinate.lat, coordinate.lon], 15);
      bus.setLatLng([coordinate.lat, coordinate.lon]);
    }
  });
})