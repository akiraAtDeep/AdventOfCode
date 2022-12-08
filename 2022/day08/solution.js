const { triggerAsyncId } = require('async_hooks');
const { cpSync } = require('fs');
const { toNamespacedPath, parse } = require('path');
fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.replace(/\r/g,"")
  input = input.trim().split('\n');

  var xLength = 0;
  var field = new Array();
  var maxScore = 0;

  for (var y=1; y<input.length-1; y++) {
    var row = new Array();
    xLength = input[y].length;
    for (var x=1; x<input[y].length-1;x++) {
      var v1=true, v2=true, v3=true, v4 =true;
      var n1=0, n2=0, n3=0, n4=0;
      for (var a=x-1; a>=0; a--) {
        n1++;
        if (parseInt(input[y][x]) <= parseInt(input[y][a])) {
          v1 = false;
          break;
        }
      }
      for (var a=x+1; a<=input[y].length-1; a++) {
        n2++;
        if (parseInt(input[y][x]) <= parseInt(input[y][a])) {
          v2 = false;
          break;
        }
      }
      for (var a=y-1; a>=0; a--) {
        n3++;
        if (parseInt(input[y][x]) <= parseInt(input[a][x])) {
          v3 = false;
          break;
        }
      }
      for (var a=y+1; a<=input.length-1; a++) {
        n4++;
        if (parseInt(input[y][x]) <= parseInt(input[a][x])) {
          v4 = false;
          break;
        }
      }
      row.push(v1 || v2 || v3 || v4);

      var score = n1 * n2 * n3 * n4;
      maxScore = maxScore > score ? maxScore : score;
    }
    field.push(row);
  } 

  var count = xLength*2+(input.length-2)*2;
  //var count =0;

  for (var y=0; y<field.length; y++) {
    for (var x=0; x<field[y].length; x++) {
      if (field[y][x]) count++;
    }
  }
  
  console.log(count);
  console.log(maxScore);


});