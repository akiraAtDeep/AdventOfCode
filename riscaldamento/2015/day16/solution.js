const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');

  var aunts = new Array();
  var target = {
    'children': 3,
    'cats': 7,
    'samoyeds': 2,
    'pomeranians': 3,
    'akitas': 0,
    'vizslas': 0,
    'goldfish': 5,
    'trees': 3,
    'cars': 2,
    'perfumes': 1
  } 

  for (var i=0; i<input.length; i++){
    var data = input[i].replace(/Sue [0-9]{1,}\: /g,"");
    data = data.replace(/ /g, "");
    var aunt = new Object();
    aunt.id = i+1;
    data = data.split(',');
    data.forEach(element => {
      element = element.split(":");
      aunt[element[0]] = parseInt(element[1]);
    });    
    aunts.push(aunt);
  }

  for (var i = 0; i<aunts.length ;i++){
    var found = true;
    for (var item in target){
      if (aunts[i][item] !== undefined){
        if (aunts[i][item] !== target[item]){
          found = false;
          break;
        }
      }
    }
    if (found){
      console.log(i+1);
      break;
    } 
  } 

  
  for (var i = 0; i<aunts.length ;i++){
    var found = true;
    for (var item in target){
      if (aunts[i][item] !== undefined){
        if (item === 'cats' || item === 'trees'){
          if (aunts[i][item] <= target[item]){
            found = false;
            break;
          } 
        } else if (item === 'pomeranians' || item === 'goldfish'){
          if (aunts[i][item] >= target[item]){
            found = false;
            break;
          } 
        } else {
          if (aunts[i][item] !== target[item]){
            found = false;
            break;
          }
        }
      }
    }
    
    if (found){
      console.log(i+1);
    } 

  } 


});