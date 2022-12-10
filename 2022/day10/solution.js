const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.replace(/\r/g,"");
  input = input.trim().split('\n');
  
  var counter = 0, wait = false, x = 1, signals = 0;
  var intervals = [20,60,100,140,180,220];

  var display = new Array();
  for (var i=0; i<6; i++) {
    var row = new Array();
    for (var a=0; a<40; a++) {
      row.push(".");
    } 
    display.push(row);
  }
  var i = 1;
  //for (var i=1; i<=220; i++) {
  while (counter<input.length) {
    if (intervals.indexOf(i) !== -1) {
      signals += i * x;
    }
    py = 0, px = 0;

    for (var a=0; a<i-1; a++) {
      if (px+1 === 40){
        px = 0;
        py++;
      } else px++;
    }
    if (x-1 === px || x === px || x+1 === px) {
      display[py][px] = "#";
    } 

    if (wait) {
      wait = false;
      var parameter = input[counter].split(" ");
      x += parseInt(parameter[1]);
      counter++;
    } else {
      if (input[counter] === "noop") {
        counter++;
      }
      else {
        wait = true;
      }
    }
    i++;
  }
  console.log(signals);
  print();


  function print () {
    var view = "";
    display.forEach(row => {
      view += row.join("") + "\n";
    });
    console.log(view);
  }
});