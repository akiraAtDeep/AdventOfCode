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

  function findFirst() {
    var i=1;    //nel caso generico parto dalla prima ripartenza del primo bus
    var i2=1;
    //var i=Math.round(100000000000000/bus[0].bus); //con l'input vero, so che la risposta è sopra a 100000000000000, 
    //var i2=Math.round(100000000000000/bus[1].bus);  //quindi parto da li!
    var find = false;

    while (!find) {
      if ((bus[0].bus*i)+bus[1].step < bus[1].bus*i2) i++;
      else if ((bus[0].bus*i)+bus[1].step > bus[1].bus*i2) i2++;
      else if ((bus[0].bus*i)+bus[1].step === bus[1].bus*i2) {
        if(findNext(bus[0].bus*i, 1)){
          console.log('Parte 1 ' + bus[0].bus*i);
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
}
