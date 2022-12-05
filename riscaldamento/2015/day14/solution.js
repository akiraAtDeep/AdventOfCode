const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');
  var Reindeer = new Object();

  input.forEach(element => {
    element = element.split(' ');
    Reindeer[element[0]] = {
      'speed': parseInt(element[3]),
      'time': parseInt(element[6]),
      'rest': parseInt(element[13]),
      'score': 0,
      'isRunning': true,
      'remainingRunning': parseInt(element[6]),
      'remainngRest': parseInt(element[13]),
      'distance': 0
    };
  });

  var maxDistance = 0;
  var maxScore = 0;
  var maxTime = 2503;

  for (var time=1; time<=maxTime; time++) {
    var actualMaxDistance = 0;
    for (var name in Reindeer){
      if(Reindeer[name].isRunning) {
        Reindeer[name].distance += Reindeer[name].speed;
        Reindeer[name].remainingRunning--;
        if (Reindeer[name].remainingRunning === 0) {
          Reindeer[name].isRunning = false;
          Reindeer[name].remainingRunning = Reindeer[name].time;
        }
      } else {
        Reindeer[name].remainngRest--;
        if(Reindeer[name].remainngRest === 0){
          Reindeer[name].isRunning = true;
          Reindeer[name].remainngRest = Reindeer[name].rest;
        }
      }
      actualMaxDistance = Reindeer[name].distance > actualMaxDistance ? Reindeer[name].distance : actualMaxDistance;
    }
    for (var name in Reindeer){
      if (Reindeer[name].distance === actualMaxDistance) Reindeer[name].score++;
    }
  }

  for (var name in Reindeer){
    maxDistance = Reindeer[name].distance > maxDistance ? Reindeer[name].distance : maxDistance;
    maxScore = Reindeer[name].score > maxScore ? Reindeer[name].score : maxScore;
  } 

  console.log(maxDistance); 
  console.log(maxScore); 

/*
  for (var name in Reindeer) {
    var isRunning = true;
    var remainingRunning = Reindeer[name].time;
    var remainngRest = Reindeer[name].rest;
    var distance = 0;
    for (var time=0; time<=maxTime; time++) {
      if (isRunning) {
        distance += Reindeer[name].speed;
        remainingRunning--;
        if (remainingRunning === 0){
          isRunning = false;
          remainingRunning = Reindeer[name].time;
        }
      } else {
        remainngRest--;
        if(remainngRest === 0) {
          isRunning = true;
          remainngRest = Reindeer[name].rest;
        }
      }
    }
    maxDistance = distance > maxDistance ? distance : maxDistance;
  }
*/ 

});