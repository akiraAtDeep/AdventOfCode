const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

var numbers = {};
fs = require('fs')

fs.readFile('input_test.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');
  
  var unique = [2,4,3,7];

  var count = 0;
  var sum = 0;
  input.forEach(element => {
    var isData = false;
    element = element.split(' ');
    element.forEach(data => {
      if (isData) {
        for (var i=0; i<unique.length; i++) {
          if (data.length === unique[i]) {
            numbers[i.toString()] = data;
            count++;
            break;
          }
        }
      } else if (data === '|') isData = true;
    });
    var res = "";
    data = element[element.length-1];
    var goOn = true;
    while (goOn) {
      var search = false;
      var asd = "";
      for (var key in numbers) {
        asd+=key;
      }
      for (var i=0; i<data.length; i++) {
        if (asd.indexOf(data[i]) === -1) {
          search = true;
          break;
        }
      }
      if (search){
        findNumbers(data);
      } else {
        goOn = false;
        for (var i=0; i<data.length; i++) {
          for (var key in numbers) {
            if (numbers[key] === data) res += key;
          }
        }
      }
    }
    console.log(res);
    sum += parseInt(res);
  
  });
  console.log("La prima risposta: " + count);
  console.log("La seconda risposta: " + sum);
});

function findNumbers(data){
  switch(data.length){
    case 6: //0 e 6 e 9
      //il 9 assomiglia al 4
      //lo 0 assomiglia al 1
      //altrmentie e' 6
      var is9 = numbers['9'] === undefined ? true : false;
      if (numbers['4'] === undefined) is9 = false;
      else {
        for (var i=0; i<numbers['4'].length; i++) {
          if (data.indexOf(numbers['4'][i]) === -1) {
            is9 = false;
            break;
          }
        }
      }
      if (!is9) {
        var is0 = numbers['0'] === undefined ? true : false;
        if (numbers['1'] === undefined) is0 = false;
        else {
          for (var i=0; i<numbers['1'].length; i++) {
            if (data.indexOf(numbers['1'][i]) === -1) {
              is0 = false;
              break;
            }
          }
        }
        if(is0) numbers['0'] = data;
        else numbers['6'] = data;
      } else numbers['9'] = data;
      break;
    case 2: //1
      number += "1";
      break;
    case 5: //2 e 3 e 5
      //se contiene i segmenti del 1 allora e' un 3
      var is3 = numbers['3'] === undefined ? true : false;;
      if (numbers['1'] === undefined) is3 = false;
      else {
        for (var i=0; i<numbers['1'].length; i++) {
          if (data.indexOf(numbers['1'][i]) === -1) {
            is3 = false;
            break;
          }
        }
      }
      if (!is3) {
        var miss = 0;
        if(numbers['4'] === undefined) {/*fuck*/}
        else {
          for (var i=0; i<numbers['4'].length; i++) {
            if (data.indexOf(numbers['4'][i]) === -1) {
              miss++;
            }
          }
          if (miss === 1) numbers['5'] = data;
          else numbers['9'] = data;;
        }
      } else number += "3";
      break;

  }
}