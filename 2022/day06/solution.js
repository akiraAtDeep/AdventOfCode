const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  //input = input.trim().split('\n');
  var start ,startmsg ;

  for (var i=0; i<input.length-3; i++) {
    if (start === undefined) {
      var sfound = testString(i,4);
      if (sfound) {
        start = i+4;
      }
    }
    if (startmsg === undefined) {
      var mfound = testString(i,14);
      if (mfound) {
        startmsg = i+14;
      }
    }
  }

  console.log(start);
  console.log(startmsg);

  function testString(index,n) {
    var test = input.slice(index,index+n);
    var found = true;
    for (var a=0; a<test.length-1; a++) {
      for (var b=a+1; b<test.length; b++) {
        if (test[a]===test[b]) {
          found = false;
          break;
        }
      }
    }
    return found;
  }
  

});