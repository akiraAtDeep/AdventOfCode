const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  //input = input.trim().split('\n');
  var pos=[0,0];
  var poss=[0,0];
  var posr=[0,0];
  var visited = [pos.join(',')];
  var visited2 = [pos.join(',')];
  for (var i=0; i<input.length; i++){
    switch(input[i]){
      case '^':
        pos[0]--;
        if (i % 2 == 0) posr[0]--;
        else poss[0]--;
        break;
      case 'v':
        pos[0]++;
        if (i % 2 == 0) posr[0]++;
        else poss[0]++;
        break;
      case '<':
        pos[1]--;
        if (i % 2 == 0) posr[1]--;
        else poss[1]--;
        break;
      case '>':
        pos[1]++;
        if (i % 2 == 0) posr[1]++;
        else poss[1]++;
        break;
    }
    if (i % 2 == 0) {
      if (visited2.indexOf(posr.join(',')) === -1) visited2.push(posr.join(','));
    } else {
      if (visited2.indexOf(poss.join(',')) === -1) visited2.push(poss.join(','));
    }
    if (visited.indexOf(pos.join(',')) === -1) visited.push(pos.join(','));
  }

  console.log(visited.length);
  console.log(visited2.length);

});