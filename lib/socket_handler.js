'use strict';

var eventConfig = require('./config').events;
var fs = require('fs');

module.exports = (socket) => {
  console.log('client connected via socket')

  fs.readFile(__dirname + '/data/questions.json', 'utf-8', (err, questions) => {


    socket.emit(eventConfig.QUESTIONS, JSON.parse(questions));
  });


};
