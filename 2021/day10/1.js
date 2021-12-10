const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');
  
  var points = 0, points2 = new Array();

  input.forEach(element => {
    var opens = new Array();
    var corrupted = false;
    for (var i=0; i<element.length; i++){
      if (element[i] === "(" || element[i] === "[" || element[i] === "{"  || element[i] === "<" ) {
        opens.push(element[i]);
      } else {
        switch(opens[opens.length-1]) {
          case "(":
            if (element[i] !== ")") {
              points+=getPoints(element[i]);
              corrupted = true;
            } else opens.splice(opens.length-1,1);
            break;
          case "[":
            if (element[i] !== "]") {
              points+=getPoints(element[i]);
              corrupted = true;
            } else opens.splice(opens.length-1,1);
            break;
          case "{":
            if (element[i] !== "}") {
              points+=getPoints(element[i]);
              corrupted = true;
            } else opens.splice(opens.length-1,1);
            break;
          case "<":
            if (element[i] !== ">") {
              points+=getPoints(element[i]);
              corrupted = true;
            } else opens.splice(opens.length-1,1);
            break;
        }
      }
      if (corrupted) i = element.length;
    }
    if (!corrupted) {
      var point = 0;
      if (opens.length>0) {
        for (var i=opens.length-1; i>=0; i--) {
          switch(opens[i]) {
            case "(":
              point = (point * 5) + 1;
              break;
            case "[":
              point = (point * 5) + 2;
              break;
            case "{":
              point = (point * 5) + 3;
              break;
            case "<":
              point = (point * 5) + 4;
              break;
          }
        }
      }
      points2.push(point);
    }
  });

  var winner = 0;

  for (var a=0; a<points2.length; a++){
    var less=0, over=0;
    for (var b=0; b<points2.length; b++){
      if (a!==b){
        if (points2[a]<points2[b]) less++;
        else over++;
      }
    }
    if (less === over) {
      winner = points2[a];
      a=points2.length;
    }
  }

  console.log("La prima risposta: " + points);
  console.log("La seconda risposta: " + winner);
});


function getPoints(closer) {
  var ret = 0;
  switch(closer) {
    case ")":
      ret = 3;
      break;
    case "]":
      ret = 57;
      break;
    case "}":
      ret = 1197;
      break;
    case ">":
      ret = 25137;
      break;
  }
  //console.log(Array(closer, ret));
  return ret;
}