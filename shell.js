/*TODO: - Add basic shell commands - pwd, cd, ls, cat
        - a fake file system
*/

/* Messages */
var welcome_message = "Type in a command (or 'help' to list all supported commands):\nType 'help command' to find out more about the specific command.\n";

/* Commands */
var commands =
    [
      "help",
      "clear",
      "skills",
      "experience",
      "education",
      "projects",
      "aboutme",
      "interests",
      "contact",
      "resume"
    ];

var input_history = [];
var history_counter = 0; // used for "scrolling" through history

function appendChar(char, id){
  if(char == "\n"){
    $("#" + id).append("<br/>");
  }
  else if(char == "\t"){
    $("#" + id).append("    "); // tab = 4 spaces
  }
  else{
    $("#" + id).append(char);
  }
  $("#shell").get(0).scrollIntoView();
}

function displayTyping(text, id="displayText", speed=5){
  var i = 0;
  var len = text.length;
  var timeoutID = 0;
  var timeout = 0;

  while(i <= len){
    timeoutID = setTimeout(appendChar, timeout, text[i], id);
    timeout += speed;
    i++;
  }
  clearInterval(timeoutID);
}

// TODO: argument parsing
function parseInput(input){
  for(var i=0; i < commands.length; i++){
    if(input == commands[i]){
      return input
    }
  }
  return null
}

function executeCommand(cmd){
  eval(cmd+"();"); // NEVER use eval (bad practice), but for this purpose it's ok
}

function appendElement(element, id){
  $("body").append("<"+element+" id=' "+ id + "'></"+element+">");
}

function print(input){
  $("#displayText").append(input);
}

function showElement(id){
  $("#" + id).show();
}


/* Main */

// When document loads hide shellContainer
$(document).ready(function() {
    $("#shellContainer").hide();
    $("#shell").focus();
});

// Display welcoming message
displayTyping(welcome_message);

// Wait 2s then show shellContainer
setTimeout(showElement, 800, "shellContainer");

// If the user clicks anywhere in the document, focus the shell
$(document).click(function(){
  $("#shell").focus();
});

// On keydown event check for:
$("#shell").keydown(function(e){

  $("#shell").focus();

  if(e.which == 13){ // enter key (13)
    // Get the string from input and trim it
    var input = $("#shell").val();

    // Save the command history
    input_history.push(input);

    history_counter = input_history.length;

    // Trim and lower case the input
    input = input.trim().toLowerCase();

    // Print the shell prompt
    print("[feelqah@github ~]$ " + input + "<br/>");

    if(input != ""){
      $("#shell").val("");

      var command = parseInput(input);

      if(command == null){
        print(input +"': Command not found<br/>");
      }
      else{
        executeCommand(command);
      }
    }
  } /* End of Enter keypress */

  /* Command History */
  else if(e.which == 38){ // arrow up (38)
      $("#shell").val(input_history[history_counter-1]);

      if(history_counter-1 > 0){
        history_counter--;
      }
  }
  else if(e.which == 40){ // arrow down (40)
    $("#shell").val(input_history[history_counter-1]);

    if(history_counter < input_history.length){
      history_counter++;
    }
  }

  /* TAB completion */
  else if(e.which == 9){ // TAB (9)
    var input = $("#shell").val();

    for(var i=0;i<commands.length;i++){
      if(commands[i].includes(input)){
        $("#shell").val(commands[i]);

        $("#shell").focus();

        e.preventDefault();
      }
    }
  }

  $("#shell").get(0).scrollIntoView();
  $("#shell").focus();
}); /* End of main */


/* command implementations */

function help(){
  print("Following commands are supported:<br/>");

  for(var i=0; i < commands.length; i++){
    print(commands[i]+"<br/>");
  }
  //$("#shell").get(0).scrollIntoView();
}

function clear(){
  $("#displayText").empty();
}

// TODO: Hide shell while messages are being displayed!
function skills(){
  displayTyping(skillsInfo);
}

function experience(){
  displayTyping(experienceInfo, "displayText", 2);
}

function education(){
  displayTyping(educationInfo);
}

function projects(){
  for(var key in projectsInfo) {
    $("#displayText").append("<a href=" + projectsInfo[key] + "  target='_blank'>" + key + " </a> <br/>");
  }
  //$("#shell").get(0).scrollIntoView();
}

function aboutme(){
  displayTyping(aboutmeInfo);
}

function interests(){
  displayTyping(interestsInfo);
}

function contact(){
  for(var i=0;i<contactInfo.length;i++){
    $("#displayText").append(contactInfo[i]);
  }
  //$("#shell").get(0).scrollIntoView();
}

function resume(){
  $("#displayText").append('<a href="#" onclick="window.open(\'resume.pdf\', \'_blank\', \'fullscreen=yes\'); return false;">PDF Résumé</a> <br/>');
  //$("#shell").get(0).scrollIntoView();
}