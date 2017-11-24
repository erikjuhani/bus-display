const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const apiHandler = require('./ApiHandler.js')
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.get('/', (req, res) => {
  //apiHandler.getData()
});

io.on('connection', socket => {
  console.log('a user connected with socket ' + socket.id);
  apiHandler().then(data => {
    socket.emit('data', { coordinate: {lat: data.lat, lon: data.lon}});    
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});