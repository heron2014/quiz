'use strict';

var eventConfig = require('./config').events;
var fs = require('fs');
var questions = require('./data/questions.json').questions;

module.exports = (socket) => {
  var userAnswers = [];

  console.log('client connected via socket')

  fs.readFile(__dirname + '/data/questions.json', 'utf-8', (err, questions) => {

    socket.emit(eventConfig.QUESTIONS, JSON.parse(questions));
  });

  socket.on(eventConfig.ANSWERS, function (answer) {
    userAnswers.push(answer);
    if (answer === questions[userAnswers.length -1].correctAnswer) {
      socket.emit('correct', {text: 'correct'});
    } else {
      socket.emit('correct', {text: 'wrong'})
    }
  });
};
