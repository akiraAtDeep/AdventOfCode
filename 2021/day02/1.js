const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');
  
  var count = 0;
  var x = 0, y = 0;
  var y2 = 0, aim = 0;
  for (var i=0; i<input.length; i++) {
    var command = input[i].split(" ");
    switch (command[0]) {
      case 'forward':
        x+=parseInt(command[1]);
        y2 += (command[1])*aim;

        break;6
      case 'up':
        y+=parseInt(command[1]);
        aim-=parseInt(command[1]);
        break;
      case 'down':
        y-=parseInt(command[1]);
        aim+=parseInt(command[1]);
        break;
      default:
        break;
    }
    console.log(Array(aim,x,y2));
  }

  console.log("La prima risposta: " + Math.abs(x*y));
  
  console.log("La prima risposta: " + Math.abs(x*y2));
});