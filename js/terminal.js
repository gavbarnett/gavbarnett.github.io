document.onkeydown = checkKey;
document.onclick = checkMouse;
var memory = [];
var answer = 0;
var user = "gavbarnett.github.io";
var dir = "/"

function load(){
  document.getElementById("input").value = "";
  memory.inputs = [];
  memory.pointer = 0;
  tests();
}

function checkKey(e) {
//pressing special keys will invoke special actions
    e = e || window.event;
    switch (e.keyCode) {
        case 13:  // enter pressed
          e.preventDefault();
          var input =  document.getElementById("input").value;
          document.getElementById("input").value = "";
          //console.log(input);
          TerminalLog(input, dir, user);
          TerminalLog(OS(input));
          break;
        case 9:  // tab pressed
          e.preventDefault();
          break;
        case 38:  // up_arrow pressed
          e.preventDefault();
          //scrolls back through memory
          if (memory.pointer >0) {memory.pointer -=1}
          document.getElementById("input").value = memory.inputs[memory.pointer];
          break;
        case 40:  // down_arrow pressed
          e.preventDefault();
          //scrolls forward through memory
          if (memory.pointer < memory.inputs.length-1) {memory.pointer +=1}
          document.getElementById("input").value = memory.inputs[memory.pointer];
          break;
    }
}

function checkMouse(e) {
//clicking anywhere on the page will bring focus back to the input line
  document.getElementById("input").focus();
}

function TerminalLog(input, dir, user) {
  //displays text to the user in the Terminal
  //i know, i know... its very messy. Shhh.
  var ul = document.getElementById("output");
  var li = document.createElement("li");
  if (user != undefined && dir != undefined){
    //user command
    memory.inputs.push(input);
    memory.pointer = memory.inputs.length;
    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var row = document.createElement("tr");
    // i don't understand why i need three cell
    // vars but I do to work with classes.
    var cell = document.createElement("td");
    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var cellText = document.createTextNode(user);
    tblBody.className = "cmd-table";
    cell.className = "username"
    cell.appendChild(cellText)//;
    row.appendChild(cell);
    cellText = document.createTextNode(dir);
    cell1.className = "dir"
    cell1.appendChild(cellText);
    row.appendChild(cell1);
    cellText = document.createTextNode(input);
    cell2.className = "input"
    cell2.appendChild(cellText);
    row.appendChild(cell2);
    tblBody.appendChild(row);
    tbl.appendChild(tblBody);
    li.appendChild(tbl);
    li.setAttribute("id", "element4"); // added line
  } else {
    //just an echo
    li.appendChild(document.createTextNode(input));
  }

  ul.appendChild(li);
  //scrolling to end
  document.getElementById("input").scrollIntoView(false);
}
