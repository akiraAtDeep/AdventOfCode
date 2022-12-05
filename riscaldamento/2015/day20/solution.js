const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  //input = input.trim().split('\n');
  input = parseInt(input);
  //input = 130;
  var maxPresents = 0, maxPresents2 = 0, found = false, found2 = false;
  var houseId = 0;
  while (!found || !found2) {
    houseId++;
    var housePresents = 0;
    var housePresents2 = 0;
    for (var i=1; i<=houseId; i++) {
      if (houseId % i === 0) {
        housePresents += i*10;
        if (houseId / i <= 50) {
          housePresents2 += i*11;
        }
      } 
    }
    if (!found) {
      maxPresents = maxPresents > housePresents ? maxPresents : housePresents;
      if (maxPresents >= input) {
        found = true;
        console.log("primo: " + houseId);
      }
    }
    
    if (!found2) {
      maxPresents2 = maxPresents2 > housePresents2 ? maxPresents2 : housePresents2;
      if (maxPresents2 >= input) {
        found2 = true;
        console.log("secondo: " + houseId);
      }
    }
    
  }


});