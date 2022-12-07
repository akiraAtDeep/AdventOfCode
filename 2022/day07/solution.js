const { triggerAsyncId } = require('async_hooks');
const { dir } = require('console');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.replace(/\r/g,"")
  input = input.trim().split('\n');

  var path = new Array();
  var actualDir = "";
  var dirDimension = new Object();
  dirDimension["//"] = 0;

  input.forEach(row => {
    //console.log(path)
    row = row.split(" ");
    if(row[1] === "cd"){
      if(row[2] === '..') { //torno un livello indietro
        var tmpSize = dirDimension[actualDir];
        path.splice(path.length-1,1);
        actualDir = "";
        path.forEach(element => {
          actualDir += element + "/";
        });
        dirDimension[actualDir] += tmpSize;
      } else { //cambio livello
        path.push(row[2]);
        actualDir += row[2] + "/";
      }
    } else if(row[1] === "ls"){ //in realtà non mi serve

    } else {
      if(row[0] === "dir"){ //è una directory
        if (dirDimension[actualDir+row[1]+"/"] === undefined) dirDimension[actualDir+row[1]+"/"] = 0;
      } else { //è un file
        
        if (dirDimension[actualDir] === undefined) dirDimension[actualDir] = 0;
        dirDimension[actualDir] += parseInt(row[0]);
      }
    }
  });

  var tmpSize = dirDimension[actualDir];
  path.splice(path.length-1,1);
  actualDir = "";
  path.forEach(element => {
    actualDir += element + "/";
  });
  dirDimension[actualDir] += tmpSize;

  var count = 0;
  for (var key in dirDimension) {
    if (key !== "//") {
      if (dirDimension[key] <= 100000) {
        count += dirDimension[key];
      }
    }
  }

  console.log(count);

  var freeSpace = 70000000 - dirDimension["//"];
  var require = 30000000 - freeSpace;
  var candidates = new Array();

  for (var key in dirDimension) {
    if (key !== "//") {
      if (dirDimension[key] >= require) {
        candidates.push(dirDimension[key]);
      }
    } 
  }

  var min;

  candidates.forEach(element => {
    if (min === undefined) min = element;
    min = min < element ? min : element;
  });

  console.log(min);

});