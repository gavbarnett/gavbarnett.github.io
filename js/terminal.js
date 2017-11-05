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
}
function OS(input){
  //if input is a keyword
  var output = keyword(input);
  if (output != ""){
    return output;
  } else {
    //return "Not a Keyword";
    answer = calculator(input);
    output = toengnot(answer);
    return ("= "  + output);
  }
  return ("I don't understand!");

  function fromsymbol(input){
    var output = input;
    output = output.replace("pi",Math.PI);
    output = output.replace('"', answer);
    output = fromengnot(output);
    return (output);
  }

  function fromengnot(input){
    var output = String(input);
    output = output.replace("Y","e24");
    output = output.replace("Z","e21");
    output = output.replace("E","e18");
    output = output.replace("P","e15");
    output = output.replace("T","e12");
    output = output.replace("G","e9");
    output = output.replace("M","e6");
    output = output.replace("k","e3");
    output = output.replace("m","e-3");
    output = output.replace("u","e-6");
    output = output.replace("n","e-9");
    output = output.replace("p","e-12");
    output = output.replace("f","e-15");
    output = output.replace("a","e-18");
    output = output.replace("z","e-21");
    output = output.replace("y","e-24");
    return (output);
  }
  function toengnot(input){
    var output = Number(input).toFixed(2);
    if (input >= 1e24) {return (input/1e24).toFixed(2) + "Y";}
    if (input >= 1e21) {return (input/1e21).toFixed(2) + "Z";}
    if (input >= 1e18) {return (input/1e18).toFixed(2) + "E";}
    if (input >= 1e15) {return (input/1e15).toFixed(2) + "P";}
    if (input >= 1e12) {return (input/1e12).toFixed(2) + "T";}
    if (input >= 1e9) {return (input/1e9).toFixed(2) + "G";}
    if (input >= 1e6) {return (input/1e6).toFixed(2) + "M";}
    if (input >= 1e3) {return (input/1e3).toFixed(2) + "k";}
    if (input < 1e-21) {return (input/1e-24).toFixed(2) + "y";}
    if (input < 1e-18) {return (input/1e-21).toFixed(2) + "z";}
    if (input < 1e-15) {return (input/1e-18).toFixed(2) + "a";}
    if (input < 1e-12) {return (input/1e-15).toFixed(2) + "f";}
    if (input < 1e-9) {return (input/1e-12).toFixed(2) + "p";}
    if (input < 1e-6) {return (input/1e-9).toFixed(2) + "n";}
    if (input < 1e-3) {return (input/1e-6).toFixed(2) + "u";}
    if (input < 1e0) {return (input/1e-3).toFixed(2) + "m";}
    return (output);
  }
  function calculator(input){
    //supports E/e notation (10E3 = 10e3 = 10,000)
    //supports Engineeing notion (10k = 10,000)
    var equation = [];
    var i = 0;
    if (!isNaN(input)) {
      output = input;
      return Number(output);
    }
    //brackets
    if (input.includes(")")){
      var index = input.search(/[)]/);
      equation[0] = input.substr(0,index);
      equation[1] = input.substr(index+1);
      equation[0] = equation[0].split("(");
      output = calculator(equation[0][equation[0].length-1]);
      equation[0].splice(equation[0].length-1,1);
      equation[0].toString();
      equation[0] = equation[0].join("(");
      //implicit multiplication
      if ((equation[0] != "") && (!isNaN(equation[0].substr(length-1)))){
        equation[0] = equation[0].concat("*");
      }
      if ((equation[1] != "") && (!isNaN(equation[1].substr(0,1)))){
        equation[1] = "*".concat(equation[1]);
      }

      output = equation[0].concat(String(output),String(equation[1]));
      output = calculator(output);
      return (output);
    }
    if (input.includes("+")){
      equation = input.split("+");
      output = Number(calculator(equation[0]));
      for (i=1; i<equation.length; i++){
        output += Number(calculator(equation[i]));
      }
      return (output);
    }
    if (input.includes("-")){
      equation = input.split("-");
      output = Number(calculator(equation[0]));
      for (i=1; i<equation.length; i++){
        output -= Number(calculator(equation[i]));
      }
      return (output);
    }
    if (input.includes("*")){
      equation = input.split("*");
      output = Number(calculator(equation[0]));
      for (i=1; i<equation.length; i++){
        output *= Number(calculator(equation[i]));
      }
      return (output);
    }
    if (input.includes("//")){ //parallel = 1/(1/a+1/b)
      equation = input.split("//");
      output = 1/(Number(calculator(equation[0])));
      for (i=1; i<equation.length; i++){
        output += 1/(Number(calculator(equation[i])));
      }
      return (1/Number(output));
    }
    if (input.includes("/")){
      equation = input.split("/");
      output = Number(calculator(equation[0]));
      for (i=1; i<equation.length; i++){
        output /= Number(calculator(equation[i]));
      }
      return (output);
    }
    if (input.includes("^")){
      equation = input.split("^");
      output = Number(calculator(equation[0]));
      for (i=1; i<equation.length; i++){
        output = Math.pow(output,Number(calculator(equation[i])));
      }
      return (output);
    }
    if (input.includes("sqrt")){
      equation = input.split("sqrt");
      output = "";
      for (i=1; i<equation.length; i = i+2){
        output = output.concat(Math.sqrt(Number(calculator(equation[i]))));
      }
      return (output);
    }
    return fromsymbol(input);
  }

  function keyword(input){
    var output = ""
    switch (input.toUpperCase()) {
      //electrical equations
      case "P":
        output = "P = IV, P = (V^2)/R, P = (I^2)*R";
        break;
      case "V":
        output = "V = IR, V = P/I, V = (P*R)^0.5";
        break;
      case "I":
        output = "I = V/R, I = P/V, I = (P/R)^0.5";
        break;
      case "R":
        output = "R = V/I, R = (V^2)/P, R = P/(I^2)";
        break;
      default:
        output = "";
    }
    return output;
  }
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
