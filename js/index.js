var quiz_data;
var quiz_score = 0;
var index = 0;
var correctanswer;

function question_load() {

    var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var response = JSON.parse(xmlhttp.responseText);
  
         quiz_data = response.results;

         console.log(quiz_data);

         var h3 = document.createElement("h3");

         h3.innerHTML = quiz_data[index].question;
     
         var div = document.getElementById("question");
         div.appendChild(h3);

        choices();
        }    
    }
  
    xmlhttp.open("GET", "file/quiz.json", true);
    xmlhttp.send();
  }

  document.onload = question_load()

  function questions()
  {

    index++;

    var correctanswers = document.getElementsByName("correct_answer");

      for(let i=0;i<correctanswers.length;i++)
      {
      if(correctanswers[i].checked == true)
        correctanswer = correctanswers[i].value;
      }

      if(correctanswer == undefined)
      index--;

      else if(correctanswer === quiz_data[index-1].correct_answer)
      {
        correctanswer = undefined;
        ++quiz_score;  
      }
      

    if(index === 10)
    correctAnswer();

    else {

      question_div = document.getElementById("question");
      question_div.parentNode.removeChild(question_div);

      question_div = document.createElement("div");
      question_div.setAttribute("id","question");

      document.getElementById("question_parent").appendChild(question_div);

      var h3 = document.createElement("h3");

      h3.innerHTML = quiz_data[index].question;

      var div = document.getElementById("question");
      div.appendChild(h3);

      choices();
    }
  }

  function choices()
  {

    var div = document.getElementById("question");
    let no_of_choices = 0;

    while(no_of_choices < 4)
    {
      radio1 = document.createElement("input");
      radio1.type = "radio";
      radio1.name = "correct_answer";
      radio1.value = quiz_data[index].incorrect_answers[no_of_choices];
      radio1.setAttribute("id",no_of_choices);

      label = document.createElement("label");
      label.innerHTML = quiz_data[index].incorrect_answers[no_of_choices];

      div.appendChild(radio1);
      div.appendChild(label);
      var br = document.createElement("br");
      div.appendChild(br);

      no_of_choices++;
    }
    
  }
  

  function correctAnswer()
  {
    question_div = document.getElementById("question");
    question_div.parentNode.removeChild(question_div);

    question_div = document.createElement("div");
    question_div.setAttribute("id","question");

    document.getElementById("question_parent").appendChild(question_div);

    var h2 = document.createElement("h2");
    h2.innerHTML = "Congratulations !! Your score is "+quiz_score + " out of 10";

    var div = document.getElementById("question");
      div.appendChild(h2);

    var button = document.getElementById('submit');
    button.parentNode.removeChild(button);
    
  }