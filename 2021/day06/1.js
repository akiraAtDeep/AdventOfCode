const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  
  input = input.trim().split(',');
  var orig_input = JSON.parse(JSON.stringify(input));
  for (var i=0; i<input.length; i++) input[i] = parseInt(input[i]);

  //console.log(input.join());

  for (var gen=0; gen<80; gen++){
    var toAdd = 0;
    for (var i=0; i<input.length; i++) {
      input[i]--;
      if (input[i] === -1) {
        input[i] = 6;
        toAdd++;
      }
    }

    for (var i=0; i<toAdd; i++) input.push(8);
    toAdd = 0;
  }
  console.log("La prima risposta: " + input.length);
//seconda parte
  input = orig_input;
  var generations = {};

  for (var i=0; i<input.length; i++) {
    if (generations[input[i]] === undefined) generations[input[i]] = 1;
    else generations[input[i]]++;
  }
/*
  var asd = new Array();
  for (var i=0; i<=8; i++) {
    asd.push((generations[i.toString()] !== undefined ? generations[i.toString()] : 0 ));
  }

  console.log(asd.join());
  */
  for (var a=0; a< 256; a++) {
    var nextGen = {};
    for (var i=8; i>=0; i--) {
      var next = i-1 >= 0 ? i-1 : 6;
      var nextVal = generations[i.toString()] !== undefined ? generations[i.toString()] : 0;
      if (next===6) {
        if (nextGen['6'] === undefined) nextGen['6'] = generations[i.toString()];
        else nextGen['6'] += generations[i.toString()];
      } else nextGen[next.toString()] = nextVal;
    }
    if (generations['0'] !== undefined) {

        if (nextGen['8'] === undefined) nextGen['8'] = generations['0'];
        else nextGen['8'] += generations['0'];
      
    }
    generations = nextGen;
    /*
    var asd = new Array();
    for (var i=0; i<=8; i++) {
      asd.push((generations[i.toString()] !== undefined ? generations[i.toString()] : 0 ));
    }
    console.log(asd.join());
    */
  }
  var count =0;
  for (var key in generations) {
    count += generations[key];
  }
  console.log("La seconda risposta: " + count);
});