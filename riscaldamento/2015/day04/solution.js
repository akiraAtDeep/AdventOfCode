const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');
const crypto = require('crypto')

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  //input = input.trim().split('\n');
  var seed = 0;
  var first = false;
  var second = false;
  while(!first || !second) {
    let hash = crypto.createHash('md5').update(input+seed.toString()).digest("hex");
    if (!first) {
      if (hash.slice(0, 5) === "00000") {
        first = true;
        console.log('primo '+seed);
      }
    }

    if (!second) {
      if (hash.slice(0, 6) === "00000") {
        second = true;
        console.log('secondo '+seed);
      }
    }
    seed++;
  }
});