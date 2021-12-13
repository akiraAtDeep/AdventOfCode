const { triggerAsyncId } = require('async_hooks');
const { link } = require('fs');
const { toNamespacedPath, parse } = require('path');

fs = require('fs');

var count = 0;
var links = new Object();
var allPath = new Array();

fs.readFile('input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');

  var starts = new Array();
  
  input.forEach(element => {
    var tmp = element.split("-");
    if (/start/g.test(element)) {
      if (tmp[0] === "start") starts.push(tmp[1]);
      else starts.push(tmp[0]);
    } else {
      if (links[tmp[0]] === undefined) links[tmp[0]] = new Array();
      links[tmp[0]].push(tmp[1]);
      if (links[tmp[1]] === undefined) links[tmp[1]] = new Array();
      links[tmp[1]].push(tmp[0]);
    }
  });

  var single = new Array();
  for (var key in links) {
    if (key.toLowerCase() === key && key !== "end") single.push(key);
  }

  starts.forEach(start => {
    nextCave(start, new Array(start));
  });
  console.log("La prima risposta: " + count);

  count = 0;
  starts.forEach(start => {
    single.forEach(element => {
      nextCaveTwice(start, new Array(start), element);
    });
  });
  console.log("La seconda risposta: " + count);

});

function nextCave(start, path) {
  var ret = false;
  links[start].forEach(element => {
    var newPath = JSON.parse(JSON.stringify(path));
    if (element === "end") {
      count++;
      ret = true;
    } else {
      if (element.toLowerCase() === element) {
        if (newPath.indexOf(element) === -1) {
          newPath.push(element);
          ret = nextCave(element, newPath);
        }
        else ret = false;
      } else {
        newPath.push(element);
        ret = nextCave(element, newPath);
      }
    }
  });
  return ret;
}


function nextCaveTwice(start, path, single) {
  var ret = false;
  links[start].forEach(element => {
    var newPath = JSON.parse(JSON.stringify(path));
    if (element === "end") {
      if (allPath.indexOf(newPath.join()) === -1) {
        allPath.push(newPath.join());
        count++;
      }
      ret = true;
    } else {
      if (element.toLowerCase() === element) {
        if ( (element === single && countOccurrences(newPath,element)<2) || (newPath.indexOf(element) === -1)){
          newPath.push(element);
          ret = nextCaveTwice(element, newPath, single);
        } else ret = false;

      } else {
        newPath.push(element);
        ret = nextCaveTwice(element, newPath, single);
      }
    }
  });
  return ret;
}

//https://www.codegrepper.com/code-examples/javascript/javascript+count+number+of+occurrences+in+array
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);