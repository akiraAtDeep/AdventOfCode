const { triggerAsyncId } = require('async_hooks');
const { count } = require('console');
const { toNamespacedPath, parse } = require('path');
const { join } = require('path/posix');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err, input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');
  var countPos = Array();
  input.forEach(element => {
    if (countPos.length === 0) {
      for (var i = 0; i < element.length; i++) {
        countPos.push(0);
      }
    }
    for (var i = 0; i < element.length; i++) {
      if (element[i] === '1') countPos[i]++;
    }
  });
  var gamma = '', epsilon = '';
  countPos.forEach(element => {
    if (element>input.length/2) gamma += '1', epsilon += '0';
    else gamma += '0', epsilon += '1';
  });
  console.log("parte prima: " + (parseInt(gamma,2) * parseInt(epsilon,2)));

  var oxygen = JSON.parse(JSON.stringify(input));
  var co2 = JSON.parse(JSON.stringify(input));
  
  for (var i=0; i<countPos.length; i++) {
    if (oxygen.length>1) {
      var countO = 0
      var oxygenTmp = new Array(); 
      for (var a=0;a<oxygen.length;a++) {
        if(oxygen[a][i] === '1') countO++;
      }
      for (var a=0;a<oxygen.length;a++) {
        if(oxygen[a][i] === (countO >= oxygen.length/2 ? '1':'0')) oxygenTmp.push(oxygen[a]);
      }
      oxygen = oxygenTmp;
    }

    if (co2.length>1) {
      var countCo2 = 0;
      var co2Tmp = new Array(); 
      for (var a=0;a<co2.length;a++) {
        if(co2[a][i] === '1') countCo2++;
      }
      for (var a=0;a<co2.length;a++) {
        if(co2[a][i] === (countCo2 < co2.length/2 ? '1':'0')) co2Tmp.push(co2[a]);
      }
      co2 = co2Tmp;
    }
  }

  console.log("seconda prima: " + (parseInt(oxygen[0],2) * parseInt(co2[0],2)));

});