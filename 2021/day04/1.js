const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }

  input = input.replace (/  /g, " ");
  input = input.trim().split('\n');
  var numbers = input[0].split(',');

  var boards = new Array(), tmpBoard = null, winners = new Array, last = 0;
  var indexToDelete = new Array();

  for (var i=1; i<input.length; i++) {
    if (input[i]==="") {
      if (tmpBoard !== null) boards.push({'id':i, 'board':tmpBoard});
      tmpBoard = new Array();
    } else tmpBoard.push(input[i].split(" "));
    last = i;
  }
  boards.push({'id':last++, 'board':tmpBoard});

  for (var i=0; i<numbers.length;i++) {
    for (var a=0; a<boards.length; a++) {
      
      for (var y=0; y<5; y++){
        for (var x=0; x<5; x++){
          var rx = boards[a].board[y].length === 6 ? x+1 : x;
          if (parseInt(boards[a].board[y][rx]) === parseInt(numbers[i])) {
            boards[a].board[y][rx] = true;
          }
        }
      }
      if (isWinner(boards[a].board)) {
        //printBord(boards[a].board);
        winners.push(points(boards[a].board) * parseInt(numbers[i]));
        indexToDelete.push(boards[a].id);//marco come da cancellare
        if (boards.length === 0) i = numbers.length;
      }
    }
    if (indexToDelete.length > 0) { //vedo se c'e' da cancellare una board
      for (var i=0; i<indexToDelete.length; i++) {
        for (var a=0; a<boards.length; a++) {
          if (boards[a].id === indexToDelete[i]) {
            boards.splice(a,1);
            break;
          }
        }
      }
      indexToDelete = new Array();
    }
  }
  console.log("la prima board vince con un punteggio di: " + winners[0]);
  console.log("l'ultima board vince con un punteggio di: " + winners[winners.length-1]);

});
function printBord(board) {
  for (var y=0; y<board.length; y++) {
    var row = "";
    for (var x=0; x<board[y].length; x++) {
      var rx = board[y].length === 5 ? x : x+1;
      row += board[y][rx] + "-";
    }
    console.log(row);
  }
}

function isWinner(board) {
  var isWin = false;
  for (var y=0; y<board.length; y++) {
    var rowComplete = true;
    for (var x=0; x<board[y].length; x++) {
      var rx = board[y].length === 5 ? x : x+1;
      if (board[y][rx] !== true) {
        rowComplete = false;
        break;
      }
    }
    if (rowComplete) {
      isWin = true;
      break;
    }
  }

  if (!isWin) {
    for (var x=0; x<5; x++) {
      var columnComplete = true;
      for (var y=0; y<5; y++) {
        var rx = board[y].length === 5 ? x : x+1;
        if (board[y][rx] !== true) {
          columnComplete = false;
          break;
        }
      }
      if (columnComplete) {
        isWin = true;
        break;
      }
    }
  }

  return isWin;
}

function points(board) {
  var sum = 0;
  for (var y=0; y<board.length; y++){
    for (var x=0; x<board[y].length; x++) {
      if (board[y][x] !== "" && board[y][x] !== true) sum += parseInt(board[y][x]);
    }
  }
  return sum;
}