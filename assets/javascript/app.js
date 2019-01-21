
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

    TimerClock : function (){
        game.timerNumber = 30;
        var intervalId;
    
        function run() {
            clearInterval(intervalId);
            intervalId = setInterval(decrement, 1000);
        }
    
        function decrement() {
            game.timerNumber--;
    
            $("#show-timer").html("<h2>Time Left: " + game.timerNumber + "</h2>");
    
            if (game.timerNumber === 0) {
            game.guessWrong();
            stop();
            alert("Time Up!");
            }
        }
    
        function stop() {
            clearInterval(intervalId);
        }
    
        run();
    },

    ResetClock : function (){
        game.timerNumber = 30;
        $("#show-timer").show()
    },

    shuffle: function (array){
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    newGameSetup : function(){
        game.questions = new Array();
        // console.log(this.questions);
        game.queryURL = "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple";
        game.winCount = 0;
        game.loseCount = 0;
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
                game.shuffle(answerList);
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
            game.shuffle(game.questions)
            game.newQuestion();
        });
    },

    newQuestion : function(){
        // removes one of the questions from the array and gives it the name questionObject.
        
        game.ResetClock();
        let questionObject = game.questions.pop();
        game.currentCorrect = questionObject.correct;
        $("#question-area").html(questionObject.slide);
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
           setTimeout(game.continueGame, 5000);
        }
        else{
            game.guessWrong();
            setTimeout(game.continueGame, 2500);
        }
        
    },

    guessCorrect : function(){
        game.winCount += 1;
        // $("#question-area").html("Correct!");
        game.showResult("correct");
        // game.newQuestion();
    },

    guessWrong : function(){
        game.loseCount += 1;
        // $("#question-area").html("Wrong!");
        game.showResult("incorrect");
        // game.newQuestion();
    },

    continueGame : function(){
        if(game.questions.length){
            game.newQuestion();
        }
        else{
            game.gameEnd();
        }
    },

    showResult : function(result){
        $("#show-timer").hide();
        outcomes = {
            correct : "That is...",
            incorrect: "That is incorrect!",
        }
        let resultSlide = $("<div>").addClass(result + "-slide")
        let message = $("<p>").append(outcomes[result]);
        resultSlide.append(message);
        let gif = $("<img>").attr("src", "assets/images/" + result + ".gif");
        resultSlide.append(gif);

        $("#question-area").html(resultSlide);
    },
    // gameRound : function(){
    //     while(game.questions){
    //         game.questionRound()
    //     }
    // },


    gameEnd : function(){
        
        let endSlide = $("<div>").addClass("end-slide")
        let message = $("<h1>").html("Game Over");
        endSlide.append(message);
        let winCounter = $("<h2>").html("Questions Correct: " + game.winCount);
        endSlide.append(winCounter);
        let loseCounter = $("<h2>").html("Questions Incorrect: " + game.loseCount);
        endSlide.append(loseCounter);

        $("#question-area").html(endSlide);
        // go to score screen if questions array.length = 0
    },

}
game.newGameSetup()
game.TimerClock();