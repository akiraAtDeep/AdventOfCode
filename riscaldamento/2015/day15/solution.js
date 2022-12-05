const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');
  var ingredients = new Array();
  var maxScore = 0;
  var maxScore500 = 0;

  input.forEach(element => {
    element = element.split(':');
    element[1] = element[1].replace(/,/g,'');
    element[1] = element[1].split(' ');

    var newIngredient = new Object();
    newIngredient['name'] = element[0]
    newIngredient[element[1][1]] = parseInt(element[1][2]);
    newIngredient[element[1][3]] = parseInt(element[1][4]);
    newIngredient[element[1][5]] = parseInt(element[1][6]);
    newIngredient[element[1][7]] = parseInt(element[1][8]);
    newIngredient[element[1][9]] = parseInt(element[1][10]);
    ingredients.push(newIngredient);
  });

  addIngredients(0, 100-ingredients.length, []);
  console.log(maxScore);
  console.log(maxScore500);

  function addIngredients(index, quantity, recipe){
    for(var q=quantity; q>0; q--){
      var newRecipe = JSON.parse(JSON.stringify(recipe));
      newRecipe.push({'name':ingredients[index].name, 'quantity' : q});
      var nextIndex = index+1;
      if (nextIndex < ingredients.length){
        addIngredients(nextIndex, 100-q, newRecipe);
      } else {
        if (isFull(newRecipe)){
          var score = calculateScore(newRecipe);
          maxScore = score[0] > maxScore ? score[0] : maxScore;
          if(score[1] === 500){
            maxScore500 = score[0] > maxScore500 ? score[0] : maxScore500;
          } 
          return true;
        }         
      }
    }
    return true;
  }

  //console.log(calculateScore([{'name':'Butterscotch', 'quantity':44},{'name':'Cinnamon', 'quantity':56}]));

  function isFull(recipe){
    var quantity = 0;
    recipe.forEach(element =>{
      quantity += element.quantity;
    });
    return quantity === 100;
  }

  function calculateScore(recipe) {
    var capacity = 0, durability = 0, flavor = 0, texture = 0, calories = 0;
    recipe.forEach(element => {
      var index = 0;
      for (var i=0; i<ingredients.length; i++){
        if (ingredients[i].name === element.name){
          index = i;
          break;
        }
      }
      capacity += ingredients[index].capacity*element.quantity
      durability += ingredients[index].durability*element.quantity;
      flavor += ingredients[index].flavor*element.quantity;
      texture += ingredients[index].texture*element.quantity;
      calories += ingredients[index].calories*element.quantity;
    });

    capacity = capacity > 0 ? capacity : 0;
    durability = durability > 0 ? durability : 0;
    flavor = flavor > 0 ? flavor : 0;
    texture = texture > 0 ? texture : 0;
    calories = calories > 0 ? calories : 0;
    return [capacity * durability * flavor * texture, calories];
  }
});