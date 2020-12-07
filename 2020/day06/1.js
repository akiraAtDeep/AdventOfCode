const { toNamespacedPath } = require('path');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  day06(data);
});


function day06(input) {
  input = input.split('\n');

  var tmp = new Array();
  var tmp2 = new Array;
  var groups = new Array;
  var count = 0;
  var count2 = 0;


  for (var b=0; b<input.length+1; b++) {
    
    if (input[b] === '' || b === input.length){
      count += tmp.length;
      tmp = new Array();
      groups.push(tmp2);
      tmp2 = new Array();
    } else {
      if (input[b] !== undefined) tmp2.push(input[b]);
      for (var a=0; a<input[b].length; a++) {
        var find = false;
        for (var i=0; i<tmp.length; i++) {
          if (input[b][a] === tmp[i]) {
            find = true;
            break;
          }
        }
        if (!find) tmp.push(input[b][a]);
      }
    }
  }
  console.log("Parte 1: " + count);

  groups.forEach(element => {
    if (element[0] !== undefined) {
      var tmp= element[0].split('');

      for (var i=1; i<element.length; i++) {
        var tmp2 = new Array();
        for (var a=0; a<element[i].length; a++) {
          for (var b=0; b<tmp.length; b++) {
            if (element[i][a] === tmp[b]) {
              tmp2.push(tmp[b]);
              break
            }
          }
        }
        tmp = tmp2;
      }
      count2 += tmp.length;
    } 
  });

  console.log("Parte 2: " + count2);
}
