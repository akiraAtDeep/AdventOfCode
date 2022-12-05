const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  //input = input.trim().split('\n');

  while (!testPassword(input)) {
    input = nextPassword(input);
  }
  console.log(input);

  input = nextPassword(input);
  while (!testPassword(input)) {
    input = nextPassword(input);
  }
  console.log(input);

  function nextPassword(pass){
    return stepChar(pass, pass.length-1)
  }

  function stepChar(string, index){
    var char = string.charCodeAt(index);
    if (char < 122) {
      string = string.slice(0,index) + String.fromCharCode(++char) + string.slice(index+1,string.length);
    } else {
      string = string.slice(0,index) + "a" + string.slice(index+1,string.length);
      string = stepChar(string,index-1);
    }
    return string;
  }

  function testPassword(pass) {
    var ret = false;
    var first = false;
    for (var i=0; i<pass.length; i++) {
      if(pass.charCodeAt(i)+1 === pass.charCodeAt(i+1) && pass.charCodeAt(i+1)+1 === pass.charCodeAt(i+2)) {
        first = true;
        break;
      }
    }

    if (first) {
      if (!/[iol]/.test(pass)) {
        var pairs = [];
        for (var i=0; i<pass.length; i++) {
          if(pass[i] === pass[i+1]) {
            if (pairs.indexOf(i) === -1) {
              pairs.push(i);
              pairs.push(i+1);
            }
          }
        }
        if (pairs.length >= 4) ret =true;
      }
    }
    return ret;
  }
  

});