'use strict';

var eventConfig = require('./config').events;
var fs = require('fs');
var answers = require('./data/answers.json').questions;

module.exports = (socket) => {
  var userAnswers = [];

  console.log('client connected via socket')

  fs.readFile(__dirname + '/data/questions.json', 'utf-8', (err, questions) => {

    socket.emit(eventConfig.QUESTIONS, JSON.parse(questions));
  });

  socket.on(eventConfig.ANSWERS, (answer) => {
    userAnswers.push(answer);

    answer === answers[userAnswers.length -1].correctAnswer ?
      socket.emit(eventConfig.CORRECT, {text: 'correct'}) :
      socket.emit(eventConfig.CORRECT, {text: 'wrong'});
  });
};
