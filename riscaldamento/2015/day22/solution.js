const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  //input = input.trim().split('\n');


  var attacs = [
    {'name':'Magic Missile', 'mana':53, 'damage':4, 'heals':0, 'armor':0, 'newmana':0, 'turns':0},
    {'name':'Drain', 'mana':73, 'damage':2, 'heals':2, 'armor':0, 'newmana':0, 'turns':0},
    {'name':'Shield', 'mana':113, 'damage':0, 'heals':0, 'armor':7, 'newmana':0, 'turns':6},
    {'name':'Poison', 'mana':173, 'damage':3, 'heals':0, 'armor':0, 'newmana':0, 'turns':6},
    {'name':'Recharge', 'mana':229, 'damage':0, 'heals':0, 'armor':0, 'newmana':101, 'turns':5}
  ];

  var player = {'hit points': 10, 'mana':250, 'armor':0};
  var boss = {'hit points': 13, 'damage':8};
  var attacChains = new Array();

  for (var i=0; i<attacs.length; i++) {
    combineAttacs([i]);
  }


  function combineAttacs(chain) {
    if (chain.length < 50) {
      chain.push(Math.floor(Math.random() * attacs.length));
      combineAttacs(chain);
    } else {
      attacChains.push(chain);
      return true;
    }
  }

  console.log(attacChains.length);
  
  function play(player, boss, attacs) {
    var pwin = false, bwin = false;
    var effects = new Array(); 
    while (!pwin|!bwin) {
      var pDamage = 0;

    }
  }

});