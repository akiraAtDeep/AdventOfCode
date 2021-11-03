const { resourceUsage } = require('process');
const { arrayBuffer } = require('stream/consumers');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  day19(data);
});

function day19(input) {
  input = input.split('\n');

  var start = "", rules = new Array(), results = new Array();

  input.forEach(element => {
    if (/=>/.test(element)) rules.push(element.split(' => '));
    else if (element !== '') start = element;
  });

  rules.forEach(regola => {
    var re = new RegExp(regola[0], 'g');
    while (match = re.exec(start)) {
      var before = match.index > 0 ? start.substr(0, match.index) : "";
      var after = re.lastIndex <= start.length -1  ? start.substr(re.lastIndex , start.length - re.lastIndex) : "";
      var result = before + regola[1] + after;
      var insert = true;
      for (var a = 0; a < results.length; a++) {
        if (results[a] === result) {
          insert = false;
          break;
        }
      }
      if (insert) results.push(result);
    }
  });

  console.log(results.length);
}