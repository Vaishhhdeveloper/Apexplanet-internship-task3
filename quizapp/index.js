const questions = [{
    question : "What is the default value of a local variable in Java?", answers: [{ text: "0", correct: false},{ text: " Null", correct: false},{ text: "Undefined", correct: false},{ text: "Compiler Error", correct:true}]
},
{
    question : "What is the size of a char data type in Java?", answers: [{ text: "2 bytes", correct: true},{ text: "1 bytes", correct: false},{ text: "4 bytes", correct: false},{ text: "Depends on the system", correct:false}]
},
{
    question : "Which method is used to compare two strings in Java, ignoring case differences?", answers: [{ text: "equals()", correct: false},{ text: " compareTo()", correct: false},{ text: "equalsIgnoreCase()", correct: true},{ text: "compareToIgnoreCase()", correct:false}]
},{
    question : "Which of these is not a valid access modifier in Java?", answers: [{ text: "protected", correct: false},{ text: "default", correct: true},{ text: "public", correct: false},{ text: "private", correct:false}]
},{question : "Which Java feature best represents 'Write Once, Run Anywhere'?", answers: [{ text: "Object-Oriented Programming", correct: false},{ text: "JVM", correct: false},{ text: "JRE", correct: false},{ text: "Platform Independence", correct:true}]}];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo +" . "+currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
      const selectedBtn = e.target;
      const iscorrect = selectedBtn.dataset.correct === "true";
      if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
      }
      else{
        selectedBtn.classList.add("incorrect");
      }
      Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
      });
      nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again!";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
       handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();