const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');

  var preferencies = new Object();
  var invited = new Array();
  var tables = new Array();
  var maxHappiness = 0;

  input.forEach(element => {
    element = element.replace(/\.$/,"");
    element = element.split(' ');
    if(invited.indexOf(element[0]) === -1) invited.push(element[0]);
    if(invited.indexOf(element[10]) === -1) invited.push(element[10]);
    if(preferencies[element[0]] === undefined) preferencies[element[0]] = new Object();
    if (element[2] === 'gain') {
      preferencies[element[0]][element[10]] = parseInt(element[3]);
    } else {
      preferencies[element[0]][element[10]] = -parseInt(element[3]);
    }
  });

  invited.forEach(element => {
    addToTable([element]);
  });

  tables.forEach(element => {
    if (element !== undefined){
      calculateHappiness(element);
    }
  });

  console.log(maxHappiness);

  //parte due
  maxHappiness = 0;
  tables = new Array();
  preferencies['me'] = new Object();
  invited.forEach(element => {
    preferencies[element]['me'] = 0;
    preferencies['me'][element] = 0;
  });
  invited.push('me');
  invited.forEach(element => {
    addToTable([element]);
  });

  tables.forEach(element => {
    if (element !== undefined){
      calculateHappiness(element);
    }
  });
  console.log(maxHappiness);

  function addToTable(table) {
    for (var i=0; i<invited.length; i++) {
      if(table.indexOf(invited[i]) === -1) {
        var newTable = JSON.parse(JSON.stringify(table));
        newTable.push(invited[i]);
        if (newTable.length < invited.length) {
          addToTable(newTable);
        } else {
          tables.push(newTable);
          return true;
        }
      }
    }
  }

  

  function calculateHappiness(table) {
    var happines = 0;
    for (var i=0; i<table.length; i++) {
      var next = i+1 < table.length ? i+1 : 0;
      happines += preferencies[table[i]][table[next]];
      happines += preferencies[table[next]][table[i]];
    }
    maxHappiness = happines > maxHappiness ? happines : maxHappiness;
    return happines;
  }

});