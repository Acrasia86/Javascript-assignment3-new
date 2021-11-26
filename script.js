let questions = [
  {
    questionText: "Mel Gibson played in Braveheart",
    answers: ["True", "False"],
    correctAnswer: "True",
  },
  {
    questionText: "Tom Hardy played Bane in Batman",
    answers: ["True", "False"],
    correctAnswer: "True",
  },
    {
    questionText: "James Corden played in IRobot",
    answers: ["True", "False"],
    correctAnswer: "False",
  },
  {
    questionText: "Who played in the movie Battle Los Angeles?",
    answers: ["Aaron Eckhart", "Vin Diesel", "Prad Pitt"],
    correctAnswer: "Aaron Eckhart",
  },
  {
    questionText: "Who played in the movie Taken?",
    answers: ["Denzel Washington", "Liam Neeson", "Johnny Depp"],
    correctAnswer: "Liam Neeson",
  },
  {
    questionText: "Who played in the movie The Green Mile?",
    answers: ["Matt Damon", "Harrison Ford", "Tom Hanks"],
    correctAnswer: "Tom Hanks",
  },
  {
    questionText: "Select all actors with the name Tom in it",
    answers: ["Tom Hanks", "Tom Holland", "Tom Hardy", "David Hasslehoff"],
    correctAnswer1: "Tom Hanks",
    correctAnswer2: "Tom Holland",
    correctAnswer3: "Tom Hardy"
  },
  
];

let questionTextElement = document.querySelector(".question");
let answersElement = document.querySelector(".answers");
let checkAnswerButton = document.querySelector(".check-answer");
let gameContainer = document.querySelector(".game-container");
let checkScoreButton = document.createElement('button');

checkScoreButton.textContent = 'Check your score';

checkScoreButton.classList.add('btn');
checkScoreButton.classList.add('btn-outline-info');

let scoreLabel = document.createElement('label');
let darkModeLabel = document.querySelector('.darkmode-label');

let newDiv;

let newCheckbox;
let score = 0;
let maxScore = 7;
let questionCounter = 0;

function updateState() {

  questionTextElement.textContent = questions[questionCounter].questionText;

  if (questionCounter < questions.length) {
  
    for (let i = 0; i < questions.length; i++) {
 
      newDiv = document.createElement("div");
      answersElement.appendChild(newDiv);

      newDiv.classList.add('answerDivs');
      newCheckbox = document.createElement("input");
     
      newCheckbox.type = "radio";
      newCheckbox.name = 'firstQuestions'
      newCheckbox.classList.add('answer-checkbox');
      
      if(questionCounter === 6) {
        newCheckbox.type = "checkbox";
        checkAnswerButton.textContent = 'Choose answers';
    }
      newCheckbox.value = questions[questionCounter].answers[i];
      newDiv.textContent = questions[questionCounter].answers[i];
      newDiv.appendChild(newCheckbox);

      if(newDiv.textContent === '') {
          newDiv.remove();
      }
    }
 
  }
}

function nextQuestion() {
  updateState();
  checkAnswer();
}

function updateQuestionState() {
    let checkBoxes = document.querySelectorAll(".answer-checkbox");
    newDiv.classList.add('newDiv');
  
      for (let i = 0; i < checkBoxes.length; i++) {
      
      if (
          checkBoxes[i].value === questions[questionCounter].correctAnswer &&
          checkBoxes[i].checked === true
        ) {
          console.log("correct answer");
          score++;
          checkBoxes[i].checked = false;
        
         }  else if(checkBoxes[0].value === questions[questionCounter].correctAnswer1 &&
            checkBoxes[1].value === questions[questionCounter].correctAnswer2 &&
            checkBoxes[2].value === questions[questionCounter].correctAnswer3 &&
            checkBoxes[0].checked === true && checkBoxes[1].checked === true && checkBoxes[2].checked === true && checkBoxes[3].checked === false) {
       
            console.log('correct answer');
            score++;
            break;
            }
         else if(checkBoxes[i].value !== questions[questionCounter].correctAnswer &&
          checkBoxes[i].checked === true) {
          console.log("wrong answer");
          checkBoxes[i].checked = false;
        }
      }
}

function checkAnswer() {


  checkAnswerButton.addEventListener("click", function (e) {
 
    updateQuestionState();
  
    if (questions.length - 1 > questionCounter) {

      questionCounter++;
      resetState();
      updateState();

    } else {
      questionTextElement.textContent = "Game Finnished!";
 
      gameContainer.appendChild(checkScoreButton);
      checkAnswerButton.remove();
      resetState();
      checkYourScore();
    }
    e.preventDefault();
    //    checkAnswer();
  });

}
function resetState() {
    while (answersElement.firstChild) {
        answersElement.removeChild(answersElement.firstChild)
      }

}

function checkYourScore() {
    scoreLabel = document.createElement('label');
    scoreLabel.textContent = `Your score was: ${score}`;
    

    checkScoreButton.addEventListener('click', function() {
        checkScoreButton.remove();
        gameContainer.appendChild(scoreLabel);
     
        if(score > maxScore * 0.5 && score < maxScore) {
            scoreLabel.style.color = 'orange';
        }
        else if(score === maxScore) {
            scoreLabel.style.color = 'green';
        }
       
        else {
            scoreLabel.style.color = 'red';
      
        }
    })
}


function switchToDarkMode() {


    let getAnswersElements = document.querySelectorAll('.answers div');
    let getDarkModeLabels = document.querySelectorAll('.darkmode-label');
    for(let i = 0; i < getDarkModeLabels.length; i++) {
        getDarkModeLabels[i].classList.toggle('darkmode-for-labels');
    }
 
    for(let i = 0; i < getAnswersElements.length; i++) {
        getAnswersElements[i].classList.toggle('dark-mode'); 
    }
    var element = document.querySelector('main');
    checkAnswerButton.classList.toggle('darkmode-for-labels');

    questionTextElement.classList.toggle('dark-mode');
    element.classList.toggle("dark-mode");

    checkScoreButton.classList.toggle('darkmode-for-labels');
  }




nextQuestion();
