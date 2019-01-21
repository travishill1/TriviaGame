
 class QSlide {
     constructor(category, question, correct, answers){
         this.category = category;
         this.question = question;
         this.correct = correct;
        //  console.log(answers);
         this.answers = answers;
        //  console.log(this.answers);
         this.slide = this.makeSlide();
     }
 
 
    makeSlide() {
        const slide = $("<div>").addClass("question-slide");
        const question = $("<p>");
        question.html(this.question);
        slide.append(question);
        const answerList = $("<ul>");
        // console.log(this.answers);
        this.answers.forEach(function(answer){
            const li = $("<li>");
            li.html(answer);
            answerList.append(li);
        });

        slide.append(answerList);

        return slide
    }
 }



game = {
    newGameSetup : function(){
        game.questions = new Array();
        // console.log(this.questions);
        game.queryURL = "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple";
        game.winCount = 0;


        $.ajax({
            url: this.queryURL,
            method: "GET",
        }).then(function(response) {
         
            results = response.results;
            // console.log(this.questions);
            results.forEach((result)=>{
                category = result.category;
                question = result.question;
                correct = result.correct_answer;
                answerList = result.incorrect_answers;
                answerList.push(correct);
                // console.log(answerList);
                const questionObject = new QSlide(category, question, correct, answerList);
                // console.log(this);
                // console.log(this.questions);
                game.questions.push(questionObject);
                // console.log(response);
                // Append the newly created table data to the table row
                //   tRow.append(categoryTd, difficultyTd, typeTd);
                //   qRow.append(questionTd, answersTd);
            
                // Append the table row to the table body
                //   $("tbody").append(tRow);
                
                })
        });
    },

    newQuestion : function(){
        // gets question from array
        // makes game.correct the correct answer associated with that question pull
        // appends 
        $("#question-area").append(questionObject.slide);
    },

    gameGo : function(){
        while(game.questions){
            game.questionRound()
        }
    },


    gameEnd : function(){
        
        // go to score screen
    },

}
game.newGameSetup()