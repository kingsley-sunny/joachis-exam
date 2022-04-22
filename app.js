const questions = [
  {
    id: "question1",
    question: "what is the full meaning of HTML",
    options: {
      a: "Hyper text Markup Language",
      b: "Hyper text Monitor Learning",
      c: "Higher text Markup Language",
      d: "Higher text Monitor Language",
    },
    answer: "a",
  },
  {
    id: "question2",
    question: "what is the full meaning of CSS",
    options: {
      a: "Cascading Style Sheet",
      b: "Common Server Side",
      c: "Cascading Server Side",
      d: "Common Style Language",
    },
    answer: "a",
  },
  {
    id: "question3",
    question: "which of these is a scripting language",
    options: {
      a: "Html",
      b: "CSS",
      c: "PHP",
      d: "tailwindcss",
    },
    answer: "c",
  },
];

function showQuestions(questions) {
  // For the rendering of the language
  const container = document.querySelector(".questions-container");
  let output = "";
  questions.forEach((ques) => {
    output += `
      <li class="question-lists">
      <label for="${ques.id}">
        <p class="">
            ${ques.question}
        </p>
        <ol type="a">
        <li>
          <label class="radio-container" for="${ques.options.a}">
          <input type="radio" name="${ques.id}" id="${ques.options.a}">
          <p class="question-text">${ques.options.a}</p> 
          </label>
        </li>
  
        <li>
        <label class="radio-container" for="${ques.options.b}">
        <input type="radio" name="${ques.id}" id="${ques.options.b}">
        <p class="question-text">${ques.options.b}</p> 
        </label>
      </li>
  
      <li>
      <label class="radio-container" for="${ques.options.c}">
      <input type="radio" name="${ques.id}" id="${ques.options.c}">
      <p class="question-text">${ques.options.c}</p> 
      </label>
    </li>
  
    <li>
    <label class="radio-container" for="${ques.options.d}">
    <input type="radio" name="${ques.id}" id="${ques.options.d}">
    <p class="question-text">${ques.options.d}</p> 
    </label>
  </li>
        
        </ol>
      </label>
    </li>
      `;
  });

  container.innerHTML = output;
}

function showTimer() {
  const timer = document.querySelector(".timer");
  let time = questions.length * 10000;
  let minute = questions.length;
  let seconds = 0;
  setInterval(() => {
    time = time - 1000;
    if (seconds == 0) {
      minute = minute - 1;
      seconds = 59;
    }
    let formatMinute;
    let formtSeconds;
    formatMinute = minute < 10 ? (formatMinute = "0" + minute) : minute;
    formtSeconds = seconds < 10 ? (formtSeconds = "0" + seconds) : seconds;
    seconds = seconds - 1;
    timer.textContent = formatMinute + ":" + formtSeconds;

    if (timer.textContent == "00:01") {
      document.querySelector(".submit").click((e) => {
        e.preventDefault();
        console.log(e);
        calculateResult();
        console.log("hello");
      });
    }
  }, 1000);
}

function calculateResult() {
  let listAnswers = document.querySelectorAll(".question-lists");
  document.querySelector(".submit").addEventListener("click", (e) => {
    e.preventDefault();
    const answersArray = [];
    const mark = [];
    for (let i = 0; i < listAnswers.length; i++) {
      const orderedList = listAnswers[i].children[0].children[1];
      const questionAnswer = questions[i].answer;
      let checkedAnswers = "";
      let status = "";
      let correctedStatus = "";

      for (const child of orderedList.children) {
        checkedAnswers = child.children[0];
        if (checkedAnswers.children[0].checked) {
          status = checkedAnswers.children[0].nextElementSibling.textContent;
          if (status === questions[i].options[questionAnswer]) {
            correctedStatus = "pass";
            mark.push(correctedStatus);
          }
          break;
        }
      }

      answersArray.push(status);
    }
    console.log(answersArray, mark);
    const percent = (mark.length / answersArray.length) * 100;
    createModal(mark.length, answersArray.length, percent);
  });
}

function createModal(gotRight, totalquestions, percent) {
  const div = document.createElement("div");
  div.className = "modal";
  div.innerHTML = `
    <div class="modal-content">
    ${
      document.querySelector(".timer").textContent == "00:01"
        ? `<h2>Your Time has expired</h2>`
        : ""
    }
    <h2>Your Score</h2>
    <p class="">You got ${gotRight} questions right out of ${totalquestions} questions</p> 
    <p class="">Your Pecentage is ${Math.round(percent)}%</p> 
    <button class="start-again">Start Again</button>
  </div>
    `;
  document.body.append(div);

  document.querySelector(".start-again").addEventListener("click", () => {
    window.location = "index.html";
  });
}

window.onload = () => {
  showQuestions(questions);
  showTimer();
  calculateResult();
};
