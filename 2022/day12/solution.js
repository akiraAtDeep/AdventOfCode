const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.replace(/\r/g, "");
  input = input.trim().split('\n');

  var start;
  var minSteps;

  for (var y=0; y<input.length; y++) {
    for (var x=0; x<input[y].length; x++) {
      if (input[y][x] === "S") {
        start = {'x':x,'y':y};
        break;
      }
    }
    if (start !== undefined) break;
  }  

  nextStep([start],new Array());
  console.log(minSteps);

  function nextStep(steps,visual) {
    if (minSteps !== undefined && steps.length > minSteps) return false;
    var pos = steps[steps.length-1];
    var letter = (input[pos.y][pos.x] === 'S' ? 'a' : input[pos.y][pos.x]).charCodeAt(0);
    //up
    if (pos.y-1 >= 0) {
      var next = {'x': pos.x, 'y': pos.y-1}
      var newVisual = JSON.parse(JSON.stringify(visual));
      newVisual.push("^");
      var newSteps = JSON.parse(JSON.stringify(steps));
      if (!testPath(newSteps,next)) doIt(newSteps, next, letter, newVisual);
    }
    //right
    if (pos.x+1 < input[pos.y].length){
      var next = {'x': pos.x+1, 'y': pos.y};
      var newVisual = JSON.parse(JSON.stringify(visual));
      newVisual.push(">");
      var newSteps = JSON.parse(JSON.stringify(steps));
      if (!testPath(newSteps,next)) doIt(newSteps, next, letter, newVisual);
    }
    //down
    if (pos.y+1 < input.length){
      var next = {'x': pos.x, 'y': pos.y+1};
      var newVisual = JSON.parse(JSON.stringify(visual));
      newVisual.push("v");
      var newSteps = JSON.parse(JSON.stringify(steps));
      if (!testPath(newSteps,next)) doIt(newSteps, next, letter, newVisual);
    }
    //left
    if (pos.x-1 >= 0){
      var next = {'x': pos.x-1, 'y': pos.y};
      var newVisual = JSON.parse(JSON.stringify(visual));
      newVisual.push("<");
      var newSteps = JSON.parse(JSON.stringify(steps));
      if (!testPath(newSteps,next)) doIt(newSteps, next, letter, newVisual);
    }
    return true;
  }

  function doIt(steps, pos, letter, visual) {
    if (input[pos.y][pos.x] === 'E' && (letter === 121 || letter === 122)) {
      
      console.log("--------------------------------------------------");
      console.log([visual,steps.length]);
      console.log("--------------------------------------------------");

      if (minSteps === undefined) minSteps = steps.length;
      else minSteps = minSteps < steps.length+1 ? minSteps : steps.length;
      return true;
    } else if (input[pos.y][pos.x].charCodeAt(0)-1 <= letter) {
      steps.push(pos);
      nextStep(steps, visual);
    } 
    return true;
  }

  function testPath(steps,pos) {
    var found = false;
    for (var i=0; i<steps.length; i++) {
      if (steps[i].x === pos.x && steps[i].y === pos.y) {
        found = true;
        break;
      }
    }
    return found;
  }

});