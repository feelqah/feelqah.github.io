/*TODO: - Add basic shell commands - pwd, cd, ls, cat
        - a fake file system
        - escape html tags - XSS vuln
*/

/* Messages */
var welcome_message = "Type in a command (or 'help' to list all supported commands):\nType 'help command' to find out more about the specific command.\n";

/* Commands */
var commands =
    [
      "help",
      "clear" ,
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

var input_arguments;

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


// help skills
// TODO: argument parsing
function parseInput(input){
  var input_arguments = input.split(" ");

  for(var i=0; i < commands.length; i++){
    if(input_arguments[0] == commands[i]){
      return input_arguments
    }
  }
  return null
}

function executeCommand(cmd, args){
  eval(cmd+"();"); // NEVER use eval (bad practice), but for this purpose it's ok
  /*try{
    eval(cmd+"(" + args + ");"); // NEVER use eval (bad practice), but for this purpose it's ok

  } catch(error){
    print("'" + args[0] + "': Invalid argument <br/>");
    console.error(error);
  }*/

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

// Wait 0.8s then show shellContainer
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

      input_arguments = parseInput(input); // global var - input_arguments

      if(input_arguments == null){
        print("'" + input.split(" ")[0] + "': Command not found<br/>");
      }
      else{
        executeCommand(input_arguments[0]);
      }
    }

    // Clear suggestions
    suggestions = [];
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
    var inputs = $("#shell").val().split(" ");
    console.log(inputs);
    if(inputs[0] != ""){
      for(var i=0;i<inputs.length;i++){
        for(var j=0;j<commands.length;j++){
          if(commands[j].includes(inputs[i]) && !suggestions.includes(inputs[i])){

            // Save to suggestion list
            suggestions.push(commands[j]);

            $("#shell").val(suggestions.join(" "));
          }
        }
      }
    }
    $("#shell").focus();
    e.preventDefault();
  }

  $("#shell").get(0).scrollIntoView();
  $("#shell").focus();
}); /* End of main */

var suggestions = [];

/* command implementations */

function help(){
  if(input_arguments.length > 1){
    input_arguments = input_arguments.slice(1); // remove the command name
    var counter = 0;

    for(var i=0;i<input_arguments.length;i++){
      if(commands.includes(input_arguments[i])){
        print( "'" + input_arguments[i] + "': " + commandsInfo[input_arguments[i]] + "<br/>");
      }
    }
  }
  else{
    print("Following commands are supported:<br/>");

    for(var i=0; i < commands.length; i++){
      print(commands[i]+"<br/>");
    }
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