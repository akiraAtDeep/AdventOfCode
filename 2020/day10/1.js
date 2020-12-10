const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,data) {
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
  tree(0);
  
  function tree(start) {
    var find1 = false;
    var find2 = false;
    var find3 = false;
    for (var i=0; i<input.length; i++) {
      var find = false;
      if (input[i] === start + 1) {
        find1 = true;
        find = true;
      }
      if (input[i] === start + 2) {
        find2 = true;
        find = true;
      }
      if (input[i] === start + 3) {
        find3 = true;
        find = true;
      }

      if (find) {
        if (input[i] === max) {
          count++;
          return true;
        } else {
          tree(input[i]);
        }
        if (find1 && find2 && find3) break;
      }

    }
    return false;
  }
  


  console.log('parte 2 ' + count);
}
