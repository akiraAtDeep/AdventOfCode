const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');

  var doubles =  new Array();
  input.forEach(element => {
    var first = "";
    var second = "";
    for (var i=0; i<element.length; i++){
      if (i<element.length/2) first += element[i]
      else second += element[i];
    }
    for (var i=0; i<second.length; i++) {
      var a =  new RegExp(second[i]);
      if (a.test(first)) {
        doubles.push(second[i]);
        break;
      }
    }
  });

  var count = 0;
  doubles.forEach(element => {
    if (element.charCodeAt(0)-96 > 0) count += element.charCodeAt(0)-96
    else count += element.charCodeAt(0)-38
  });
  console.log(count);

  var groups = new Array();
  var badges = new Array();
  var tmp = new Array();

  input.forEach(element => {
    tmp.push(element);
    if (tmp.length===3) {
      groups.push(tmp);
      tmp = new Array();
    }
  });

  groups.forEach(group => {
    for (var i=0; i<group[0].length; i++) {
      var reg = new RegExp(group[0][i]);
      if(reg.test(group[1]) && reg.test(group[2])) {
        badges.push(group[0][i]);
        break;
      }
    }
  });
  
  count = 0;
  badges.forEach(element => {
    if (element.charCodeAt(0)-96 > 0) count += element.charCodeAt(0)-96
    else count += element.charCodeAt(0)-38
  });
  console.log(count);

});