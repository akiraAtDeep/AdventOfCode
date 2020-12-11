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

  var tmp = new Array();
  for (var i=0; i<input.length; i++) {
    tmp.push(input[i].split(''));
  }

  input = JSON.parse(JSON.stringify(tmp));
  var prev = 0;
  var goOn = true;
  while(goOn) {
    var asd = next();
    if (prev === asd) {
      goOn = false;
    }
    prev = asd;
  }

  console.log('parte 1 ' + prev);


  input = JSON.parse(JSON.stringify(tmp));
  var prev = 0;
  var goOn = true;


  while(goOn) {
  //for (var a=0; a<10; a++) {
    //print();
    var tmp = next2();
    if (prev === tmp) {
      goOn = false;
    }
    prev = tmp;
  }

  console.log('parte 2 ' + prev);


  function print() {
    input.forEach(element => {
      console.log(element.join(''));
    });
    console.log('-----------')
  }

  function next(){
    var field = JSON.parse(JSON.stringify(input));
    var people = 0;
    for (var y=0; y<input.length; y++) {
      for (var x=0; x<input[y].length; x++) {
        if (input[y][x] !== '.'){
          var neighbors=0;
          if (input[y-1] !== undefined) {
            if (input[y-1][x-1] !== undefined) if (input[y-1][x-1] === '#') neighbors++;
            if (input[y-1][x] !== undefined) if (input[y-1][x] === '#') neighbors++;
            if (input[y-1][x+1] !== undefined) if (input[y-1][x+1] === '#') neighbors++;
          }
          if (input[y][x-1] !== undefined) if (input[y][x-1] === '#') neighbors++;
          if (input[y][x+1] !== undefined) if (input[y][x+1] === '#') neighbors++;
          if (input[y+1] !== undefined) {
            if (input[y+1][x-1] !== undefined) if (input[y+1][x-1] === '#') neighbors++;
            if (input[y+1][x] !== undefined) if (input[y+1][x] === '#') neighbors++;
            if (input[y+1][x+1] !== undefined) if (input[y+1][x+1] === '#') neighbors++;
          }
          if (input[y][x] === 'L') {
            if (neighbors === 0) {
              field[y][x] = '#';
              people++;
            }
          } else if (input[y][x] === '#') {
            if (neighbors >= 4) field[y][x] = 'L';
            else people++;
          }
        }
      }
    }
    input = JSON.parse(JSON.stringify(field));
    return people;
  }

  function next2(){
    var field = JSON.parse(JSON.stringify(input));
    var people = 0;
    for (var y=0; y<input.length; y++) {
      for (var x=0; x<input[y].length; x++) {
        if (input[y][x] !== '.') {
          var neighbors=0;
          //n
            for(var i=y-1; y-1>=0; i--) {
              if (input[i] === undefined) break;
              if (input[i][x] === undefined) break;
              if (input[i][x] === '#') {
                neighbors++;
                break;
              } else if (input[i][x] === 'L') break;
            }
          //ne
          
            for(var i=1; y-i<input.length; i++) {
              if (input[y-i] === undefined) break;
              if (input[y-i][x+1] === undefined) break;
              if (input[y-i][x+i] === '#') {
                neighbors++;
                break;
              } else if (input[y-i][x+i] === 'L') break;
            }
            
          //e
          for(var i=x+1; i<input[y].length; i++) {
            if (input[y] === undefined) break; 
            if (input[y][i] === undefined) break; 
            if (input[y][i] === '#') {
              neighbors++;
              break;
            } else if (input[y][i] === 'L') break;
          }
          //se
          
          for(var i=1; i<input.length; i++) {
            if (input[y+i] === undefined) break;
            if (input[y+i][x+i] === undefined) break;
            if (input[y+i][x+i] === '#') {
              neighbors++;
              break;
            } else if (input[y+i][x+i] === 'L') break;
          }
          
          //s
          for(var i=y+1; y+1<input.length; i++) {
            if (input[i] === undefined) break; 
            if (input[i][x] === undefined) break; 
            if (input[i][x] === '#') {
              neighbors++;
              break;
            } else if (input[i][x] === 'L') break;
          }
          //sw
          
          for(var i=1; i<input.length; i++) {
            if (input[y+i] === undefined) break;
            if (input[y+i][x-i] === undefined) break; 
            if (input[y+i][x-i] === undefined) break;
            if (input[y+i][x-i] === '#') {
              neighbors++;
              break;
            } else if (input[y+i][x-i] === 'L') break;
          }
          
          //w
          for(var i=x-1; x-1>=0; i--) {
            if (input[y] === undefined) break;
            if (input[y][i] === undefined) break;  
            if (input[y][i] === '#') {
              neighbors++;
              break;
            } else if (input[y][i] === 'L') break;
          }
          //nw
          
          for(var i=1; i<input.length; i++) {
            if (input[y-i] === undefined) break;
            if (input[y-i][x-i] === undefined) break;
            if (input[y-i][x-i] === '#') {
              neighbors++;
              break;
            } else if (input[y-i][x-i] === 'L') break;
          }
          
          if (input[y][x] === 'L') {
            if (neighbors === 0) {
              field[y][x] = '#';
              people++;
            }
          } else if (input[y][x] === '#') {
            if (neighbors >= 5) field[y][x] = 'L';
            else people++;
          }
        }
      }
    }
    input = JSON.parse(JSON.stringify(field));
    return people;
  }

}
