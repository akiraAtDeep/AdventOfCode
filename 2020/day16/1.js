const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  day(data);
});

function day(input) {
  input = input.split('\n');

  var isRule = true;
  var isYourTkt = false;
  var isOthsTkt = false;
  var rules = new Array();

  var youTkt = '';
  var validTkt = new Array();

  var errors = 0;

  input.forEach(element => {
    if (element === '') isRule = false, isYourTkt = false, isOthsTkt = false;
    else {
      if (isRule) {
        var tmp = element.replace(/ /g, '');
        var asd = tmp.split(':');
        asd[1] = asd[1].replace('or', ',');
        asd[1] = asd[1].split(',');
        var rule = new Array();
        asd[1].forEach(element => {
          var tmp = element.split('-');
          rule.push({'min':parseInt(tmp[0]), 'max':parseInt(tmp[1])});
        });
        rules.push({'name': asd[0], 'rules': rule});
      } if (isOthsTkt) {
        var tmp = element.split(',');
        var isValid = true;
        for (var i=0; i<tmp.length; i++) {
          tmp[i] = parseInt(tmp[i]);
          var found = false;
          for (var a=0; a<rules.length; a++) {
            if (  (rules[a].rules[0].min <= tmp[i] && tmp[i] <= rules[a].rules[0].max) ||
                  (rules[a].rules[1].min <= tmp[i] && tmp[i] <= rules[a].rules[1].max)
            ) found = true;
          }
          if (!found) {
            errors += tmp[i];
            isValid=false;
            break;
          }
        }
        if (isValid) validTkt.push(tmp);
      } else if (isYourTkt) youTkt = element.split(',');
      
      if (element === 'your ticket:') isYourTkt = true;
      if (element === 'nearby tickets:') isOthsTkt = true;
    }
  });
  console.log("Parte 1: " + errors);

  var field = new Object();

  for (var rId = 0; rId<rules.length; rId++) {
    for (var col=0; col<rules.length; col++) {
      var found = true;
      for (var tktId = 0; tktId<validTkt.length; tktId++) {
        if (  (rules[rId].rules[0].min <= validTkt[tktId][col] && validTkt[tktId][col] <= rules[rId].rules[0].max) ||
              (rules[rId].rules[1].min <= validTkt[tktId][col] && validTkt[tktId][col] <= rules[rId].rules[1].max)
        ) {

        } else {
          found = false;
          break;
        }
      }

      if (found) {
        field[col] = rules[rId].name;
        break;
      }
    }
  }
  
  console.log(field);
}