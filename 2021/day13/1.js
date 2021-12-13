const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');

  var folds = new Array();
  var coords = new Array();

  input.forEach(element => {
    if (/[0-9]{1,},[0-9]{1,}/g.test(element)) {
      coords.push(element);
    } else if (/fold along/g.test(element)) {
      var tmp = element.split(" ");
      folds.push(tmp[2].split("="));
    }
  });


  
  for (var a=0; a<folds.length; a++) {
    if (folds[a][0] === "y") {
      var toDelete = new Array();
      for (var i=0; i<coords.length; i++) {
        var coord = coords[i].split(",");
        if (parseInt(coord[1]) > parseInt(folds[a][1])) {
          var newPos = coord[0] + "," + (parseInt(folds[a][1]) - (parseInt(coord[1]) - parseInt(folds[a][1])));
          if (coords.indexOf(newPos) === -1) coords.push(newPos);
          toDelete.push(coords[i]);
        }
      }
      toDelete.forEach(element => {
        coords.splice(coords.indexOf(element), 1);
      });
    } else {
      var toDelete = new Array();
      for (var i=0; i<coords.length; i++) {
        var coord = coords[i].split(",");
        if (parseInt(coord[0]) > parseInt(folds[a][1])) {
          var newPos = (parseInt(folds[a][1]) - (parseInt(coord[0]) - parseInt(folds[a][1]))) + "," + coord[1];
          if (coords.indexOf(newPos) === -1) coords.push(newPos);
          toDelete.push(coords[i]);
        }
      }
      toDelete.forEach(element => {
        coords.splice(coords.indexOf(element), 1);
      });
    }
    if (a===0) console.log("La prima risposta: " + coords.length);
  }

  var maxX = 0, maxY = 0;

  for (var i=0; i<coords.length; i++) {
    var tmp = coords[i].split(",");
    if (parseInt(tmp[0]) > maxX) maxX = parseInt(tmp[0]);
    if (parseInt(tmp[1]) > maxY) maxY = parseInt(tmp[1]);
  }

  console.log("La seconda risposta: ");

  for (var y=0; y<maxY+1; y++) {
    var row = "";
    for (var x=0; x<maxX+1; x++) {
      if (coords.indexOf(x+","+y) > -1) row += "#";
      else row += ".";
    }
    console.log(row);
  }

});