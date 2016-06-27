(function () {

  'use strict';

  var socket = io(),
      question,
      chA,
      chB,
      chC,
      pos = 0,
      questions,
      doc = document,
      quizDiv = doc.querySelector('.quiz'),
      choices = doc.getElementsByName("choices"),
      res = doc.getElementById('res');

  function nodeListToArray(nodelist) {
    return Array.prototype.slice.call(nodelist);
  }

  function checkAnswer(choices) {
    var res = [];
    nodeListToArray(choices).forEach(function (choice) {
      if (choice.checked) {
        res.push(choice.value);
      }
    });
    return res.toString();
  }

  socket.on('connect', function () {
    // console.log('Client conecting to server via socket');
  });

  socket.on('questions', function (data) {
    questions = data.questions;

    doc.getElementById('start').addEventListener('click', function() {

      renderQuestion(pos);
      doc.querySelector('.next').style.display = 'block';
      doc.getElementById('start').style.display = 'none';
    })


    function renderQuestion(pos) {

      if (pos >= questions.length) {
        quizDiv.innerHTML = "<h3>No more questions</h3>";
        pos = 0;

        return false;
      }

      question = questions[pos].question;

      quizDiv.innerHTML = "<h3>"+question+"</h3>";
    	doc.querySelector('#title').innerHTML = "Question "+ (pos + 1) +" of "+ questions.length;
    	question = questions[pos].question;
    	chA = questions[pos].choices[0];
    	chB = questions[pos].choices[1];
    	chC = questions[pos].choices[2];
    	quizDiv.innerHTML = "<h3>"+question+"</h3>";
      quizDiv.innerHTML += "<form>";
    	quizDiv.innerHTML += "<input type='radio' required name='choices' value='A'> "+chA+"<br>";
    	quizDiv.innerHTML += "<input type='radio'  name='choices' value='B'> "+chB+"<br>";
    	quizDiv.innerHTML += "<input type='radio'  name='choices' value='C'> "+chC+"<br><br>";
      quizDiv.innerHTML += "</form>";
      // quizDiv.innerHTML += "<button class='btn'>Submit Answer</button>";
    }
    doc.querySelector('.next').addEventListener('click', function () {

      var checkedAnswer = checkAnswer(choices);
      socket.emit('answers', checkedAnswer);

      pos++;
      renderQuestion(pos);
    });

    socket.on('correct', function (data) {
      if (pos >= questions.length) {
        res.textContent = '';
        return false;
      }
      res.textContent = data.text;
    });

  });

}())
