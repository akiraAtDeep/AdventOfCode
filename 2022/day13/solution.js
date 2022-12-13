const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.replace(/\r/g,"");
  input = input.trim().split('\n');
  
  var right = 0, pairs = new Array(), newPair = new Array();;

  for (var i=0; i<input.length; i++) {
    if (input[i] !== "") {
      newPair.push(JSON.parse(input[i]));
    } else {
      pairs.push(newPair);
      newPair = new Array();
    }
  }
  if (newPair.length === 2) pairs.push(newPair);

  var count = 0;
  for (var i=0; i<pairs.length; i++) {
      if (compare(pairs[i][0],pairs[i][1])) {
        count++;
        right += i +1;
      }
  }

  console.log([right, count, pairs.length]);

  function compare(t1,t2) {
    //console.log([t1,t2]);
    var ret = false;
    var level = t2.length > t1.length ? t2.length : t1.length;
      for (var i=0; i<level; i++) {
        if (t2[i] === undefined) { //la destra ha meno elementi, bocciato
          break;
        }
        if (t1[i] === undefined) { //la sisnstra ha più elmeneti, promosso
          ret = true;
          break;
        }
        if (typeof(t1[i]) === 'number' && typeof(t2[i]) === 'number') {
          if (t1[i] < t2[i]) { //sono due numeri e la sinistra è minore, promosso
            ret =  true;
            break;
          } else if (t1[i] > t2[i]) { //sono due numeri e la destra è minore, bocciato
            break;
          }
        } else {
          if (typeof(t1[i]) === 'number') { //se il primo è un numero e il secondo no, diventa un array
            var tmp = t1[i];
            t1[i] = new Array();
            t1[i].push(tmp);         
          } else if (typeof(t2[i]) === 'number') { //se il secondo è un numero e il secondo no, diventa un array
            var tmp = t2[i];
            t2[i] = new Array();
            t2[i].push(tmp); 
          }
          ret = compare(t1[i],t2[i]); //ora sono due array, faccio il confronto.
          if (ret) break; 
        }
    }
    
    return ret;
  }
  


});