const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  day08(data);
});
var pc;
var acc;
function day08(input) {
  input = input.split('\n');

  var jmpNop = new Array();
  for (var i=0; i<input.length; i++) {
    input[i] = input[i].split(' ');
    if (input[i][0] === 'nop' || input[i][0] === 'jmp') jmpNop.push(i);
  }

  pc = 0;
  acc = 0;
  var pcHistory = new Array();

  while(checkHistory(pc, pcHistory)) {
    pcHistory.push(pc);
    execute(input[pc]);
  }

  console.log("Parte 1: " + acc);

  for (var i=0; i<jmpNop.length; i++) {
    var tmp = JSON.parse(JSON.stringify(input));
    if (tmp[jmpNop[i]][0] === 'jmp') tmp[jmpNop[i]][0] = 'nop';
    else if (tmp[jmpNop[i]][0] === 'nop') tmp[jmpNop[i]][0] = 'jmp';
    pc = 0;
    acc = 0;

    pcHistory = new Array();
    while(checkHistory(pc, pcHistory)) {
      pcHistory.push(pc);
      execute(tmp[pc]);
      if (pc === input.length) break;
    }
    if (pc === input.length) break;
  }
  
  console.log("Parte 2: " + acc);
}

function checkHistory(pc, pcHistory) {
  for (var i=0; i<pcHistory.length; i++) {
    if (pcHistory[i]===pc) {
      return false;
    }
  }
  return true;
}

function execute(instruction) {
  switch(instruction[0]){
    case 'acc':
      acc += parseInt(instruction[1]);
      pc++;
      break;
    case 'jmp':
      pc += parseInt(instruction[1]);
      break;
    case 'nop':
      pc++;
      break;
    default:
      pc++;
      break;
  }
}