const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const apiHandler = require('./ApiHandler.js')
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './../client')));

app.get('/', (req, res) => {
  //apiHandler.getData()
  res.send('HELLO');
});

io.on('connection', socket => {
  let coordinate;
  setInterval(callApiHandler, 1000);
  console.log('a user connected with socket ' + socket.id);

  function callApiHandler() {
    apiHandler(9999).then(data => {
      if (!coordinate || coordinate && (coordinate.lat != data.lat || coordinate.lon != data.lon)) {

        coordinate = {lat: data.lat, lon: data.lon};
        socket.emit('data', [data, { coordinate: {lat: data.lat, lon: data.lon}}]);
      }
    });
  }
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});