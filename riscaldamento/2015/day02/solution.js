const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  //input = input.trim().split('\n');
  var floar = 0;
  var minus1 = null;
  for (var i=0; i<input.length; i++){
    switch(input[i]){
      case '(':
        floar++;
        break;
      case ')':
        floar--;
        break;
    }
    if (minus1 === null && floar === -1) minus1 = i;
  }

  console.log(floar);
  console.log(minus1);

});