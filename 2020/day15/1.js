const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input_test.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  day(data);
});

function day(input) {
  input = input.split(',');

  for (var i=0; i<input.length; i++) {
    input[i] = parseInt(input[i]);
  }

  var asd = JSON.parse(JSON.stringify(input));

  for (var i=input.length; i< 30000000; i++) {
    if (i===2020) console.log("Parte 1: " + input[i-1]);
    var found = false;
    var prev = 0;
    for (var a=input.length-2; a>=0; a--) {
      if (input[i-1] === input[a]) {
        found = true;
        prev = a;
        break;
      }
    }

    if (found) input.push(i-(prev+1));
    else input.push(0);
  }
  console.log("Parte 2: " + input[input.length-1]);

}