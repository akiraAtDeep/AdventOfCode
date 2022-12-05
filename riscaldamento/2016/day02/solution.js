const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');
  var x=0, y=0, code = "";
  var matrix = [
    [1,2,3],
    [4,5,6],
    [7,8,9]];
  run();
  console.log(code);
    
  x=0, y=2, code = "";
  matrix = [
    [undefined, undefined, 1, undefined, undefined],
    [undefined, 2, 3, 4, undefined],
    [5,6,7,8,9],
    [undefined, "A", "B", "C", undefined],
    [undefined, undefined, "D", undefined, undefined]];
 
  run();
  console.log(code);

  function run() {
    input.forEach(row => {
      row = row.split('');
      row.forEach(element => {
        switch(element) {
          case 'U':
            if (matrix[y-1] !== undefined) {
              y = matrix[y-1][x] !== undefined ? y-1 : y;
            }
            break;
          case 'R':
            if (matrix[y][x+1]) {
              x = matrix[y][x+1] !== undefined ? x+1 : x;
            }
            break;
          case 'D':
            if (matrix[y+1] !== undefined) {
              y = matrix[y+1][x] !== undefined ? y+1 : y;
            } 
            break;
          case 'L':
            if (matrix[y][x-1] !== undefined) {
              x = matrix[y][x-1] !== undefined ? x-1 : x;
            }
            break;
        }
      });
      code += matrix[y][x];
    });
  }
});