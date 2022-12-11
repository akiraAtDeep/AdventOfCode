const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.replace(/\r/g,"");
  input = input.trim().split('\n');

  var monkeys;
  var p;
  init();
  for (var i=0; i<20; i++) {
    evolution(false);
  }
  score();

  init();
  for (var i=0; i<10000; i++) {
    evolution(true);
    /*
    console.log("round: "+(i+1))
    monkeys.forEach(function (monkey, id) {
      console.log([id, monkey.inspect]);
    });
    */
  }
  score();

  function init() {
    p = 1;
    monkeys = new Array();
    var newMonkey = Object();
    input.forEach(element => {
      if (/Monkey [0-9]{1,}:/.test(element)) {
        monkeys.push(newMonkey);
        newMonkey = Object();
        newMonkey.inspect = 0;
      } else if (/Starting items:/g.test(element)){
        element = element.replace("Starting items: ","");
        element = element.replace(" ","");
        element = element.split(",");
        newMonkey.items = new Array();
        newMonkey.itemsBIG = new Array();
        element.forEach(item => {
          newMonkey.items.push(parseInt(item));
        });
      } else if (/Operation:/g.test(element)){
        element = element.replace("Operation: ","");
        element = element.replace(" ","");
        newMonkey.operation = element.split(" ");
      } else if (/Test: divisible by /g.test(element)) {
        newMonkey.divisible = parseInt(element.replace("Test: divisible by ",""));
        p = p * newMonkey.divisible;
      } else if (/If true:/g.test(element)) {
        newMonkey.true = parseInt(element.replace("If true: throw to monkey ",""));
      } else if (/If false:/g.test(element)) {
        newMonkey.false  =parseInt(element.replace("If false: throw to monkey ",""));
      }
    });
    monkeys.push(newMonkey);
    monkeys.splice(0,1);
    //console.log(monkeys);
  }

  function evolution(worry) {
    for (var id=0; id<monkeys.length; id++) {      
      while (monkeys[id].items.length > 0) {
        monkeys[id].inspect++;
        var level = 0;
        var operand = 0;
        if (monkeys[id].operation[5] === "old") operand = monkeys[id].items[0];
        else operand = parseInt(monkeys[id].operation[5]);
        switch(monkeys[id].operation[4]) {
          case "*":
            if (!worry) level = monkeys[id].items[0] * operand;
            else level = (monkeys[id].items[0] % p) * operand;
            break;
          case "+":
            if (!worry) level = monkeys[id].items[0] + operand;
            else level = (monkeys[id].items[0] % p) + operand;
            break;
        }
        if (!worry) level = Math.floor(level/3);
        if (level%monkeys[id].divisible === 0) monkeys[monkeys[id].true].items.push(level);
        else monkeys[monkeys[id].false].items.push(level);
        monkeys[id].items.splice(0,1);
      }
    }
  }

  function score() {
    var times = new Array();
    monkeys.forEach(function (monkey, id) {
      times.push(parseInt(monkey.inspect));
    });
    times.sort(function(a, b) {
      return a - b;
    });
    console.log(times[times.length-1]*times[times.length-2]);
  }
});