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
  input = input.split('\n');

  var res = 0;
  var res2 = 0;

  input.forEach(element => {
    var reg = /\(([0-9]{1,}\ [+*]\ ){1,}[0-9]{1,}\)/;
    var exp = element;
    var exp2 = JSON.parse(JSON.stringify(element));
    while (reg.test(exp)) {
      var asd = exp.match(reg);
      var tmpExp = asd[0].replace(/[\(\)]/g,'');
      exp = exp.replace(asd[0],doTheMath(tmpExp));
    }

    while (reg.test(exp2)) {
      var asd = exp2.match(reg);
      var tmpExp = asd[0].replace(/[\(\)]/g,'');
      tmpExp = doAddittion(tmpExp);
      exp2 = exp2.replace(asd[0],doTheMath(tmpExp));
    }
    res += doTheMath(exp);
    res2 += doTheMath(doAddittion(exp2));

  });

  console.log("Parte 1: " + res);
  console.log("Parte 2: " + res2);

  function doAddittion(exp) {
    var reg = /[0-9]{1,} \+ [0-9]{1,}/;
    while (reg.test(exp)) {
      var asd = exp.match(reg);
      exp = exp.replace(asd[0],doTheMath(asd[0]));
    }
    return exp;
  }



  function doTheMath(exp) {
    exp += ' ';
    var tmp = 0;
    var add = true;
    var tmpVal = '';
    for (var i=0; i<exp.length; i++) {
      switch (exp[i]) {
        case '+':
          add = true;
          break;
        case '*':
          add = false;
          break;  
        case ' ':
          if (tmpVal !== '') {
            if (add) tmp = tmp + parseInt(tmpVal);
            else tmp = tmp * parseInt(tmpVal);
            tmpVal = '';
          }
          break;
        default:
          tmpVal += exp[i];
          break;
      }
    }

    return tmp;
  }
}