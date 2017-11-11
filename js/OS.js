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
    output = output.replace('e', Math.exp(1));
    output = output.replace("Infinity", Number.POSITIVE_INFINITY);
    output = fromengnot(output);
    return (output);
  }

  function fromengnot(input){
    //negative number un-catcher
    if (input.substr(0,1) == "_"){
      input = "-".concat(input.substr(1));
    }
    var output = String(input);
    if (output.includes("Y")){
      output = output.replace("Y","");
      return(output * 1e24);
    }
    if (output.includes("Z")){
      output = output.replace("Z","");
      return(output * 1e21);
    }
    if (output.includes("E")){
      output = output.replace("E","");
      return(output * 1e18);
    }
    if (output.includes("P")){
      output = output.replace("P","");
      return(output * 1e15);
    }
    if (output.includes("T")){
      output = output.replace("T","");
      return(output * 1e12);
    }
    if (output.includes("G")){
      output = output.replace("G","");
      return(output * 1e9);
    }
    if (output.includes("M")){
      output = output.replace("M","");
      return(output * 1e6);
    }
    if (output.includes("k")){
      output = output.replace("k","");
      return(output * 1e3);
    }
    if (output.includes("m")){
      output = output.replace("m","");
      return(output * 1e-3);
    }
    if (output.includes("u")){
      output = output.replace("u","");
      return(output * 1e-6);
    }
    if (output.includes("n")){
      output = output.replace("n","");
      return(output * 1e-9);
    }
    if (output.includes("p")){
      output = output.replace("p","");
      return(output * 1e-12);
    }
    if (output.includes("f")){
      output = output.replace("f","");
      return(output * 1e-15);
    }
    if (output.includes("a")){
      output = output.replace("a","");
      return(output * 1e-18);
    }
    if (output.includes("z")){
      output = output.replace("z","");
      return(output * 1e-21);
    }
    if (output.includes("y")){
      output = output.replace("y","");
      return(output * 1e-24);
    }
    return (output);
  }
  function toengnot(input){
    //  input = String(input).replace("Infinity",Number.POSITIVE_INFINITY);
    var output = Number(input).toFixed(2);
    //if (input >= 1e24) {return (input/1e24).toFixed(2) + "Y";}
    //if (input >= 1e21) {return (input/1e21).toFixed(2) + "Z";}
    //if (input >= 1e18) {return (input/1e18).toFixed(2) + "E";}
    if (input <= -1e18) {return (Number.NEGATIVE_INFINITY);}
    if (input >= 1e18) {return (Number.POSITIVE_INFINITY);}
    if (Math.abs(input) >= 1e15) {return (input/1e15).toFixed(2) + "P";}
    if (Math.abs(input) >= 1e12) {return (input/1e12).toFixed(2) + "T";}
    if (Math.abs(input) >= 1e9) {return (input/1e9).toFixed(2) + "G";}
    if (Math.abs(input) >= 1e6) {return (input/1e6).toFixed(2) + "M";}
    if (Math.abs(input) >= 1e3) {return (input/1e3).toFixed(2) + "k";}
    //if (input < 1e-21) {return (input/1e-24).toFixed(2) + "y";}
    //if (input < 1e-18) {return (input/1e-21).toFixed(2) + "z";}
    //if (input < 1e-15) {return (input/1e-18).toFixed(2) + "a";}
    if (Math.abs(input) < 1e-15) {return (0).toFixed(2);}
    if (Math.abs(input) < 1e-12) {return (input/1e-15).toFixed(2) + "f";}
    if (Math.abs(input) < 1e-9) {return (input/1e-12).toFixed(2) + "p";}
    if (Math.abs(input) < 1e-6) {return (input/1e-9).toFixed(2) + "n";}
    if (Math.abs(input) < 1e-3) {return (input/1e-6).toFixed(2) + "u";}
    if (Math.abs(input) < 1e0) {return (input/1e-3).toFixed(2) + "m";}
    return (output);
  }
  function calculator(input){
    //supports E/e notation (10E3 = 10e3 = 10,000)
    //supports Engineeing notation (10k = 10,000)
    input = input.replace(/\s+/g, '')
    var equation = [];
    var i = 0;
    //negative number un-catcher
    if (input.substr(0,1) == "_"){
      input = "-".concat(input.substr(1));
    }

    if (!isNaN(input)) {
      output = input;
      return Number(output);
    }
    //negative number catcher
    if (input.substr(0,1) == "-"){
      input = "_".concat(input.substr(1));
    }
    input = input.replace("*-","*_");
    input = input.replace("/-","/_");
    input = input.replace("^-","^_");
    input = input.replace("sin-","sin_");
    input = input.replace("asin-","asin_");
    input = input.replace("cos-","cos_");
    input = input.replace("acos-","acos_");
    input = input.replace("tan-","tan_");
    input = input.replace("atan-","atan_");
    input = input.replace("sqrt-","sqrt_");
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
    if (input.includes("asin")){
      equation = input.split("asin");
      output = "";
      for (i=1; i<equation.length; i = i+2){
        output = output.concat(Math.asin(Number(calculator(equation[i]))));
      }
      return (output);
    }
    if (input.includes("acos")){
      equation = input.split("acos");
      output = "";
      for (i=1; i<equation.length; i = i+2){
        output = output.concat(Math.acos(Number(calculator(equation[i]))));
      }
      return (output);
    }
    if (input.includes("atan")){
      equation = input.split("atan");
      output = "";
      for (i=1; i<equation.length; i = i+2){
        output = output.concat(Math.atan(Number(calculator(equation[i]))));
      }
      return (output);
    }
    if (input.includes("sin")){
      equation = input.split("sin");
      output = "";
      for (i=1; i<equation.length; i = i+2){
        output = output.concat(Math.sin(Number(calculator(equation[i]))));
      }
      return (output);
    }
    if (input.includes("cos")){
      equation = input.split("cos");
      output = "";
      for (i=1; i<equation.length; i = i+2){
        output = output.concat(Math.cos(Number(calculator(equation[i]))));
      }
      return (output);
    }
    if (input.includes("tan")){
      equation = input.split("tan");
      output = "";
      for (i=1; i<equation.length; i = i+2){
        output = output.concat(Math.tan(Number(calculator(equation[i]))));
      }
      return (output);
    }
    if (input.includes("log")){
      equation = input.split("log");
      output = "";
      for (i=1; i<equation.length; i = i+2){
        output = output.concat(Math.log10(Number(calculator(equation[i]))));
      }
      return (output);
    }
    if (input.includes("ln")){
      equation = input.split("ln");
      output = "";
      for (i=1; i<equation.length; i = i+2){
        output = output.concat(Math.log(Number(calculator(equation[i]))));
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
