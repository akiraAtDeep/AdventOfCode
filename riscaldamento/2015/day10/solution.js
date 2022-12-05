const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  //input = input.trim().split('\n');
  for (var i=0; i<50; i++) {
    
    var newInput = "";
    var last = input[0];
    var count = 1;
    for (var a=1; a<=input.length; a++) {
      if (input[a] === last) {
        count++;
      } else {
        newInput += count + last;
        last = input[a];
        count = 1;
      }
    }
    input = newInput;
    if (i===39) console.log(input.length);
    //console.log(input);
  }
  console.log(input.length);

});