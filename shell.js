/*TODO: - Add basic shell commands - pwd, cd, ls, cat
        - Hide shell while commands are being executed
        - escape html tags - XSS vuln
        - refactor - create smaller/more readable functions
*/

/* Messages */
var welcome_message = "Type in a command (or 'help' to list all supported commands):\nType 'help command' to find out more about the specific command.\n";

/* Commands */
var commands =
    [
      "help",
      "clear",
      "screenfetch",
      "ls",

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

var suggestionCounter = 0; // used for tab completion

var input_arguments; // global variable for command arguments


var locations = ["/", "home", "feelqah", ""];

var whereWeAt = locations[2]; // global var for current location


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
}

function appendElement(element, id){
  $("body").append("<"+element+" id=' "+ id + "'></"+element+">");
}

function print(input){
  $("#displayText").append(input.replaceAll("\n", "<br/>") + "<br/>");
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
    // Get the string from input 
    var input = $("#shell").val();

    // Save the command history
    input_history.push(input);

    history_counter = input_history.length;

    // Trim and lower case the input
    input = input.trim().toLowerCase();

    // Print the shell prompt
    if(whereWeAt == locations[2]){ // home dir of username
      print("[feelqah@github ~]$ " + input);
    }
    else{
      print("feelqah@github " + whereWeAt + "]" + input);
    }

    if(input != ""){
      $("#shell").val("");

      input_arguments = parseInput(input); // global var - input_arguments

      if(input == "./resume.sh"){ // print the whole resume
        print("About me:");
        print(aboutmeInfo);

        print("Working experience:");
        print(experienceInfo);

        print("Education:");
        print(educationInfo);

        print("Skills:");
        print(skillsInfo)

        print("Projects I'm currently working on:");
        projects();

        print("Interests:");
        print(interestsInfo);

        print("How to contact me:");
        contact();

        print("Résumé in PDF");
        resume();
      }
      else if(input_arguments == null){
        print("'" + input.split(" ")[0] + "': Command not found");
      }
      else{
        executeCommand(input_arguments[0]);
      }
    }

    // used for Tab completion; reset after we hit enter
    suggestionCounter = 0;
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
  // Used for Tab completion
  else if(e.which == 32){ // space (32)
    suggestionCounter++;
  }
  /* TAB completion */
  else if(e.which == 9){ // TAB (9)
    var input = $("#shell").val();
    var inputs = input.split(" ");

    if(inputs != ""){
      if(input.includes("./") && whereWeAt == locations[2]){
        $("#shell").val("./resume.sh");
      }
      // TODO: else if: handle existing paths (/home, /home/feelqah)
      else{
        for(var i=0;i<commands.length;i++){
          // the input must be a substring of a command
          if(commands[i].includes(inputs[suggestionCounter]) && 
            // the input word must start with the same letter as the command
            inputs[suggestionCounter].startsWith(commands[i].slice(0,1))){

            //TODO: Fix bug when e.g.: i + tab + i
            //TODO: Fix bug when a param is deleted and new one is entered + tab
            $("#shell").val(function(){
              return this.value.replace(inputs[suggestionCounter], "") + commands[i];
            });
            break;
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

/* command implementations */

function help(){
  if(input_arguments.length > 1){
    input_arguments = input_arguments.slice(1); // remove the command name
    var counter = 0;

    for(var i=0;i<input_arguments.length;i++){
      if(commands.includes(input_arguments[i])){
        print( "'" + input_arguments[i] + "': " + commandsInfo[input_arguments[i]]);
      }
    }
  }
  else{
    print("Following commands are supported:");

    for(var i=0; i < commands.length; i++){
      print(commands[i]);
    }
  }
}

function clear(){
  $("#displayText").empty();
}

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
  $("#displayText").append("<br/>");
}

function resume(){
  $("#displayText").append('<a href="#" onclick="window.open(\'resume.pdf\', \'_blank\', \'fullscreen=yes\'); return false;">PDF Résumé</a> <br/>');
}

function screenfetch(){
  print(specs);
}

function ls(){
  if(whereWeAt == locations[2] && input_arguments.length == 1){ // "username dir / ~"
    print("resume.sh");
  }
  else if(input_arguments.length == 2){
    if(input_arguments[1] in files){
      print(files[input_arguments[1]].join(" "));
    }
    else if(input_arguments[1].includes("/")){

      //TODO: handle /home, /home/feelqah with a more "dynamic way"

      if(input_arguments[1].includes("home") || input_arguments[1].includes("feelqah")){

        var dirs = input_arguments[1].split("/");

        print(files[dirs[dirs.length-1]].join(" "));
      }
      else{
        print("Do you really think this is a real shell?");
      }
    }
    else{
      print("No such directory!");
    }
  }
  else{
    print("Sorry can't take more than one arg at a time right now...");
  }
}