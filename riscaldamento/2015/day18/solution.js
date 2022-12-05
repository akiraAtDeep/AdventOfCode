const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');

  var field = new Array;
  inizialize();
  loop(true);
  field = new Array;
  inizialize();
  loop(false);

  function inizialize(){
    input.forEach(element => {
      element = element.split("");
      var row = new Array();
      element.forEach(light => {
        if(light === '#') row.push(true);
        else row.push(false);
      });
      field.push(row);
    });
  } 

  function loop(first){
    for (var i = 0; i<100; i++) {
      var newField = JSON.parse(JSON.stringify(field));
      if (!first){ 
        field[0][0] = true;
        field[0][field[0].length-1] = true;
        field[field.length-1][0] = true;
        field[field.length-1][field[0].length-1] = true;
      }
      for (var y=0; y<field.length; y++) {
        for (var x=0; x<field[y].length; x++) {
          var neighbour;
          if (y===0) {
            if (x===0) {
              neighbour = [[x+1,y],[x+1,y+1],[x,y+1]]; 
            } else if (x === field[y].length-1) {
              neighbour = [[x-1,y],[x-1,y+1],[x,y+1]]; 
            } else {
              neighbour = [[x-1,y],[x+1,y],[x-1,y+1],[x,y+1],[x+1,y+1]]; 
            } 
          } else if (y === field.length-1) {
            if (x===0) {
              neighbour = [[x+1,y],[x+1,y-1],[x,y-1]]; 
            } else if (x ===field[y].length-1) {
              neighbour = [[x-1,y],[x-1,y-1],[x,y-1]]; 
            } else {
              neighbour = [[x-1,y],[x+1,y],[x-1,y-1],[x,y-1],[x+1,y-1]]; 
            } 
          } else {
            if (x===0) {
              neighbour = [[x,y-1],[x+1,y-1],[x+1,y],[x,y+1],[x+1,y+1]]; 
            } else if (x === field[y].length-1) {
              neighbour = [[x,y-1],[x-1,y-1],[x-1,y],[x,y+1],[x-1,y+1]];
            } else {
              neighbour = [[x-1,y-1],[x,y-1],[x+1,y-1],[x-1,y],[x+1,y],[x-1,y+1],[x,y+1],[x+1,y+1]];
            }
          } 

          var on = 0;
          if (neighbour !== undefined){ 
            neighbour.forEach(element => {
              if (field[element[1]] !== undefined){
                if (field[element[1]][element[0]]) on++;
              }
            });
          }

          if (field[y][x]) {
            if (on < 2 || on > 3) {
              newField[y][x] = false;
            } 
          } else if (on === 3) {
            newField[y][x] = true;
          }
          
        }
      }
      field = JSON.parse(JSON.stringify(newField));

      if (!first){ 
        field[0][0] = true;
        field[0][field[0].length-1] = true;
        field[field.length-1][0] = true;
        field[field.length-1][field[0].length-1] = true;
      }
      //console.log(i);
      //print(field)
    } 

    var count = 0;
    for (var y=0; y<field.length; y++) {
      for (var x=0; x<field[y].length; x++) {
        if (field[y][x]) count++;
      }
    }
    console.log(count);
  } 

  function print(field){
    var lol = '';
    for (var y=0; y<field.length; y++) {
      var row = '';
      for (var x=0; x<field[y].length; x++) {
        if (field[y][x]) row += '#';
        else row += '.';
      }
      lol += row + "\n";
    }
    console.log(lol+"\n"+"--------------------"+"\n");
  } 

});