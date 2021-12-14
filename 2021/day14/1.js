const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input_test.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');

  var start = input[0];
  var sostitution = new Object();

  for (var i=2; i<input.length; i++) {
    var tmp = input[i].split(" -> ");
    sostitution[tmp[0]] = tmp[1];
  }

  for (var a=0; a<10; a++) {
    for (var i=0; i<start.length; i=i+2) {
      if (sostitution[start.substring(i,i+2)]===undefined) break;
      start = start.substring(0,i+1) + sostitution[start.substring(i,i+2)] + start.substring(i+1,start.length) ;
    }
  }

  console.log("La prima risposta: " + countLetter(start));
//parte 2 nuovo approccio

/*
  var start = input[0];

  var coppie = new Array();
  for (var i=0; i<start.length-1; i=i+2) {
   coppie.push(start.substring(i,i+2)) ;
  }
  console.log(coppie);

  var sostitution = new Object();
  for (var i=2; i<input.length; i++) {
    var tmp = input[i].split(" -> ");
    sostitution[tmp[0]] = [tmp[0][0]+tmp[1], tmp[1]+tmp[0][1]];
  }

  for (var i=0; i<10; i++) {
    var newCoppie = new Array();
    for (var a=0; a<coppie.length; a++) {
      newCoppie.push(sostitution[coppie[a]][0],sostitution[coppie[a]][1]);
    }
    coppie=newCoppie;
  }


  //console.log("La seconda risposta: " + (max-min));


  */
});

function countLetter(str) {
  var letter = new Object();
  for (var i=0; i<str.length; i++){
    if (letter[str[i]] === undefined) letter[str[i]] = 1;
    else letter[str[i]]++;
  }
  var min=null, max=null;
  for (var key in letter) {
    if (letter[key]<min || min === null) min = letter[key];
    if (letter[key]>max || max === null) max = letter[key];
  }
  return(max-min);
}