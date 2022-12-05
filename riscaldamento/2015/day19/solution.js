const { triggerAsyncId } = require('async_hooks');
const { toNamespacedPath, parse } = require('path');

fs = require('fs')

fs.readFile('./input.txt', 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  input = input.trim().split('\n');

  var replacementsArray = new Array();
  var formula = "";
  var results = new Array();
  var minReplaces = 0;

  input.forEach(element => {
    if (/\=\>/.test(element)){
      element = element.replace(/ \=\> /,",");
      element = element.split(",");
      replacementsArray.push([element[0],element[1]]);
    } else formula = element;
  });

  replace(formula);
  console.log(results.length);

  devolution(formula,1);
  console.log(minReplaces);

  function replace(string) {
    for (var i=0; i<replacementsArray.length; i++){
      var re = new RegExp(replacementsArray[i][0], 'g');
      while (match = re.exec(string)) {
        var before = match.index > 0 ? string.substr(0, match.index) : "";
        var after = re.lastIndex <= string.length -1  ? string.substr(re.lastIndex , string.length - re.lastIndex) : "";
        var result = before + replacementsArray[i][1] + after;
        if (results.indexOf(result) === -1) results.push(result);
      }
    }
  }

  function replace2(string,n) {
    for (var i=0; i<replacementsArray.length; i++){
      var re = new RegExp(replacementsArray[i][0], 'g');
      while (match = re.exec(string)) {
        if (match !== null) {
          var before = match.index > 0 ? string.substr(0, match.index) : "";
          var after = re.lastIndex <= string.length -1  ? string.substr(re.lastIndex , string.length - re.lastIndex) : "";
          var result = before + replacementsArray[i][1] + after;
          if (result === formula) {
            if (minReplaces > 0) minReplaces = minReplaces < n ? minReplaces : n;
            else minReplaces = n;
            console.log(minReplaces);
            return false;
          } else if (result.length >= formula.length) return false;
          else replace2(result,n+1);
        } 
      }
    }
  }

  function devolution(string, n) {
    for (var i=0; i<replacementsArray.length; i++){
      var re = new RegExp(replacementsArray[i][1], 'g');
      while (match = re.exec(string)) {
        var before = match.index > 0 ? string.substr(0, match.index) : "";
        var after = re.lastIndex <= string.length -1  ? string.substr(re.lastIndex , string.length - re.lastIndex) : "";
        var result = before + replacementsArray[i][0] + after;
        if (result === "e") {
          if (minReplaces > 0) minReplaces = minReplaces < n ? minReplaces : n;
          else minReplaces = n;
          console.log("asd");
          return true;
        } else if (result.length >= 1) {
          devolution(result, n+1);
        } else return false;
      }
    }
    return false;
  }







});