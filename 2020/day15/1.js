const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  day(data);
});

function day(input) {
  input = input.split(',');


  var asd = new Object();
  for (var i=0; i<input.length; i++) {
    input[i] = parseInt(input[i]);
    if (i < input.length-1) asd[parseInt(input[i])] = i;
  }

  var target = 30000000;
  for (var i=input.length-1; i<target-1; i++) {
    if(asd[input[i]] !== undefined) {
      input.push((i+1)-(asd[input[i]]+1));
    } else {
      input.push(0);
    }
    asd[input[i]] = i;

    if (i%((target/100)*5)===0) console.log((i/(target/100)) + '%');
  }

  console.log(input[input.length-1]);

}