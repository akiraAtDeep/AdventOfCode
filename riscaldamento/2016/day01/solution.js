const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }

  input = input.trim().split(', ');
  var x=0, y=0, direction=0, destination, points = new Array();

  input.forEach(element => {
    switch(element[0]) {
      case 'R':
        direction = direction < 3 ? direction+1 : 0
        break;
      case 'L':
        direction = direction > 0 ? direction-1 : 3
        break;
    }
    for (var i=0; i<element.slice(1,element.length); i++) {
      switch(direction) {
        case 0:
          y--;
          break;
        case 1:
          x++;
          break;
        case 2:
          y++;
          break;
        case 3:
          x--;
          break;
      }
      if (destination === undefined) {
        if (points.indexOf(x+'-'+y) === -1) points.push(x+'-'+y);
        else destination = Math.abs(x)+Math.abs(y);
      }
    }
  });

  console.log(Math.abs(x)+Math.abs(y));
  console.log(destination)
});