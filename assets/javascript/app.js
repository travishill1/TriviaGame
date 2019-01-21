
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
        game.wrongCount = 0;
        game.currentGuess = "";
        game.currentCorrect = "";


        $.ajax({
            url: this.queryURL,
            method: "GET",
        }).then(function(response) {
            results = response.results;
            // console.log(this.questions);
            results.forEach(function(result){
                category = result.category;
                question = result.question;
                correct = result.correct_answer;
                answerList = result.incorrect_answers;
                answerList.push(correct);
                // console.log(answerList);
                let questionObject = new QSlide(category, question, correct, answerList);
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
            game.newQuestion();
        });
    },

    newQuestion : function(){
        // removes one of the questions from the array and gives it the name questionObject.
        let questionObject = game.questions.pop();
        game.currentCorrect = questionObject.correct;
        $("#question-area").append(questionObject.slide);
        let answers = $(".question-slide li");
        console.log(game.currentCorrect);

        answers.each(function(){
            $(this).on("click", function(){
                // console.log("answer clicked");
                game.currentGuess = $(this).html();
                game.checkAnswer();
            })
        })
        // gets question from array
        // makes game.correct the correct answer associated with that question pull
        // appends  
    },

    checkAnswer : function(){
        // see if game.currentGuess === game.currentCorrect
        console.log(game.currentCorrect);
        console.log(game.currentGuess);
        if (game.currentGuess === game.currentCorrect){
           game.guessCorrect(); 
        }
        else{
            game.guessWrong();
        }
        setTimeout(game.continueGame, 150);
    },

    guessCorrect : function(){
        game.winCount += 1;
        $("#question-area").html("Correct!");
        // game.newQuestion();
    },

    guessWrong : function(){
        game.loseCount += 1;
        $("#question-area").html("Wrong!");
        // game.newQuestion();
    },

    continueGame : function(){
        if(game.questions){
            game.newQuestion();
        }
        else{
            game.gameEnd();
        }
    },

    // gameRound : function(){
    //     while(game.questions){
    //         game.questionRound()
    //     }
    // },


    gameEnd : function(){
        
        // go to score screen if questions array.length = 0
    },

}
game.newGameSetup()