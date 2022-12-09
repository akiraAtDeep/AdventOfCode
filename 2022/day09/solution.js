const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.replace(/\r/g,"");
  input = input.trim().split('\n');

  var head = [0,0], tail = [0,0], tailPos = [tail.join()];
  var knots = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
  var last = [tail.join()];

  input.forEach(element => {
    element = element.split(" ");
      for (var i=0; i<element[1]; i++){
      switch(element[0]){
        case "U":
          head[1]--;
          break;
        case "R":
          head[0]++;
          break;
        case "D":
          head[1]++;
          break;
        case "L":
          head[0]--;
          break;
      }
      if (Math.abs(tail[0]-head[0]) > 1 || Math.abs(tail[1]-head[1]) > 1) {
        tail = moveKnot(tail,head);
        var pos = tail.join();
        if (tailPos.indexOf(pos) === -1) tailPos.push(pos);
      }

      var lastKnot = head;

      knots.forEach(function (knot, index){
        if (Math.abs(knot[0]-lastKnot[0]) > 1 || Math.abs(knot[1]-lastKnot[1]) > 1) {
          knots[index] = moveKnot(knot, lastKnot);
        }
        lastKnot = knots[index];
      });
      var pos = lastKnot.join();
      if (last.indexOf(pos) === -1) last.push(pos);
    }
  });

  console.log(tailPos.length);
  console.log(last.length);

  function moveKnot(k1,k2) {
    if (Math.abs(k1[0]-k2[0]) > 1 || Math.abs(k1[1]-k2[1]) > 1) {
      if (k1[0]>k2[0]) k1[0]--;
      else if (k1[0]<k2[0]) k1[0]++;

      if (k1[1]>k2[1]) k1[1]--;
      else if (k1[1]<k2[1]) k1[1]++;
    }
    return k1
  }

});