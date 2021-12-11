const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

var count = 0;
var field = null;
fs.readFile('input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  field = input.trim().split('\n');
  for (var y=0; y<field.length; y++){
    field[y] = field[y].split("");
    for (var x=0; x<field[y].length; x++) {
      field[y][x] = parseInt(field[y][x]);
    }
  }

  //printField(field);

  var find = false;
  var i=0;
  
  while (!find){
    i++;
    //console.log(Array("generazione",i));
    var alreadyFlash = new Array();
    for (var y=0; y<field.length; y++){
      for (var x=0; x<field[y].length; x++) {
        if (alreadyFlash.indexOf(x+"-"+y) === -1) {
          field[y][x]++;
          if (field[y][x] > 9) {
            alreadyFlash = flash(x,y,alreadyFlash);
          }
        }
      }
    }
    var onNow = 0;
    alreadyFlash.forEach(element => {
      var coord = element.split("-");
      field[coord[1]][coord[0]] = 0;
      onNow++;
    });
    
  //printField(field);
  //console.log("-----");

    if (i===100) console.log("La prima risposta: " + count);
    if (onNow === 100) {
      find = true;
      console.log("La seconda risposta: " + i);
    }
  }

 
});

function printField(input) {
  for (var y=0; y<input.length; y++) {
    var row = "";
    for (var x=0; x<input[y].length; x++) {
      if (input[y][x] === 0) row+="*";
      else row+=input[y][x];
    }
    console.log(row);
  }
}

function flash(x,y,alreadyFlash) {
  if (alreadyFlash.indexOf(x+"-"+y) === -1) {
    alreadyFlash.push(x+"-"+y);
    count++;
    
    //ciclo tutte le celle adiacenti, e se superano 9, richiamo flash su di loro
    for (var a=y-1; a<=y+1; a++) {
      for (var b=x-1;b<=x+1; b++) {
        if (a>-1 && a<field.length && b>-1 && b<field[a].length) {
          if(b!==x || a!==y) { //guardo di non passare sopra alla cella che e' gia' flashata
            field[a][b]++;
            if (field[a][b] > 9) {
              alreadyFlash = flash(b,a,alreadyFlash);
            }
          }    
        }
      }
    }
  }
  return alreadyFlash;
}