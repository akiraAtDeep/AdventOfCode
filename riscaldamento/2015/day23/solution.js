const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');

  daLoop({'a':0, 'b':0});
  daLoop({'a':1, 'b':0})
  function daLoop(registers) {
    for (var i=0; i<input.length;) {
      var lol =[i,input[i]];
      var arg = input[i].replace(/^[a-z]{3} /,"");
      if (/^hlf/.test(input[i])) {
        registers[arg] = registers[arg] / 2;
        i++;
      } else if (/^tpl/.test(input[i])) {
        registers[arg] = registers[arg] * 3;
        i++;
      } else if (/^inc/.test(input[i])) {
        registers[arg]++;
        i++;
      } else if (/^jmp/.test(input[i])) {
        i += parseInt(arg);
      } else if (/^jie/.test(input[i])) {
        arg = arg.replace(" ","");
        arg = arg.split(",");
        if (registers[arg[0]]%2===0) i += parseInt(arg[1]);
        else i++;
      } else if (/^jio/.test(input[i])) {
        arg = arg.replace(" ","");
        arg = arg.split(",");
        if (registers[arg[0]]===1) i += parseInt(arg[1]);
        else i++;
      }
      //console.log([lol,registers,i]);
    }
    console.log(registers.b);
  }

});