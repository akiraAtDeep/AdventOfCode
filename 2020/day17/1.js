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
  var field = new Object();
  field[0] = new Object();
  field[-1] = new Object();
  field[1] = new Object();

  var maxY=0;
  var maxX=0;
  for (var y=0; y<input.length; y++) {
    maxY = maxY > y ? maxY : y;
    if (field[0][y] === undefined) field[0][y] = new Object();
    for (var x=0; x<input[y].length; x++) {
      maxX = maxX > x ? maxX : x;
      if (input[y][x] === '#') field[0][y][x] = true;
      else field[0][y][x] = false;
    }
  }


  for (var y=0; y<=maxY; y++) {
    field[-1][y] = new Object();
    field[1][y] = new Object();
    for (var x=0; x<=maxX; x++) {
      field[-1][y][x] = false;
      field[1][y][x] = false;
    }
  }


  for (var cycle=0; cycle<1; cycle++){
    var fieldCopy = JSON.parse(JSON.stringify(field));
    for (var z in field) {
      for (var y in field[z]) {
        for (var x in field[z][y]) {
          var vicini = getVicini(z,y,x);
          if (field[z][y][x]){
            if (vicini<2 || vicini>3) fieldCopy[z][y][x] = false;
          } else {
            if (vicini===3) fieldCopy[z][y][x] = true;
          }
        }
      }
    }
    field = JSON.parse(JSON.stringify(fieldCopy));
  }
  
  var count = 0;
  for (var z in field) {
    console.log(z);
    var a = '';
    for (var y in field[z]) {
      var b = '';
      for (var x in field[z][y]) {
        if (field[z][y][x]) {
          b+='#';
          count++;
        } else b+='.';
      }
      a+=b+'\n';
    }
    console.log(a);
  }

  console.log(count);

  function getVicini(z,y,x) {
    var vicini = 0;
    for (var a=z-1; a<=z+1; a++) {
      if (field[a] !== undefined) {
        for (var b=y-1; b<=y+1; b++) {
          if (field[a][b] !== undefined) {
            for (var c=x-1; c<=x+1; c++) {
              if (field[a][b][c] !== undefined) {
                if (a!==z || b!==y || c!==x) {
                  if (field[a][b][c]) vicini++;
                }
              }
            }
          }
        }
      }
    }
    

    console.log(z + ':' + y + ':' + x + '=' + vicini);
    return vicini;
  }

}