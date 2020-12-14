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
  
  var memory = new Object();
  var memory2 = new Object();
  var mask;

  var tmpAddr;

  input.forEach(element => {
    var asd = element.replace(/ /g, '');
    var tmp=asd.split('=');
    if (tmp[0] === 'mask'){
      mask = tmp[1].split('');
    } else if (tmp[0].substring(0,3) === 'mem') {
      var addr = tmp[0].substring(4,tmp[0].length-1);
      //parte 1
      var number = parseInt(tmp[1]).toString(2);
      while (number.length < mask.length) number = '0' + number;
      var applied = '';
      for (var i=0; i<mask.length; i++) {
        if (mask[i]!=='X'){
          applied += mask[i];
        } else {
          applied += number[i];
        }
      }
      memory[addr] = parseInt(applied,2);
      //parte 2
      addr = parseInt(addr).toString(2);
      while (addr.length < 36) addr = '0' + addr;
      var applied = '';
      for (var i=0; i<mask.length; i++) {
        if (mask[i]==='0'){
          applied += addr[i];
        } else if (mask[i]==='1'){
          applied += 1;
        }  else if (mask[i]==='X'){
          applied += 'X';
        } 
      }
      tmpAddr = new Array();
      deFloating(applied);
      tmpAddr.forEach(element => {
        memory2[parseInt(element,2)] = parseInt(tmp[1]);
      });
    }
  });

  var sum = 0;
  for (var i in memory) {
    sum += memory[i];
  }

  console.log('Parte 1: ' + sum);
  
  sum = 0;
  for (var i in memory2) {
    sum += memory2[i];
  }

  console.log('Parte 2: ' + sum);


  function deFloating(str) {
    if (!/X/.test(str)){
      tmpAddr.push(str);
    } else {
      deFloating(str.replace('X','0'));
      deFloating(str.replace('X','1'));
    }
  }
}