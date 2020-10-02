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
      "contact"
    ];

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
}

function displayTyping(text, id="displayText", speed=15){
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
setTimeout(showElement, 2000, "shellContainer");

// If the user clicks anywhere in the document, focus the shell
$(document).click(function(){
  $("#shell").focus();
});

// On keypress check for enter key (13)
$("#shell").keypress(function(e){
  if(e.which == 13){
    // Get the string from input and trim it
    var input = $("#shell").val().trim().toLowerCase();

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

  }
}); /* End of main */


/* command implementations */

function help(){
  print("Following commands are supported:<br/>");

  for(var i=0; i < commands.length; i++){
    print(commands[i]+"<br/>");
  }
}

function clear(){
  $("#displayText").empty();
}

// TODO: Hide shell while messages are being displayed!
function skills(){
  displayTyping(skillsInfo);
}

function experience(){
  displayTyping(experienceInfo);
}

function education(){
  setTimeout(displayTyping, 3000, educationInfo, "displayText", 25);
}

function projects(){
  setTimeout(displayTyping, 3000, projectsInfo, "displayText", 25);
}

function aboutme(){
  displayTyping(aboutmeInfo);
}

function contact(){
  setTimeout(displayTyping, 3000, contactInfo, "displayText", 25);
}
