const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input_test.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  day(data);
});

function day(input) {
  input = input.split('\n');

  var coords = new Object();

  input.forEach(element => {
    element = element.replace(/nw/g,'q');
    element = element.replace(/sw/g,'z');
    element = element.replace(/ne/g,'r');
    element = element.replace(/se/g,'x');
    element = element.split('');
    var x = 0, y = 0;
    element.forEach(element => {
      switch(element) {
        case ('q'): //nw
          x -= 0.5;
          y--;
          break;
        case ('w'):
          x--;
          break;
        case ('z'): //sw
          x -= 0.5;
          y++;
          break;
        case ('x'): //se
          x += 0.5;
          y++;
          break;
        case ('e'):
          x++;
          break;
        case ('r'): //ne
          x += 0.5;
          y--;
          break;
      };
    });
    if (coords[x+':'+y] === undefined) coords[x+':'+y] = 0;
    coords[x+':'+y]++;
  });

  var count = 0;

  //console.log(coords);
  
  for (var key in coords) {
    if (coords[key] % 2 !== 0) count++;
  }

  console.log(count);

}