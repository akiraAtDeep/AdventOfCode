const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');

  var score = 0;

  input.forEach(element => {
    element = element.split(' ');

    var outcomeScore = 0;
    switch (element[0]) {
      case 'A':
        if (element[1]==='Y') outcomeScore = 6;
        else if (element[1]==='X') outcomeScore = 3;
        break;
      case 'B':
        if (element[1]==='Z') outcomeScore = 6;
        else if (element[1]==='Y') outcomeScore = 3;
        break;
      case 'C':
        if (element[1]==='X') outcomeScore = 6;
        else if (element[1]==='Z') outcomeScore = 3;
        break;
    }

    switch (element[1]) {
      case 'X':
        outcomeScore += 1;
        break;
      case 'Y':
        outcomeScore += 2;
        break;
      case 'Z':
        outcomeScore += 3;
        break;
    }
    score += outcomeScore
  });

  console.log(score);


  score = 0;

  input.forEach(element => {
    element = element.split(' ');
    switch (element[1]) {
      case 'X': //loose
        switch (element[0]) {
          case 'A'://rock
            score += 3;
            break;
          case 'B'://paper
            score += 1;
            break;
          case 'C'://sissor
            score += 2;
            break;
        }
        break;
      case 'Y': //draw
        score += 3;
        switch (element[0]) {
          case 'A'://rock
            score += 1;
            break;
          case 'B'://paper
            score += 2;
            break;
          case 'C'://sissor
            score += 3;
            break;
        }
        break;
      case 'Z': //win
        score += 6;
        switch (element[0]) {
          case 'A'://rock
            score += 2;
            break;
          case 'B'://paper
            score += 3;
            break;
          case 'C'://sissor
            score += 1;
            break;
        }
        break;
    }
  });

  console.log(score);

});