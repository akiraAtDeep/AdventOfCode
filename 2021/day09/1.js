const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input_test.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');

  var lower = new Object();
  for (var y=0; y<input.length;y++) {
    for (var x=0; x<input[y].length; x++){
      if (y===0) { //prima riga
        if (x===0) { //prima colonna
          if (parseInt(input[y][x]) < parseInt(input[y][x+1]) && parseInt(input[y][x]) < parseInt(input[y+1][x])) lower[x+'-'+y] = parseInt(input[y][x]);
        } else if(x === input[y].length -1) { //ultima colonna
          if (parseInt(input[y][x]) < parseInt(input[y][x-1]) && parseInt(input[y][x]) < parseInt(input[y+1][x])) lower[x+'-'+y] = parseInt(input[y][x]);
        } else { //in centro
          if (parseInt(input[y][x]) < parseInt(input[y][x+1]) && parseInt(input[y][x]) < parseInt(input[y][x-1]) && parseInt(input[y][x]) < parseInt(input[y+1][x])) lower[x+'-'+y] = parseInt(input[y][x]);
        }
      } else if (y === input.length-1) { //ultima riga
        if (x===0) { //prima colonna
          if (parseInt(input[y][x]) < parseInt(input[y][x+1]) && parseInt(input[y][x]) < parseInt(input[y-1][x])) lower[x+'-'+y] = parseInt(input[y][x]);
        } else if(x === input[y].length -1) { //ultima colonna
          if (parseInt(input[y][x]) < parseInt(input[y][x-1]) && parseInt(input[y][x]) < parseInt(input[y-1][x])) lower[x+'-'+y] = parseInt(input[y][x]);
        } else { //in centro
          if (parseInt(input[y][x]) < parseInt(input[y][x+1]) && parseInt(input[y][x]) < parseInt(input[y][x-1]) && parseInt(input[y][x]) < parseInt(input[y-1][x])) lower[x+'-'+y] = parseInt(input[y][x]);
        }
      } else { //in mezzo
        if (x===0) { //prima colonna
          if (parseInt(input[y][x]) < parseInt(input[y][x+1]) && parseInt(input[y][x]) < parseInt(input[y+1][x]) && parseInt(input[y][x]) < parseInt(input[y-1][x])) lower[x+'-'+y] = parseInt(input[y][x]);
        } else if(x === input[y].length -1) { //ultima colonna
          if (parseInt(input[y][x]) < parseInt(input[y][x-1]) && parseInt(input[y][x]) < parseInt(input[y+1][x]) && parseInt(input[y][x]) < parseInt(input[y-1][x])) lower[x+'-'+y] = parseInt(input[y][x]);
        } else { //in centro
          if (parseInt(input[y][x]) < parseInt(input[y][x+1]) && parseInt(input[y][x]) < parseInt(input[y][x-1]) && parseInt(input[y][x]) < parseInt(input[y-1][x]) && parseInt(input[y][x]) < parseInt(input[y+1][x])) lower[x+'-'+y] = parseInt(input[y][x]);
        }
      }
    }
  }

  var basins = new Array();
  var risk = 0;
  for (var key in lower) {
    risk += lower[key]+1;
  }

  console.log("La prima risposta: " + risk);
  //console.log("La seconda risposta: " + count2);
});