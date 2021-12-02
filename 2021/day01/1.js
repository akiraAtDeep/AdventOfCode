const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');
  
  var count = 0;
  var count2 = 0;
  var last = null;
  for (var i=0; i<input.length; i++) {
    if (i-1>=0 && parseInt(input[i]) > parseInt(input[i-1])) count++;
    if (i+2 < input.length) {
      var tmp = parseInt(input[i]) + parseInt(input[i+1]) + parseInt(input[i+2]);
      if (last !== null && tmp > last) count2++;
      last = tmp;
    }
  }

  console.log("La prima risposta: " + count);
  console.log("La seconda risposta: " + count2);
});