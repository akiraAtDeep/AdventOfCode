const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input_test.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  day(data);
});

function day(input) {
  input = input.split('\n');
  var max = 0;
  for (var i=0; i<input.length;i++) {
    input[i] = parseInt(input[i]);
    if (input[i]>max) max = input[i];
  }
  input.push(0);
  input.sort(function(a, b){return a-b});
  
  var step1 = 0;
  var step3 = 0;
  var lastValue = 0;
  for (var i=0; i<input.length; i++) {
    if (input[i] - lastValue === 1) step1++;
    else if (input[i] - lastValue === 3) step3++;
    lastValue = input[i];
  }
  step3++; 
  console.log('parte 1 ' + (step1*step3));

  var count = 0;

  var stepOne = new Object();
  var stepThree = new Object();

  for (var a=0; a<input.length; a++) {
    for (var b=a+1; b<input.length; b++) {
      if (input[b] === input[a]+1) stepOne[a] = b;
      else if (input[b] === input[a]+3) stepThree[a] = b;
    }
  }


  tree(0,[]);
  /*
  function tree(start) {
    for (var i=0; i<input.length; i++) {
      var find = false;
      if (input[i] === start + 1) {
        find = true;
      }
      if (input[i] === start + 2) {
        find = true;
      }
      if (input[i] === start + 3) {
        find = true;
      }

      if (find) {
        if (input[i] === max) {
          count++;
          return true;
        } else {
          tree(input[i]);
        }
      }

    }
    return false;
  }
  */
  function tree(start, seq) {
    if (input[start] === max) {
      console.log(seq.join());
      count++;
      return true;
    } else if (start !== undefined) {
      seq.push(start);
      tree(stepOne[start], seq);
      tree(stepThree[start], seq);
      return false;
    }
  }


  console.log('parte 2 ' + count);
}
