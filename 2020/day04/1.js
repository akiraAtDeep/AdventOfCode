fs = require('fs')

fs.readFile('input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  day04(data);
});


const required = new Array('byr','iyr','eyr','hgt','hcl','ecl','pid');
const eyeColors = new Array('amb','blu','brn','gry','grn','hzl','oth');

function day04(input) {
  input = input.split('\n');

  var tmp = new Object();
  var count = 0;
  var count2 = 0;

  for (var i=0; i<input.length; i++) {
    var pass = input[i].split(' ');

    for (var a=0; a<pass.length; a++){
      if (pass[a] === '' || i === input.length-1) {

        if (validation1(tmp)) {
          count++;
          if (validation2(tmp)) count2++;
        }
        tmp = new Object();
      } else { //aggiungo le chiavi al oggetto
        var keyValue = pass[a].split(':');
        tmp[keyValue[0]] = keyValue[1];
      }

    }
  }

  console.log("Parte 1: " + count);
  console.log("Parte 2: " + count2);
}

function validation1 (pass) {
  var ret = true;

  for (var b=0; b<required.length; b++) {
    if (pass[required[b]] === undefined) {
      ret = false;
      break;
    }
  }

  return ret;
}

function validation2 (pass) {
  var ret = true;

  if (parseInt(pass.byr) < 1920 || parseInt(pass.byr) > 2002) ret = false;

  if (parseInt(pass.iyr) < 2010 || parseInt(pass.iyr) > 2020) ret = false;

  if (parseInt(pass.eyr) < 2020 || parseInt(pass.eyr) > 2030) ret = false;

  var hgt = parseInt(pass.hgt.substring(0, pass.hgt.length-2));
  var hgtUnit = pass.hgt.substring(pass.hgt.length-2, pass.hgt.length);


  if (hgtUnit === 'cm') {if (hgt < 150 || hgt > 193) ret = false;}
  else if (hgtUnit === 'in' ) {if (hgt < 59 || hgt > 76) ret = false;}
  else ret = false;
  
  var validHcl = /#([0-9a-f]{6})/.test(pass.hcl) && pass.hcl.length === 7;
  if (!validHcl) ret = false;

  var eye = false;
  for (var c = 0; c<eyeColors.length; c++) {
    if (pass.ecl === eyeColors[c]) {
      eye = true;
      break;
    }
  }
  if (!eye) ret = false;

  var validPid = /[0-9]{9}/.test(pass.pid) && pass.pid.length === 9;
  if (!validPid) ret = false;

  return ret;
}