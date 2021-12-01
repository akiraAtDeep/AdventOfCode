const { triggerAsyncId } = require('async_hooks');
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

  var rules = new Object();

  var toTest = new Array();

  input.forEach(element => {
    if (/^[0-9]{1,}:/.test(element)) {
      var row = element.split(':');
      row[1] = row[1].replace(/(^ )|( $)|\"/g,'');
      row[1] = row[1].replace(' | ','|');
      row[1] = row[1].replace(/ /g,',');
      rules[row[0]] = row[1].split('|');
    } else {
      toTest.push(element);
    }
  });

  var solution = new Array();
  var ruleTried = new Array();
  
  console.log('inizio a risolvere la regola 0');
  execRules(rules[0][0]);

  console.log('finito di risolvere la regola 0');

  var count = 0;
  for (var i=0; i<toTest.length; i++) {
    for (var a=0; a<solution.length; a++) {
      if (toTest[i] === solution[a]) {
        count++;
        break;
      }
    }
  }

  console.log(count);

  function execRules(rule) {
    rule = rule.split(',');
    for (var i=0; i<rule.length; i++) {
      if (!/[a-z]/.test(rule[i])) {
        rules[rule[i]].forEach(element => {
          if (/[a-z]/.test(element)) rule[i] = element;
        });
      }
    }

    var asd = rule.join(',');
    if (/^([a-z]\,){1,}[a-z]$/.test(asd)) {
      asd = rule.join('');
      addSolution(asd);
      return true;
    }

    for (var i=0; i<rule.length; i++) {
      if (!/[a-z]/.test(rules[rule[i]])) {
        rules[rule[i]].forEach(element => {
          if (!/[a-z]/.test(element)) {
            var tmp = JSON.parse(JSON.stringify(rule));
            tmp[i] = element;
            tmp = tmp.join(',');
            if (!addTried(tmp)) {
              if (ruleTried.length % 10000 === 0) console.log(ruleTried.length);
              execRules(tmp);
            }
          }
        });
      }
    }
    return false;
  }

  /*
  function execRules(rule) {
    rule = rule.split(',');
    for (var i=0; i<rule.length; i++) {
      if (!/[a-z]/.test(rule[i])) {
        var tmp = JSON.parse(JSON.stringify(rule));
        rules[tmp[i]].forEach(element => {
          tmp[i] = element;
          if (/[a-z]/.test(element)) rule[i] = element
          var asd = tmp.join('');
          console.log(asd);
          if (/^([a-z]){1,}$/.test(asd)) {
            addSolution(asd);
            return true;
          }
          else {
            var asd = tmp.join();
            execRules(asd);
          }
          //if (/^([a-z]\,){1,}[a-z]$/.test(tmp.join())) solution.push(tmp.join(''));
        });
      }
    }
    return false;
  }
*/

  function addSolution(sol) {
    var found = false;
    for (var i=0; i<solution.length; i++) {
      if (solution[i] === sol) {
        found = true;
        break;
      }
    }

    if (!found) {
      solution.push(sol);
    }
  }

  function addTried(rule) {
    var found = false;
    for (var i=0; i<ruleTried.length; i++) {
      if (ruleTried[i] === rule) {
        found = true;
        break;
      }
    }

    if (!found) {
      ruleTried.push(rule);
    }
    return found;
  }

}