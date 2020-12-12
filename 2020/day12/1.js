const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  day(data);
});

function day(input) {
  input = input.split('\n');
  var direction = 'E';

  var x=0;
  var y=0;
  var waypointY = -1;
  var waypointX = 10;
  var x2=0;
  var y2=0;
  input.forEach(element => {
    var dir = element.substring(0, 1);
    switch(dir) {
      case 'N':
        y -= parseInt(element.substring(1, element.length));
        waypointY -= parseInt(element.substring(1, element.length));
        break;
      case 'S':
        y += parseInt(element.substring(1, element.length));
        waypointY += parseInt(element.substring(1, element.length));
        break;
      case 'E':
        x += parseInt(element.substring(1, element.length));
        waypointX += parseInt(element.substring(1, element.length));
        break;
      case 'W':
        x -= parseInt(element.substring(1, element.length));
        waypointX -= parseInt(element.substring(1, element.length));
        break;
      case 'L':
        var step = parseInt(element.substring(1, element.length))/90;
        direction = left(step, direction);
        for (var i=0; i<step; i++){
          var tmpX = waypointX;
          var tmpY = waypointY;
          waypointX = tmpY;
          waypointY = -tmpX;
        }
        break;
      case 'R':
        var step = parseInt(element.substring(1, element.length))/90;
        direction = right(step, direction);
        for (var i=0; i<step; i++){
          var tmpX = waypointX;
          var tmpY = waypointY;
          waypointX = -tmpY;
          waypointY = tmpX;
        }
        
        break;
      case 'F':
        x2 += waypointX * parseInt(element.substring(1, element.length));
        y2 += waypointY * parseInt(element.substring(1, element.length));
        switch(direction) {
          case 'N':
            y -= parseInt(element.substring(1, element.length));
            break;
          case 'E':
            x += parseInt(element.substring(1, element.length));
            break;
          case 'S':
            y += parseInt(element.substring(1, element.length));
            break;
          case 'W':
            x -= parseInt(element.substring(1, element.length));
            break;
        }
        break;
    }

    //console.log(element + ':\t' + x2 + ':' + y2 + ';\tw ' + waypointX + ':' + waypointY);
  });

  function waypoint(element) {
    switch(direction) {
      case 'N':
        y2 -= parseInt(element.substring(1, element.length));
        break;
      case 'E':
        x2 += parseInt(element.substring(1, element.length));
        break;
      case 'S':
        y2 += parseInt(element.substring(1, element.length));
        break;
      case 'W':
        x2 -= parseInt(element.substring(1, element.length));
        break;
    }
  }

  function left(step, direction) {
    if (step === 1) {
      switch(direction) {
        case 'N':
          direction = 'W'
          break;
        case 'E':
          direction = 'N'
          break;
        case 'S':
          direction = 'E'
          break;
        case 'W':
          direction = 'S'
          break;
      }
    } else if (step === 2) {
      switch(direction) {
        case 'N':
          direction = 'S'
          break;
        case 'E':
          direction = 'W'
          break;
        case 'S':
          direction = 'N'
          break;
        case 'W':
          direction = 'E'
          break;
      }
    } else if (step === 3) {
      switch(direction) {
        case 'N':
          direction = 'E'
          break;
        case 'E':
          direction = 'S'
          break;
        case 'S':
          direction = 'W'
          break;
        case 'W':
          direction = 'N'
          break;
      }
    }
    return direction;
  }

  function right(step, direction) {
    if (step === 1) {
      switch(direction) {
        case 'N':
          direction = 'E'
          break;
        case 'E':
          direction = 'S'
          break;
        case 'S':
          direction = 'W'
          break;
        case 'W':
          direction = 'N'
          break;
      }
    } else if (step === 2) {
      switch(direction) {
        case 'N':
          direction = 'S'
          break;
        case 'E':
          direction = 'W'
          break;
        case 'S':
          direction = 'N'
          break;
        case 'W':
          direction = 'E'
          break;
      }
    }else if (step === 3) {
      switch(direction) {
        case 'N':
          direction = 'W'
          break;
        case 'E':
          direction = 'N'
          break;
        case 'S':
          direction = 'E'
          break;
        case 'W':
          direction = 'S'
          break;
      }
    }
    return direction;
  }
  console.log('Parte 1: ' + (Math.abs(x) + Math.abs(y)));

  console.log('Parte 2: ' + (Math.abs(x2) + Math.abs(y2)));
}
