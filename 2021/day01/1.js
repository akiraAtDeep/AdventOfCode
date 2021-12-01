const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');
  var slide = new Array();
  var count = 0;
  for (var i=0; i<input.length; i++){
    if (i>0) if (parseInt(input[i]) > parseInt(input[i-1])) count++;
    if (i+2 < input.length) {
      slide.push(parseInt(input[i]) + parseInt(input[i+1]) + parseInt(input[i+2]));
    }
  };
  console.log(count);
  count = 0;
  for (var i=1; i<slide.length; i++) {
    if (slide[i] > slide[i-1]) count++;
  }
  console.log(count);
});