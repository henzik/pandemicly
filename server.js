const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// setup express to host the game
app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile('index.html'));

// io sockets
io.on('connection', (socket) => {
  console.log(socket.id + ' || connected');
  socket.on('disconnect', () => {
    console.log(socket.id + ' || disconnected');
  });
  socket.on('ready', () => {
    console.log(socket.id + ' || is ready')
    socket.emit('cat');
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
