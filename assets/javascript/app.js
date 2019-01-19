
 var question = "Mr. Nobody";
 var queryURL = "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          // Create a new table row element
      var tRow = $("<tr>");
      var qRow = $("<div>").addClass("questionBox");

      var categoryTd = $("<td>").text(response.results[0].category);
      var difficultyTd = $("<td>").text(response.results[0].difficulty);
      var typeTd = $("<td>").text(response.results[0].type);

      var questionTd = $("<p>").text(response.results[0].question);
      var answersTd = $("<p>").text(response.results[0].correct_answer);
        console.log(response);
      // Append the newly created table data to the table row
      tRow.append(categoryTd, difficultyTd, typeTd);
      qRow.append(questionTd, answersTd);
      
      // Append the table row to the table body
      $("tbody").append(tRow);
      $("#question-area").append(qRow);
    });