var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages =[{
    id: 1,
    text: "Hola soy jugador 1",
    author: "Player_1"
}];

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.status(200).send("The Game!");
});

io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con sockets');
  socket.emit('messages', messages);

  socket.on('new-message', function(data) {
    messages.push(data);

    io.sockets.emit('messages', messages);
  });
});

server.listen(8080, function() {
  console.log("Servidor en funcionamiento en http://localhost:8080");
})
