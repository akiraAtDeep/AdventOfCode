const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  //https://www.reddit.com/r/ItalyInformatica/comments/r98x1j/comment/hnawhw8/?utm_source=share&utm_medium=web2x&context=3
  input = input.replace(/ -> /g, ";");
  input = input.trim().split('\n');
  var points = new Object();
  
  input.forEach(element => {
    element = element.split(";");
    var start = element[0].split(",");
    var end = element[1].split(",");
    if (parseInt(start[0]) === parseInt(end[0]) || parseInt(start[1]) === parseInt(end[1])) {//linee verticali o orizzontali
      if (parseInt(start[0]) < parseInt(end[0])) { //se la x di start e' minore dell'end
        for (var x=parseInt(start[0]); x<=parseInt(end[0]); x++) {
          if (parseInt(start[1]) < parseInt(end[1])) {//se la y di start e' minore dell'end
            for (var y=parseInt(start[1]); y<=parseInt(end[1]); y++) {
              if (points[x+','+y] === undefined) points[x+','+y]=1;
              else points[x+','+y]++;
            }
          } else { //se la y di start e' maggiore dell'end
            for (var y=parseInt(start[1]); y>=parseInt(end[1]); y--) {
              if (points[x+','+y] === undefined) points[x+','+y]=1;
              else points[x+','+y]++;
            }
          }
        }
      } else {//se la x di start e' maggiore dell'end
        for (var x=parseInt(start[0]); x>=parseInt(end[0]); x--) {
          if (parseInt(start[1]) < parseInt(end[1])) {//se la y di start e' minore dell'end
            for (var y=parseInt(start[1]); y<=parseInt(end[1]); y++) {
              if (points[x+','+y] === undefined) points[x+','+y]=1;
              else points[x+','+y]++;
            }
          } else { //se la y di start e' maggiore dell'end
            for (var y=parseInt(start[1]); y>=parseInt(end[1]); y--) {
              if (points[x+','+y] === undefined) points[x+','+y]=1;
              else points[x+','+y]++;
            }
          }
        }
      }
    } 
  });

  var count = 0;
  for (var coord in points) {
    if (points[coord] > 1) count++;
  }

  console.log("prima parte: " + count);

  input.forEach(element => {
    element = element.split(";");
    var start = element[0].split(",");
    var end = element[1].split(",");

    if (parseInt(start[0]) !== parseInt(end[0]) && parseInt(start[1]) !== parseInt(end[1])) {
      var x=parseInt(start[0]),y=parseInt(start[1]);
      if (parseInt(start[0]) < parseInt(end[0])) {
        if (parseInt(start[1]) < parseInt(end[1])) {
          while(x<=parseInt(end[0])){
            if (points[x+','+y] === undefined) points[x+','+y]=1;
            else points[x+','+y]++;
            x++,y++;
          }
        } else {
          while(x<=parseInt(end[0])){
            if (points[x+','+y] === undefined) points[x+','+y]=1;
            else points[x+','+y]++;
            x++,y--;
          }
        } 
      } else {
        if (parseInt(start[1]) < parseInt(end[1])) {
          while(x>=parseInt(end[0])){
            if (points[x+','+y] === undefined) points[x+','+y]=1;
            else points[x+','+y]++;
            x--,y++;
          }
        } else {
          while(x>=parseInt(end[0])){
            if (points[x+','+y] === undefined) points[x+','+y]=1;
            else points[x+','+y]++;
            x--,y--;
          }
        } 
      }
    }
  });

  var count = 0;
  for (var coord in points) {
    if (points[coord] > 1) count++;
  }
  console.log("seconda parte: " + count);

});