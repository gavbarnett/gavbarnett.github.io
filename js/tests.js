function tests(){
  var testresults = [];
  var test_flag = 0;
  function OS_tester(testname, test, result){
        if (OS(test) != result){
          console.log(testname + ": FAILED");
          console.log(testname + ": " + OS(test) + " != " + result );
          testresults[testresults.length] = [testname, "FAILED"];
          test_flag = 1;
        } else {
          testresults[testresults.length] = [testname, "PASSED"];
        }
  }
  OS_tester("1=1","1","= 1.00");
  OS_tester("1+1","1+1","= 2.00");
  OS_tester("2^2","2^2","= 4.00");
  OS_tester("2^2","2^2","= 4.00");

  if (test_flag ==0 ){
    console.log ("All tests PASSED");
    console.log (testresults);
  }
}
