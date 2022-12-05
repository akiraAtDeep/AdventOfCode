const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');

  let ban = ['ab', 'cd', 'pq', 'xy'];
  let vowels = ['a','e','i','o','u'];

  var nice = 0;
  input.forEach(string => {
    var nVowles = 0;
    for (var i=0; i<string.length; i++) {
      if (vowels.indexOf(string[i]) !== -1) {
        nVowles++;
      }
    }
    if (nVowles >= 3) {
      var duplicates = false;
      for (var i=0; i<string.length-1; i++) {
        if (string[i] === string[i+1]) {
          duplicates = true;
          break;
        }
      }
      if (duplicates) {
        var isBan = false;
        for (var i=0; i<ban.length; i++){
          if (RegExp(ban[i]).test(string)) {
            isBan = true;
            break;
          }
        }
        if (!isBan) nice++
      }
    }
  });
  console.log(nice);


  nice = 0;
  input.forEach(string => {
    var duplicates = false;
    for (var i=0; i<string.length; i++) {
      for (var a=i+2; a<string.length; a++) {
        if (string.slice(i,i+2) === string.slice(a,a+2)) {
          duplicates = true;
        }
      }
      if (duplicates) break;
    }

    if (duplicates) {
      for (var i=0; i<string.length; i++) {
        if (string[i] === string[i+2]) {
          nice++;
          break;
        }
      }
    }
  });

  console.log(nice);

});