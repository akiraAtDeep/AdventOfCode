const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,data) {
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
  var count = 1;

  orari.forEach(element => {
    if (element !== 'x') {
      var busId = parseInt(element);
      bus.push({'bus': busId, 'step': count});
      count = 1;
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
    } else {
      count++;
    }
  });

  console.log('Parte 1 ' + minDep * minTime);

  findFirst();
  //console.log(findNext(1068781, 1));

  function findFirst() {
    var i=1;
    var i2=1;
    var find = false;

    while (!find) {
      if ((bus[0].bus*i)+bus[1].step < bus[1].bus*i2) i++;
      else if ((bus[0].bus*i)+bus[1].step > bus[1].bus*i2) i2++;
      else if ((bus[0].bus*i)+bus[1].step === bus[1].bus*i2) {
        if(findNext(bus[0].bus*i, 1)){
          console.log(bus[0].bus*i);
          break;
        } else {
          i++;
        }
      }
    }
    return false;
  }

  function findNext(past,id) {
    var i=Math.round(past/bus[id].bus)-1;
    while (true) {
      if (past+bus[id].step > bus[id].bus*i) i++;
      else if (past+bus[id].step === bus[id].bus*i) {
        if (id+1<=bus.length-1) {
          return (findNext(bus[id].bus*i,id+1));
        }
        return true;
      } else {
        return false;
      }
    }
    
  }


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
