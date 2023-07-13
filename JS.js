(function() {
	var questions = [{
	  question: "Which language runs in a web browser?",
	  choices: ["Java", "C", "Python", "Rust", "JavaScript"],
	  correctAnswer: 4
	}, {
	  question: "When was Javascript created ?",
	  choices: ["1984", "2000", "1996", "1995", "1994"],
	  correctAnswer: 3
	}, {
	  question: "React was originally created by...",
	  choices: ["Kid Cudi", "Almero Steyn", "Jordan Walke", "Jesse Beach", "Caleb Meredith"],
	  correctAnswer: 2
	}, {
	  question: "What styles a webpage?",
	  choices: ["HTML", "CSS", "JSON", "SQL", "All"],
	  correctAnswer: 1
	}, {
	  question: "Which of the following is a server-side scripting language?",
	  choices: ["PHP", "CSS", "JavaScript", "HTML", "XML"],
	  correctAnswer: 0
	}];
	
	var questionCounter = 0;
	var selections = [];
	var quiz = $('#quiz');

	displayNext();
	
	$('#next').on('click', function (e) {
	  e.preventDefault();
	  
	  if(quiz.is(':animated')) {        
		return false;
	  }
	  choose();
	  
	  if (isNaN(selections[questionCounter])) {
		alert('Please make a selection!');
	  } else {
		questionCounter++;
		displayNext();
	  }
	});
	
	$('#start').on('click', function (e) {
	  e.preventDefault();
	  
	  if(quiz.is(':animated')) {
		return false;
	  }
	  questionCounter = 0;
	  selections = [];
	  displayNext();
	  $('#start').hide();
	});
	
	$('.next').on('mouseenter', function () {
	  $(this).addClass('active');
	});
	$('.next').on('mouseleave', function () {
	  $(this).removeClass('active');
	});

	$('.start').on('mouseenter', function () {
	  $(this).addClass('active');
	});
	$('.start').on('mouseleave', function () {
	  $(this).removeClass('active');
	});
	
	function createQuestionElement(index) {
	  var qElement = $('<div>', {
		id: 'question'
	  });
	  
	  var header = $('<h2>Question ' + (index + 1) + ' :</h2>');
	  qElement.append(header);
	  
	  var question = $('<p>').append(questions[index].question);
	  qElement.append(question);
	  
	  var radioButtons = createRadios(index);
	  qElement.append(radioButtons);
	  
	  return qElement;
	}
	
	function createRadios(index) {
	  var radioList = $('<ul>');
	  var item;
	  var input = '';
	  for (var i = 0; i < questions[index].choices.length; i++) {
		item = $('<li>');
		input = '<input type="radio" name="answer" value=' + i + ' />';
		input += questions[index].choices[i];
		item.append(input);
		radioList.append(item);
	  }
	  return radioList;
	}
	
	function choose() {
	  selections[questionCounter] = +$('input[name="answer"]:checked').val();
	}
	
	function displayNext() {
	  quiz.fadeOut(function() {
		$('#question').remove();
		
		if(questionCounter < questions.length){
		  var nextQuestion = createQuestionElement(questionCounter);
		  quiz.append(nextQuestion).fadeIn();
		  if (!(isNaN(selections[questionCounter]))) {
			$('input[value='+selections[questionCounter]+']').prop('checked', true);
		  }
		  
		  if(questionCounter === 0){
			
			$('#next').show();
		  }
		}else {
		  var scoreElem = displayScore();
		  quiz.append(scoreElem).fadeIn();
		  $('#next').hide();
		  $('#start').show();
		}
	  });
	}
	
	function displayScore() {
	  var score = $('<p>',{id: 'question'});
	  
	  var numCorrect = 0;
	  for (var i = 0; i < selections.length; i++) {
		if (selections[i] === questions[i].correctAnswer) {
		  numCorrect++;
		}
	  }
	  
	  score.append('You have scored ' + numCorrect + ' out of ' + questions.length);
	  return score;
	}
  })();