const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input_test.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  day(data);
});

function day(input) {
  input = input.split('\n');
  var time = parseInt(input[0]);
  var minTime = time;
  var orari = input[1].split(',');
  var minDep;

  var bus = new Array();
  var count = 0;

  orari.forEach(element => {
    if (element !== 'x') {
      var busId = parseInt(element);
      bus.push({'bus': busId, 'step': count});
      var i = 1;
      var goOn = true;
      while (goOn) {
        var tmpTime = busId * i;
        if (tmpTime > time) {
          if (tmpTime - time < minTime) {
            minTime = tmpTime-time;
            minDep = busId;
          }
          goOn = false;
        }
        i++;
      }
    }
    count++;
  });

  console.log('Parte 1 ' + minDep * minTime);

  /*
  var orari = new Array();

  for (var i=0; i<bus.length; i++) {
    var tmp = new Array();
    for (var a=1000000; a<10000000; a++) {
      tmp.push(bus[i].bus*a);
    }
    orari.push(tmp);
    console.log(tmp[tmp.length-1]);
  }

  var tmp = new Array();
  var last = 0;
  for (var i=0; i<bus.length-1; i++) {
    var found = false;
    for (var a=last; a<orari[i].length; a++) {
      if (found) break;
      for (var b=0; b<orari[i+1].length; b++) {
        if (orari[i+1][b] === orari[i][a] + bus[i+1].step) {
          found = true;
          last = b;
          tmp.push(orari[i][a]);
          break;
        }
      }
    }
    console.log(tmp[i]);
  }

  console.log('Parte 2 ' + tmp[0]);
  */
}
