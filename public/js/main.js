(function () {

  'use strict';

  var socket = io();
  var question, chA,chB,chC;
  var pos = 0;
  var questions;
  var quizDiv = document.querySelector('.quiz');

  socket.on('connect', function () {
    // console.log('Client conecting to server via socket');
  });

  socket.on('questions', function (data) {
    questions = data.questions;

    document.getElementById('start').addEventListener('click', function() {

      renderQuestion(pos);
      document.querySelector('.next').style.display = 'block';
      document.getElementById('start').style.display = 'none';
    })


    function renderQuestion(pos){
      question = questions[pos].question;

      quizDiv.innerHTML = "<h3>"+question+"</h3>";
    	document.querySelector('#title').innerHTML = "Question "+ (pos + 1) +" of "+ questions.length;
    	question = questions[pos].question;
    	chA = questions[pos].choices[0];
    	chB = questions[pos].choices[1];
    	chC = questions[pos].choices[2];
    	quizDiv.innerHTML = "<h3>"+question+"</h3>";
    	quizDiv.innerHTML += "<input type='radio' name='choices' value='A'> "+chA+"<br>";
    	quizDiv.innerHTML += "<input type='radio' name='choices' value='B'> "+chB+"<br>";
    	quizDiv.innerHTML += "<input type='radio' name='choices' value='C'> "+chC+"<br><br>";
    	// quizDiv.innerHTML += "<button class='btn'>Submit Answer</button>";
    }
    document.querySelector('.next').addEventListener('click', function () {
      pos++;
      console.log(pos);

      var choices = document.getElementsByName("choices");
      	for(var i=0; i<choices.length; i++){
      		if(choices[i].checked){
      			var choice = choices[i].value;
      		}
      	}

        console.log(choice);
        renderQuestion(pos);
    })

  });

}())
