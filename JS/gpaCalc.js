function addRow(numberOfRows) { 
  /* This function adds one or more rows to the table*/
  if (!numberOfRows) numberOfRows = 1; /*If no parameters specified, assume 1 row is added*/
  
  for (var i = 0; i < numberOfRows; i++) { /* for loop adds numberOfRows rows*/
    $("#grades_table tbody").append( /*add to body of table a row in which...*/
      $("<tr />").attr("class", "grade_row").append( /*four cells (<td>) are appended*/
        $("<td />")
          .css({  /*Numbers are bold*/
            "font-weight": "bold",
            "text-align": "center"
          })
          .text($(".grade_row").length + 1)
      )
      .append(
        /*Course name*/
        $("<td />").append(
          $("<input />") /*Add input tag with the following attributes*/
            .attr({
              "type": "text",
              "class": "class_field",
              "name": "class",
            })
        )
      )
      .append(
        /*Grade*/
        $("<td />").append(
          $("<input />")
            .attr({
              "type": "text",
              "class": "grade_field",
              "name": "grade",
              "size": "3"
            })
        )
      )
      .append(
        /*Credits*/
        $("<td />").append(
          $("<input />")
            .attr({
              "type": "text",
              "class": "credits_field",
              "name": "credits",
              "size": "3"
            })
        )
      )
    );
  }
}

$(document).ready(function() {
  /*Here is the fucntion that does the calculation part*/    
  addRow(3); /*Add one wor initially*/

  $("#add_row").click(function() { /*When add row button is clicked...*/
    addRow();                /*add new row*/
  });
  
  $("#gpa_form").submit(function(e) {
    e.preventDefault();
    
    var gradePoints = 0.0;
    var totalCredits = 0.0;
    
    $(".grade_row").each(function(i) {
        /*Ignore empty cells*/
      if ($(this).find(".grade_field").val() == "" || $(this).find(".credits_field").val() == "") {
        return;
      }
       /*Calculations...*/
      gradePoints += parseFloat($(this).find(".grade_field").val()) * parseFloat($(this).find(".credits_field").val());
      totalCredits += parseFloat($(this).find(".credits_field").val());
    });
    
    var gpa = gradePoints / totalCredits;
    
    if (gradePoints == 0.0 || totalCredits == 0.0) {
      $("#gpa_output").text("You must enter at least one grade and its corresponding credits.");
    } else if (isNaN(gpa)) {
      $("#gpa_output").text("Could not calculate GPA. Did you input a non-decimal grade?");
    } else {
        /*output GPA*/
      $("#gpa_output").html("<span style=\"font-weight: bold;\">GPA:</span> " + gpa);
    }
  });
});

/*Funtions below makes the page visually interactive*/

$(document).ready(function(){
/*Make button darker when mouse enters. Make it lighter when it leaves.*/

    $('input[type=submit]').hover(
        function() {
            $('input[type=submit]').fadeTo('fast', 1);
        },
        function() {
            $('input[type=submit]').fadeTo('fast', 0.9);
        }
    );
});

$(document).ready(function(){
/*Make the boder darker when the user clicks and writes something here*/
    $('input').focus(function() {
        $(this).css('outline-color', 'rgb(45, 26, 195)');
    });    
});

