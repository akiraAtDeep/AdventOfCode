const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }

  //input = '5 10 25';
  input = input.replace(/\ {1,}/g," ");
  input = input.trim();
  input = input.split('\n');
  var count = 0;

  input.forEach(element => {
    element = element.split(" ");
    element.splice(0,1);
    if (validateTriangle(element)) count++;
  });

  console.log(count);


  function validateTriangle(triangle) {
    var valid = true;
    for (var a=0; a<triangle.length; a++) {
      for (var b=a+1; b<triangle.length; b++) {
        if (valid) {}
        for (var c=0; c<triangle.length; c++) {
          if (c!==a && c!==b) {
            if (parseInt(triangle[a])+parseInt(triangle[b]) < parseInt(triangle[c])) {
              valid = false;
              break;
            } 
          } 
        } 
      }
    }

    return valid;
  }

  

  count = 0;
  for (var i=0; i<3; i++) {
    var triangle = new Array();
    for (var a=0; a<input.length; a++) {
      if (triangle.length < 3) {
        var row = input[a].split(" ");
        row.splice(0,1);
        //console.log(row)
        triangle.push(parseInt(row[i]));
      } 

      if (triangle.length === 3) {
        if (validateTriangle(triangle)) count++;
        triangle = new Array();
      }
    }
  }

  console.log(count);

});