const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  //input = input.trim().split('\n');
  input = JSON.parse(input);
  var sum = 0;

  loooooop(input,false);
  console.log(sum);
  sum = 0;
  loooooop(input,true);
  console.log(sum);

  function loooooop(obj,ckeckRed) {
    if (typeof(obj) === 'object') {
      if (ckeckRed) {
        var red = false;
        if (!Array.isArray(obj) ) {
          for (key in obj) {
            if(obj[key] === 'red') {
              red = true;
              break;
            }
          }
        }
        if (!red) {
          for (key in obj) {
            loooooop(obj[key],true);
          }
        }
      } else {
        for (key in obj) {
          loooooop(obj[key],false);
        }
      }
    } else if (typeof(obj) === 'number') {
      sum += obj;
    }
    return true;
  }

});