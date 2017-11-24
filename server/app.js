const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + './../src/index.html');
});

io.on('connection', socket => {
  console.log('a user connected with socket ' + socket.id);
  socket.emit('data', { coordinate: {lat: 60, lon: 24}});
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});