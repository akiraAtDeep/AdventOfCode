const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');
  var count = 0, max = 0, cal = [];

  for (var i=0; i<input.length; i++) {
    if (input[i] !== '') {
      count += parseInt(input[i]);
    } else {
      max = max > count ? max : count;
      cal.push(count);
      count = 0;
    }
  }

  console.log(max);
  cal.sort();
  console.log(cal[cal.length-1]+cal[cal.length-2]+cal[cal.length-3]);
  

});