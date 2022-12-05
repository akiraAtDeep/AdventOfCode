const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');
  var inputCopy = JSON.parse(JSON.stringify(input));
  var reset = JSON.parse(JSON.stringify(input));
  var wires = new Object();
  var wirea;

  theLoop();
  wirea = wires['a'];
  console.log(wirea);

  input = JSON.parse(JSON.stringify(reset));
  inputCopy = JSON.parse(JSON.stringify(input));
  wires = new Object();
  theLoop();
  console.log(wires['a']);

  function theLoop() {
    while (input.length>0) {
      input.forEach(function (element,index,arr) {
        var toDelete = false;
        var row = element.replace(' -> ',',');
        row = row.split(',');
        var raw = row[0].split(' ');
        if (raw.length === 3) {
          if (getValue(raw[0]) !== undefined && getValue(raw[2])!== undefined) {
            doTheMath([raw[0],raw[2]],raw[1],row[1]);
            toDelete = true;
          }
        } else if (raw.length === 2){
          if (getValue(raw[1])!== undefined) {
            doTheMath([raw[1]],raw[0],row[1]);
            toDelete = true;
          }
        } else if (getValue(row[0])!== undefined) {
          doTheMath([row[0]],"COPY",row[1]);
          toDelete = true;
        }
        if(toDelete) {
          inputCopy.splice(inputCopy.indexOf(element),1);
        }
      });
      input = JSON.parse(JSON.stringify(inputCopy));
    }
  }

  function getValue(data) {
    if(isNaN(parseInt(data))) {
      return wires[data];
    } else {
      return parseInt(data);
    }
  }

  function doTheMath(operand, operation, res) {
    if (res === "b" && wirea !== undefined) {
      wires[res] = wirea;
    } else {
      switch(operation){
        case 'AND':
          wires[res] = getValue(operand[0]) & getValue(operand[1]);
          break;
        case 'OR':
          wires[res] = getValue(operand[0]) | getValue(operand [1]);
          break;
        case 'LSHIFT':
          wires[res] = getValue(operand[0]) << getValue(operand [1]);
          break;
        case 'RSHIFT':
          wires[res] = getValue(operand[0]) >> getValue(operand [1]);
          break;
        case 'NOT':
          var bits = getValue(operand[0]).toString(2);
          while (bits.length < 16) bits = '0' + bits;
          var result = '';
          for (var i=0; i<16; i++) result += bits[i] === '1' ? '0' : '1';
          wires[res] = parseInt(result,2);
          break;
        case 'COPY':
          wires[res] = getValue(operand[0]);
          break;
      }
    }
  }
});