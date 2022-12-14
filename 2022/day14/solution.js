const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.replace(/\r/g,"");
  input = input.trim().split('\n');

  var lines = new Array();
  var maxX, minX, maxY, field;

  input.forEach(element => {
    element = element.replace(/ -> /g,"@");
    element = element.split("@");
    var line = new Array;
    element.forEach(point => {
      point = point.split(",");
      if (maxX === undefined) maxX = parseInt(point[0]);
      else maxX = maxX > parseInt(point[0]) ? maxX : parseInt(point[0]);
      if (minX === undefined) minX = parseInt(point[0]);
      else minX = minX < parseInt(point[0]) ? minX : parseInt(point[0]);
      if (maxY === undefined) maxY = parseInt(point[1]);
      else maxY = maxY > parseInt(point[1]) ? maxY : parseInt(point[1]);
      line.push(point);
    });
    lines.push(line);
  });
 
  
  doIt(false);
  doIt(true);

  function init(fill) {
    field = new Array();
    for (var y=0; y<=(fill ? maxY+2 : maxY); y++) {
      var row = new Array();
      for (var x=0; x<=maxX-minX; x++) {
        if (fill && y===maxY+2) {
          row.push("#");
        } else row.push(".");
      }
      field.push(row);
    }
    lines.forEach(line => {
      for (var i=0; i<line.length-1; i++) {
        minXline = parseInt(line[i][0]) < parseInt(line[i+1][0]) ? parseInt(line[i][0]) : parseInt(line[i+1][0]);
        maxXline = parseInt(line[i][0]) > parseInt(line[i+1][0]) ? parseInt(line[i][0]) : parseInt(line[i+1][0]);
        minYline = parseInt(line[i][1]) < parseInt(line[i+1][1]) ? parseInt(line[i][1]) : parseInt(line[i+1][1]);
        maxYline = parseInt(line[i][1]) > parseInt(line[i+1][1]) ? parseInt(line[i][1]) : parseInt(line[i+1][1]);
        for (var x=minXline - minX; x<=maxXline -minX;x++) {
          for (var y=minYline; y<=maxYline; y++){
            field[y][x] = "#";
          } 
        }
      }
    });
  }

  function resize() {
    for (var i=0; i<field.length; i++) {
      field[i].splice(0, 0, (i===field.length-1 ? "#" : "."));
      field[i].push((i===field.length-1 ? "#" : "."));
    }
    minX--, maxX++;
  }

  function doIt (fill) {
    init(fill);
    var flood = false;  
    while(!flood) {
      var dropX = 500-minX, dropY = 0;
      var stop = false;
      var drop = false;
      var count = 0;
      while (!stop) {
        //print();
        if (!fill) {
          if (field[dropY+1][dropX-1] === undefined || 
            field[dropY+1][dropX+1] === undefined || 
            field[dropY+1] === undefined) {
            flood = true, stop = true;
          }
        } else {
          if (dropX === 0 || dropX === field[dropY].length-1) {
           resize();
           dropX++;
          }
        }

        if (field[dropY+1][dropX] === ".") dropY++;
        else {
          if (field[dropY+1][dropX-1] === ".") {
            dropY++,dropX--;
          } else if (field[dropY+1][dropX+1] === "."){
            dropY++,dropX++;
          } else {
            field[dropY][dropX] = "o";
            if (dropY === 0 && fill) {
              flood = true, stop = true;
            }
            var drop = true;
            count++;
          }
          if (drop) {
            drop = false;
            dropX = 500-minX, dropY = 0;
          } 
        }
      }
    }
    console.log(fill ? count : count-1);
    //print()
  } 

  function print() {
    var res  = "";
    field.forEach(row => {
      res += row.join("") + "\n";
    });
    console.log(res);
  }
  

});