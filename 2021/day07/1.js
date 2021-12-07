const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split(',');

  var min = null, max = null;

  input.forEach(element => {
      if (min === null || parseInt(element) < min) min = parseInt(element);
      if (max === null || parseInt(element) > max) max = parseInt(element);
  });

  var minFuel = null;
  for (var i=min; i<=max; i++){
    var tmp = 0;
    input.forEach(element => {
      tmp += Math.abs(parseInt(element) - i);
    });
    if (minFuel === null || tmp < minFuel) minFuel = tmp;
  }

  console.log("La prima risposta: " + minFuel);

  var minFuel = null;
  for (var i=min; i<=max; i++){
    var tmp = 0;
    input.forEach(element => {
      var a = parseInt(element);

        for (var b = 1; b <= Math.abs(i-a); b++) {
          tmp += b;
        }

      
    });
    if (minFuel === null || tmp < minFuel) minFuel = tmp;
  }



  console.log("La seconda risposta: " + minFuel);

});