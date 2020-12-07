fs = require('fs')

fs.readFile('day04/input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});
