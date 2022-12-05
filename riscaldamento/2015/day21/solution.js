const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');
  var boss = new Object();
  var playersCombinations = new Array();
  var minSpend = 0;
  var maxSpend = 0;

  var store = {};
  store.weapons = [
    {'name':"Dagger", 'cost':8, 'Damage':4, 'Armor':0},
    {'name':"Shortsword", 'cost':10, 'Damage':5, 'Armor':0},
    {'name':"Warhammer", 'cost':25, 'Damage':6, 'Armor':0},
    {'name':"Longsword", 'cost':40, 'Damage':7, 'Armor':0},
    {'name':"Greataxe", 'cost':74, 'Damage':8, 'Armor':0},
  ]; 

  store.armor = [
    {'name':"null", 'cost':0, 'Damage':0, 'Armor':0},
    {'name':"Leather", 'cost':13, 'Damage':0, 'Armor':1},
    {'name':"Chainmail", 'cost':31, 'Damage':0, 'Armor':2},
    {'name':"Splintmail", 'cost':53, 'Damage':0, 'Armor':3},
    {'name':"Bandedmail", 'cost':75, 'Damage':0, 'Armor':4},
    {'name':"Platemail", 'cost':102, 'Damage':0, 'Armor':5},
  ]; 

  store.rings = [
    {'name':"null", 'cost':0, 'Damage':0, 'Armor':0},
    {'name':"Damage +1", 'cost':25, 'Damage':1, 'Armor':0},
    {'name':"Damage +2", 'cost':50, 'Damage':2, 'Armor':0},
    {'name':"Damage +3", 'cost':100, 'Damage':3, 'Armor':0},
    {'name':"Defense +1", 'cost':20, 'Damage':0, 'Armor':1},
    {'name':"Defense +2", 'cost':40, 'Damage':0, 'Armor':2},
    {'name':"Defense +3", 'cost':80, 'Damage':0, 'Armor':3},
  ]; 

  input.forEach(element => {
    element = element.split(": ");
    boss[element[0]] = element[1];
  });


  combination();
  //play({'Hit Points':12, 'Damage':7, 'Armor':2},{'Hit Points':8, 'Damage':5, 'Armor':5, 'cost':10})

  playersCombinations.forEach(element => {
    play(boss,element);
  });
  console.log(minSpend);
  console.log(maxSpend);

  function combination() {
    var player = {'Hit Points':100, 'Damage':0, 'Armor':0, 'cost':0};
    store.weapons.forEach(weapon => {
      store.armor.forEach(armor => {

        for (var a=0; a<store.rings.length; a++) {
          //zero o un anello
          var p = JSON.parse(JSON.stringify(player));
          p.Damage = weapon.Damage + store.rings[a].Damage;
          p.Armor = armor.Armor+ store.rings[a].Armor;
          p.cost = weapon.cost + armor.cost + store.rings[a].cost;
          playersCombinations.push(p);
          for (var b=a+1; b<store.rings.length; b++) {
            //due o un anello
            var p1 = JSON.parse(JSON.stringify(p));
            p1.Damage += store.rings[b].Damage;
            p1.Armor += store.rings[b].Armor;
            p1.cost += store.rings[b].cost;
            playersCombinations.push(p1);
            //play(boss, p1);
          }
        }
      });
    });
  }

  function play(boss,player) {
    var playBoss = JSON.parse(JSON.stringify(boss));
    var pwin = false;
    var bwin = false;

    while(!pwin && !bwin) {
      //player turn
      playBoss['Hit Points'] -= (player.Damage - playBoss.Armor);
      pwin = playBoss['Hit Points'] <= 0 ? true : false;
      //boss turn
      if (!pwin) {
        player['Hit Points'] -= (playBoss.Damage - player.Armor);
        bwin = player['Hit Points'] <= 0 ? true : false;
      }
    }
    if (pwin) {
      if (minSpend === 0 ) minSpend = player.cost;
      else minSpend = minSpend < player.cost ? minSpend : player.cost;
    } else {
      maxSpend = maxSpend > player.cost ? maxSpend : player.cost;
    }
  }

});