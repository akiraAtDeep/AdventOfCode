const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('input_test.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  day(data);
});

function day(input) {
  input = input.split('\n');

  var isP1 = false, isP2 = false;

  var deck1 = new Array(), deck2 = new Array();

  input.forEach(element => {
    if (element === '') isP1 = false, isP2 = false;
    else {
      if (element === 'Player 1:') isP1 = true;
      else if (element === 'Player 2:') isP2 = true;
      else {
        if (isP1) {
          deck1.push(parseInt(element));
        } else if (isP2) {
          deck2.push(parseInt(element));
        }
      }
    } 
  });

  var deck1_2 = JSON.parse(JSON.stringify(deck1));
  var deck2_2 = JSON.parse(JSON.stringify(deck2));

//Parte 1
  while (deck1.length > 0 && deck2.length > 0) {
    if (deck1[0]>deck2[0]) {
      deck1.push(deck1[0]);
      deck1.push(deck2[0]);
      deck1.splice(0,1);
      deck2.splice(0,1);
    } else if (deck2[0]>deck1[0]){
      deck2.push(deck2[0]);
      deck2.push(deck1[0]);
      deck1.splice(0,1);
      deck2.splice(0,1);
    }
  }
  var points = 0;
  if (deck1.length > 0) {
    points = calculatePoints(deck1);
  } else {
    points = calculatePoints(deck2);
  }

  console.log("Parte 1: " + points);

  //Parte 2

  var prevDecks1 = new Array();
  var prevDecks2 = new Array();

  var loopFound = false;


  while (deck1_2.length > 0 && deck2_2.length > 0) {
    var p1win = false, p2win =false;
    //vedo se stiamo entrando in un loop
    var found = false;
    for (var i=0; i<prevDecks1.length; i++) {
      if (prevDecks1[i] === deck1_2.join()) {
        found = true;
        break
      }
    }
    if (!found) {
      for (var i=0; i<prevDecks2.length; i++) {
        if (prevDecks2[i] === deck2_2.join()) {
          found = true;
          break
        }
      }
    }
    if (!found) {
      prevDecks1.push(deck1_2.join());
      prevDecks2.push(deck2_2.join());
    } else {
      loopFound = true
      break;
    }
    
    //decido se si fa il recursive combact o quello normale
    if (!p1win) {
      if (deck1_2.length > deck1_2[0] && deck2_2.length > deck2_2[0]) { //combact recursivo
        var deck1 = new Array();
        var deck2 = new Array();
        for (var i=1; i<=deck1_2[0]; i++) deck1.push(deck1_2[i]);
        for (var i=1; i<=deck2_2[0]; i++) deck2.push(deck2_2[i]);
        //qui parte il gioco
        //console.log("game 2 " + deck1.join() + ' <> ' + deck2.join());
        while (deck1.length > 0 && deck2.length > 0) {
          //console.log(deck1.join() + ' <> ' + deck2.join());
          if (deck1[0]>deck2[0]) {
            deck1.push(deck1[0]);
            deck1.push(deck2[0]);
            deck1.splice(0,1);
            deck2.splice(0,1);
          } else if (deck2[0]>deck1[0]){
            deck2.push(deck2[0]);
            deck2.push(deck1[0]);
            deck1.splice(0,1);
            deck2.splice(0,1);
          }
        }

        if (deck1.length>0 && deck2.length===0) p1win = true;
        else if (deck2.length>0 && deck1.length===0) p2win = true;
      } else { //combact normale
        if (deck1_2[0]>deck2_2[0]) p1win = true;
        else if (deck1_2[0]<deck2_2[0]) p2win = true;
      }
    }

    if (p1win) {
      deck1_2.push(deck1_2[0]);
      deck1_2.push(deck2_2[0]);
      deck1_2.splice(0,1);
      deck2_2.splice(0,1);
    } else if (p2win) {
      deck2_2.push(deck2_2[0]);
      deck2_2.push(deck1_2[0]);
      deck1_2.splice(0,1);
      deck2_2.splice(0,1);
    }
    //console.log(deck1_2.join() + ' <> ' + deck2_2.join());
  }

  points = 0;
  
  if (deck1_2.length > 0 || loopFound) {
    points = calculatePoints(deck1_2);
  } else {
    points = calculatePoints(deck2_2);
  }

  console.log("Parte 2: " + points);



  function calculatePoints(deck) {
    var points = 0;
    for (var i=0; i<deck.length; i++) {
      points += deck[i] * (deck.length-i);
    }
    return points;
  }

}