const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  day(data);
});

function day(input) {
  input = input.split('');

  for (var i=0; i<input.length; i++) {
    input[i] = parseInt(input[i]);
  }

  var position = 0;

  for (var i=0; i<100; i++) {
    var actual = input[position];
    var dest = input[position]-1 === 0 ? 9 : input[position]-1;
    
    var toShift = new Array();

    for (var a=1; a<=3; a++) {
      var tmp = position + a <= input.length-1 ? position + a : position + a - input.length;
      toShift.push(input[tmp]);
    }

    while (true) {
      var found = false;
      for (var a=0; a<toShift.length; a++) {
        if (dest === toShift[a]) {
          dest = dest - 1 === 0 ? 9 : dest -1;
          found = true;
          break;
        }
      }
      if (!found) break;
    }

    if (dest === 0 ) break;

    toShift.forEach(element => {
      for (var a=0; a<input.length; a++) {
        if (input[a] === element) {
          input.splice(a,1);
          break;
        }
      }
    });

    toShift.forEach(element => {
      for (var b=0; b<input.length; b++) {
        if (input[b] === dest) {
          if (b+1 === input.length) input.push(element);
          else input.splice(b+1,0,element);
          break;
        }
      }
      dest = element;
    });
    

    for (var a=0; a<input.length; a++) {
      if (input[a] === actual) {
        position = a + 1 <= input.length - 1 ? a + 1 : 0; 
        break;
      }
    }

  }
   
  var positionStart;
  for (var i=0; i<input.length; i++) {
    if (input[i] === 1) {
      positionStart = i+1;
      break;
    }
  }

  var res = '';
  for (var i=0; i<8; i++) {
    var tmp = positionStart + i <= input.length -1 ? positionStart + i : positionStart + i - input.length;
    res += input[tmp];
  }

  console.log(res);


  function printRes (position) {
    var asd = '';
    for (var i=0; i<input.length; i++) {
      if (i === position) asd += '(' + input[i] + ') ';
      else asd +=  input[i] + ' ';
    }
    console.log(asd);
  }

}