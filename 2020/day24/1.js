const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');
  var coords = new Object();

  input.forEach(element => {
    var q = 0, r = 0;
    for (var i = 0; i < element.length; i++){
      switch(element[i]) {
        case('n'):
          if (element[i+1] === 'w') r--;
          else if (element[i+1] === 'e') r--, q++;
          i++;
          break;
        case('s'):
          if (element[i+1] === 'w') q--, r++;
          else if (element[i+1] === 'e') r++;
          i++;
          break;
        case ('w'):
          q--;
          break;
        case ('e'):
          q++;
          break;
      };
    };
    if (coords[q+'.'+r] === undefined) coords[q+'.'+r] = 0;
    coords[q+'.'+r]++;
  });

  var count = 0;
  for (var key in coords) {
    if (coords[key] % 2 !== 0) count++;
  }

  console.log(count);
});