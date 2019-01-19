
 class QSlide {
     constructor(category, question, correct, answers){
         this.category = category;
         this.question = question;
         this.correct = correct;
         console.log(answers);
         this.answers = answers;
         console.log(this.answers);
         this.slide = this.makeSlide();
     }
 
 
    makeSlide() {
        const slide = $("<div>").addClass("question-slide");
        const question = $("<p>");
        question.html(this.question);
        slide.append(question);
        const answerList = $("<ul>");
        console.log(this.answers);
        this.answers.forEach(function(answer){
            const li = $("<li>");
            li.html(answer);
            answerList.append(li);
        });

        slide.append(answerList);

        return slide
    }
 }

 var questions = new Array();
 var queryURL = "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          // Create a new table row element
    //   var tRow = $("<tr>");
    //   var qRow = $("<div>").addClass("questionBox");

    //   var categoryTd = $("<td>").text(response.results[0].category);
    //   var difficultyTd = $("<td>").text(response.results[0].difficulty);
    //   var typeTd = $("<td>").text(response.results[0].type);

    //   var questionTd = $("<p>").text(response.results[0].question);
    //   var answersTd = $("<p>").text(response.results[0].correct_answer);
      results = response.results;
        results.forEach((result)=>{
            category = result.category;
            question = result.question;
            correct = result.correct_answer;
            answerList = result.incorrect_answers;
            answerList.push(correct);
            console.log(answerList);
            questionObject = new QSlide(category, question, correct, answerList);
            questions.push(questionObject);
            console.log(response);
            // Append the newly created table data to the table row
            //   tRow.append(categoryTd, difficultyTd, typeTd);
            //   qRow.append(questionTd, answersTd);
            
            // Append the table row to the table body
            //   $("tbody").append(tRow);
            $("#question-area").append(questionObject.slide);
        })
    });