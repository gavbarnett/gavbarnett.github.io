function tests(){
  var testresults = [];
  var test_flag = 0;
  function OS_tester(test, result){
        if (OS(test) != result){
          console.log(test + ": FAILED");
          console.log(test + ": " + OS(test) + " != " + result );
          testresults[testresults.length] = [test, "FAILED"];
          test_flag = 1;
        } else {
          testresults[testresults.length] = [test, "PASSED"];
        }
  }
  //Math Tests
  OS_tester("1","= 1.00");
  OS_tester("1+1","= 2.00");
  OS_tester("2^2","= 4.00");
  OS_tester("2^2","= 4.00");
  OS_tester("2^2","= 4.00");
  OS_tester("(-2)^2","= 4.00");
  OS_tester("2^-2","= 250.00m");
  OS_tester("2^(-2)","= 250.00m");
  OS_tester("(-2)^3","= -8.00");
  OS_tester("2(2)","= 4.00");
  OS_tester("2*2","= 4.00");
  OS_tester("(-2)*(-2)","= 4.00");
  OS_tester("(-2)*2","= -4.00");
  OS_tester("2*-2-3","= -7.00");
  OS_tester("pi", "= 3.14");
  OS_tester("2k*7k+0.2k","= 14.00M");
  OS_tester("sqrt(2)","= 1.41");
  OS_tester('"', "= 1.41");
  OS_tester('"^2*2', "= 4.00");
  OS_tester("sqrt(2)^2","= 2.00");
  OS_tester("1/(1/(sqrt2)^2)", "= 2.00");
  OS_tester("1u-0.2u+0.03u", "= 830.00n");
  OS_tester("1+(2+3((8)(3)(4)))", "= 291.00");
  OS_tester("48/2(9+3)", "= 288.00");
  OS_tester("(7+7)k", "= 14.00k");
  OS_tester("10k//10k//10k","= 3.33k");
  OS_tester("(7+7)k//(3+3)k", "= 4.20k");
  OS_tester("2 ( 2 ) ","= 4.00");
  OS_tester(" ( 7 + 7 ) k // ( 3 + 3 ) k ", "= 4.20k");
  OS_tester("0-1", "= -1.00");
  OS_tester("1e100", "= Infinity");
  OS_tester("Infinity^2", "= Infinity");
  OS_tester("-Infinity", "= -Infinity");
  OS_tester("-Infinity^2", "= Infinity");
  OS_tester("1/0", "= Infinity");
  OS_tester("sin(1)", "= 841.47m");
  OS_tester("sin1", "= 841.47m");
  OS_tester("sin(-1)", "= -841.47m");
  OS_tester("sin-1", "= -841.47m");
  OS_tester("-pi", "= -3.14");

  if (test_flag ==0 ){
    console.log ("All tests PASSED");
  }
    console.log (testresults);
}
