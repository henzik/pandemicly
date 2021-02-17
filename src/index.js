const express = require('express');
const { emit } = require('process');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// setup express to host the game
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.get('/meep', (req, res) => res.send('meep'));

let players = []

// io sockets
io.on('connection', (socket) => {
  console.log(socket.id + ' || connected');
  players.push(socket.id)
  io.emit('gamestate', players);
  socket.on('disconnect', () => {
    console.log(socket.id + ' || disconnected');
    players.pop(socket.id)
    io.emit('gamestate', players);
  });
});

http.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});
