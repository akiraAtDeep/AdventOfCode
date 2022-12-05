const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');
  var count = 0;
  var count1 = 0;
  var count2 = 0;
  input.forEach(element => {
    var og = JSON.parse(JSON.stringify(element));
    count += element.length;
    element = element.replace(/^"/,"");
    element = element.replace(/"$/,"");
    element = element.replace(/\\x[0-9a-fA-F]{2}/g,".");
    element = element.replace(/\\\"/g,"\"");
    element = element.replace(/\\\\/g,"\\");
    count1 += element.length;

    og = og.replace(/\\/g,"\\\\");
    og = og.replace(/"/g,"\\\"");
    count2 += og.length+2;
    
  });
  
  console.log(count-count1);
  console.log(count2-count);

});