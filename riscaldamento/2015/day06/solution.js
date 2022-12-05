const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');
const { listenerCount } = require('process');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');

  var lit = new Array();
  for (var y=0;y<1000; y++) {
    var row = new Array();
    for (var x=0; x<1000; x++) {
      row.push(false);
    }
    lit.push(row);
  }

  var grid = new Array();
  for (var y=0;y<1000; y++) {
    var row = new Array();
    for (var x=0; x<1000; x++) {
      row.push(0);
    }
    grid.push(row);
  }

  input.forEach(element => {
    var start, end, what;
    if (/toggle/.test(element)) {
      element = element.split(' ');
      start = element[1].split(',');
      end = element[3].split(',');
      what = element[0];
    } else {
      element = element.split(' ');
      start = element[2].split(',');
      end = element[4].split(',');
      what = element[1];
    }
    changeState(start, end, what);
  });

  var count = 0;
  lit.forEach(element => {
    element.forEach(ligth => {
      if (ligth) count++;
    });
  });
  console.log(count);
  
  var brightness = 0;
  grid.forEach(element => {
    element.forEach(ligth => {
      brightness+=ligth;
    });
  });
  console.log(brightness);

  function changeState(start, end, what) {
    for (y=parseInt(start[1]); y<=parseInt(end[1]); y++){
      for (x=parseInt(start[0]); x<=parseInt(end[0]); x++) {
        switch(what){
          case 'on':
            lit[y][x] = true;
            grid[y][x]++;
            break;
          case 'off':
            lit[y][x] = false;
            if (grid[y][x] > 0) grid[y][x]--;
            break;
          case 'toggle':
            lit[y][x] = !lit[y][x];
            grid[y][x] = grid[y][x] + 2;
            break;
          default:
            break;
        }
      }
    }
  }
 

});