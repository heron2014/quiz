(function () {
  console.log('working');

  var socket = io();

  socket.on('connect', function () {
    console.log('Client conecting to server via socket');
  })
}())
