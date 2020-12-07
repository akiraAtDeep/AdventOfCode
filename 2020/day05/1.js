fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  day05(data);
});


function day05(input) {
  input = input.split('\n');
  var seats = new Array();
  var maxId = 0;

  input.forEach(element => {
    var y = 0;
    var x = 0;
    var minY = 1;
    var maxY= 128;
    var minX = 1;
    var maxX = 8;
    for (var i=0; i<element.length; i++){
      //console.log(element[i]);
      if (element[i]==='F') {
        maxY = maxY - Math.round((maxY-minY)/2)
      } else if (element[i]==='B') {
        minY = minY + Math.round((maxY-minY)/2)
      } else if (element[i]==='L') {
        maxX = maxX - Math.round((maxX-minX)/2)
      } else if (element[i]==='R') {
        minX = minX + Math.round((maxX-minX)/2)
      }
    }
    seats.push((minY-1)*8+(minX-1));
    maxId = maxId > (minY-1)*8+(minX-1) ? maxId : (minY-1)*8+(minX-1);
  });

  console.log("Parte 1: " + maxId);

  seats.sort(function(a, b){return a-b});
  for (var i=0; i<seats.length-1; i++) {
    if (seats[i]+1 === seats[i+1]-1) {
      console.log("Parte 2: " + (seats[i]+1));
      break;
    }
  }
}
