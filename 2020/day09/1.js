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
  var preamble = 25;
  var invalid;
  for (var i=0; i<input.length;i++) {
    input[i] = parseInt(input[i]);
  }

  for (var i=preamble; i<input.length; i++) {
    var found = false;
    for (var a=i-preamble; a<i-1; a++) {
      for (var b=i-preamble+1; b<i; b++) {
        if (input[a] + input[b] === input[i]) {
          found = true;
          break;
        } 
      }
      if (found) break;
    }
    if (!found) {
      invalid = input[i];
      break;
    }
  }

  console.log("Parte 1: " + invalid);
  
  for (var a=0; a<input.length; a++) {
    var find = false;
    var sum = input[a];
    var min = sum;
    var max = sum;
    for (var b=a+1; b<input.length; b++) {
      sum += input[b];
      if (min > input[b]) min = input[b];
      else if (max < input[b]) max = input[b];

      if (sum === invalid) {
        find = true;
        break;
      }
      else if (sum > invalid) {
        //console.log('fuck ' + sum);
        break;
      };
    }
    if (find) {
      console.log("Parte 2: " + (min + max));
      break;
    }
  }

  //console.log("Parte 2: " + acc);
}