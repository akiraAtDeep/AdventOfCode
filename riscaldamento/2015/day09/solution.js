const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');

  var destinations = new Array();
  var distances = new Object();
  var minDistance = 0;
  var maxDistance = 0;

  input.forEach(element => {
    element = element.split(" ");
    if (destinations.indexOf(element[0]) === -1) destinations.push(element[0]);
    if (destinations.indexOf(element[2]) === -1) destinations.push(element[2]);
    distances[element[0]+element[2]] = parseInt(element[4]);
    distances[element[2]+element[0]] = parseInt(element[4]);
  });

  destinations.forEach(element => {
    createPath([element]);
  });

  console.log(minDistance);
  console.log(maxDistance);

  function createPath(path) {
    if (path.length < destinations.length) {
      destinations.forEach(element => {
        if (path.indexOf(element) === -1) {
          var newPath = JSON.parse(JSON.stringify(path));
          newPath.push(element);
          var dist = getDistance(createPath(newPath));
          minDistance = (dist > 0 && dist < minDistance) ||  minDistance === 0 ? dist : minDistance;
          maxDistance = dist > maxDistance ? dist : maxDistance;
        }
      });
    } else {
      return path;
    }
  }

  function getDistance(path) {
    var res = 0;
    if (path !== undefined) {
      var res = 0;
      for (var i=0; i<path.length-1; i++) {
        res += distances[path[i]+path[i+1]];
      }
    }
    return res;
  }
  

});