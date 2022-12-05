const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');

  var count = 0;

  input.forEach(element => {
    var range = element.split(",");
    range[0] = range[0].split("-");
    range[1] = range[1].split("-");
    if(parseInt(range[0][0]) <= parseInt(range[1][0]) && parseInt(range[0][1]) >= parseInt(range[1][1])) {
      count++;
    } else if(parseInt(range[1][0]) <= parseInt(range[0][0]) && parseInt(range[1][1]) >= parseInt(range[0][1])) {
      count++;
    }
  });
  console.log(count);

  count = 0;
  input.forEach(element => {
    var range = element.split(",");
    range[0] = range[0].split("-");
    range[1] = range[1].split("-");
    var field = new Array();
    for (var a=parseInt(range[0][0]); a<=parseInt(range[0][1]); a++) {
      field.push(a);
    }
    for (var a=parseInt(range[1][0]); a<=parseInt(range[1][1]); a++) {
      if (field.indexOf(a) !== -1) {
        count++;
        break;
      }
    } 
  });
  console.log(count);




});