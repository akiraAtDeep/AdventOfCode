const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.split('\n');

  var isMove = false;
  var moves =  new Array();
  var towers = new Array();

  input.forEach(element => {
    if(isMove) {
      element = element.split(" ");
      moves.push(element);
    } else {
      if (element === "") {
        isMove = true;
      } else {
        for (var i=0; i<element.length; i = i+4) {
          var crate = element.slice(i,i+4);
          if ((/\[[A-Z]\]/).test(crate)) {
            if (towers[i/4]===undefined) {
              towers[i/4] = new Array();
            }
            towers[i/4].push(crate.replace(/[\[\]]/g,""));
          }
        }
      }
    }
  });

  var copyTowers = JSON.parse(JSON.stringify(towers));
  console.log(doTheJob(towers,false));
  var towers = JSON.parse(JSON.stringify(copyTowers));
  console.log(doTheJob(towers,true));

  function doTheJob(towers, stack) {
    moves.forEach(move => {
      if (move !== "") {
        var toMove = new Array();
        for (var i=0; i<parseInt(move[1]); i++){
          toMove.push(towers[parseInt(move[3]-1)][i]);
        }
        if (toMove.length > 0) {
          towers[parseInt(move[3])-1].splice(0,parseInt(move[1]));
          if (stack) {
            for (var i=toMove.length-1; i>=0; i--) {
              towers[parseInt(move[5])-1].splice(0,0,toMove[i]);
            }
          } else {
            for (var i=0; i<toMove.length; i++) {
              towers[parseInt(move[5])-1].splice(0,0,toMove[i]);
            }
          }
        }
      }
    });

    var res = "";
    towers.forEach(element => {
      res += element[0];
    });
    return (res.replace(/ /g, ""));
  }
  
});