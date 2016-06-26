'use strict';

var eventConfig = require('./config').events;
var fs = require('fs');
var questions = require('./data/questions.json').questions;

module.exports = (socket) => {
  // var userAnswers = [];

  console.log('client connected via socket')

  fs.readFile(__dirname + '/data/questions.json', 'utf-8', (err, questions) => {

    socket.emit(eventConfig.QUESTIONS, JSON.parse(questions));
  });

  socket.on(eventConfig.ANSWERS, function (answer) {
    // userAnswers.push(answer);
    console.log('answer',answer);
    console.log('correct',questions[userAnswers.length -1].correctAnswer);
    if (answer === questions[userAnswers.length -1].correctAnswer) {
      console.log('horray');
    }

    socket.emit('message', {text: 'corrext'});
  });
};
