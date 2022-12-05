const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');

  var total = 150;
  var solutions = 0;
  var minContainers = 0;
  var ncontainers = new Array();

  for (var i=0; i<input.length; i++){
    nextContainer([i],i);
  }
  
  console.log(solutions);

  var count = 0;

  ncontainers.forEach(element => {
    if (element === minContainers) count++;
  });

  console.log(count);

  function nextContainer(list,start) {
    for (var i=start+1; i<input.length; i++) {
      var newList = JSON.parse(JSON.stringify(list));
      newList.push(i);
      var count = countSize(newList);
      if (count < total) {
        if (i<input.length-1) {
          nextContainer(newList,i);
        }  
      } else if (count === total){
        solutions++;
        ncontainers.push(newList.length);
        if (minContainers>0) minContainers = minContainers < newList.length ? minContainers : newList.length;
        else minContainers =  newList.length;
      } 
    } 
  }

  function countSize(list){
    var count = 0;
    list.forEach(element => {
      count += parseInt(input[element]);
    });
    return count;
  }
  
});