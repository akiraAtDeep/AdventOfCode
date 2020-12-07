const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  day07(data);
});

var res = new Array();

function day07(input) {
  input = input.split('\n');

  var bags = new Array(); 

  input.forEach(element => {
    if (element !== '') {
      var tmp = element.split(' ');
      var bag = '';
      var content = '';
      for (var i=0; i<3; i++) {
        bag += tmp[i] + " ";
      }
      for (var i=4; i<tmp.length; i++) {
        content += tmp[i] + " ";
      }
      if (content !== 'no other bags. ') {
        content = content.split(', ');
        for (var i=0; i<content.length; i++) {
          var tmp  = /(([a-z]){1,} ([a-z]){1,} bag)/.exec(content[i]);
          var tmp2 = /[0-9]{1,}/.exec(content[i]);
          content[i] = {'b':tmp[1], 'n':parseInt(tmp2[0])}; 
        }
        bags.push({'bag': bag.replace('bags ','bag'), 'content': content});
      }
    }
  });

  seatchBag('shiny gold bag', bags);

  console.log("Parte 1: " + res.length);
  console.log("Parte 1: " + innerBag('shiny gold bag', bags));
}

function addBag(bag) {
  var find = false;
  for (var i=0; i<res.length; i++) {
    if (res[i] === bag) {
      find = true;
      break;
    }
  }
  if (!find) res.push(bag);
}

function seatchBag(bag, bags) {
  for (var a=0; a<bags.length; a++) {
    for (var b=0; b<bags[a].content.length; b++) {
      if (bags[a].content[b].b === bag) {
        var tmpBags = JSON.parse(JSON.stringify(bags));
        tmpBags.splice(a,1);
        addBag(bags[a].bag);
        seatchBag(bags[a].bag, tmpBags) + 1;
        break;
      } 
    }
  }
  return true;
}

function innerBag(bag, bags) {
  var count = 0;
  for (var a=0; a<bags.length; a++) {
    if (bags[a].bag === bag) {
      for (var b=0; b<bags[a].content.length; b++) {
        var tmpBags = JSON.parse(JSON.stringify(bags));
        tmpBags.splice(a,1);
        count += bags[a].content[b].n;
        count += (innerBag(bags[a].content[b].b, tmpBags) * bags[a].content[b].n);
      }
    }
  }
  return count;
}