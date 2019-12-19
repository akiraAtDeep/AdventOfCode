var program;
var relativeBase;

var input;
var flag = true;

var str = "";
var y = 0;
for (y; y < 1300; y++) {
    for (var x = 0; x < 730; x++) {
        input = {'x': x, 'y': y};
        runIntcode();
    }
    str = str + "\n";
}

console.log(str);
//document.getElementById('res').value = pulled;

function runIntcode() {
    program = "109,424,203,1,21101,0,11,0,1105,1,282,21101,0,18,0,1106,0,259,2102,1,1,221,203,1,21102,31,1,0,1105,1,282,21101,38,0,0,1105,1,259,21001,23,0,2,21201,1,0,3,21101,0,1,1,21101,0,57,0,1106,0,303,1202,1,1,222,20102,1,221,3,21002,221,1,2,21101,259,0,1,21102,80,1,0,1106,0,225,21101,0,189,2,21102,91,1,0,1105,1,303,2102,1,1,223,20101,0,222,4,21102,259,1,3,21101,225,0,2,21102,225,1,1,21102,1,118,0,1105,1,225,21001,222,0,3,21102,1,57,2,21102,1,133,0,1106,0,303,21202,1,-1,1,22001,223,1,1,21102,148,1,0,1106,0,259,1202,1,1,223,21001,221,0,4,20101,0,222,3,21101,0,24,2,1001,132,-2,224,1002,224,2,224,1001,224,3,224,1002,132,-1,132,1,224,132,224,21001,224,1,1,21101,195,0,0,106,0,108,20207,1,223,2,20102,1,23,1,21102,-1,1,3,21101,0,214,0,1106,0,303,22101,1,1,1,204,1,99,0,0,0,0,109,5,1201,-4,0,249,22101,0,-3,1,22101,0,-2,2,22102,1,-1,3,21102,250,1,0,1106,0,225,22101,0,1,-4,109,-5,2106,0,0,109,3,22107,0,-2,-1,21202,-1,2,-1,21201,-1,-1,-1,22202,-1,-2,-2,109,-3,2106,0,0,109,3,21207,-2,0,-1,1206,-1,294,104,0,99,21201,-2,0,-2,109,-3,2105,1,0,109,5,22207,-3,-4,-1,1206,-1,346,22201,-4,-3,-4,21202,-3,-1,-1,22201,-4,-1,2,21202,2,-1,-1,22201,-4,-1,1,21201,-2,0,3,21102,343,1,0,1105,1,303,1105,1,415,22207,-2,-3,-1,1206,-1,387,22201,-3,-2,-3,21202,-2,-1,-1,22201,-3,-1,3,21202,3,-1,-1,22201,-3,-1,2,21201,-4,0,1,21101,384,0,0,1106,0,303,1106,0,415,21202,-4,-1,-4,22201,-4,-3,-4,22202,-3,-2,-2,22202,-2,-4,-4,22202,-3,-2,-3,21202,-4,-1,-2,22201,-3,-2,1,22102,1,1,-4,109,-5,2105,1,0".split(',');
    relativeBase = 0;
    for (var i = 0; i < Object.keys(program).length; ) {

        var tmp = program[i].toString();
        var operation = tmp.length > 2 ? (parseInt(tmp.substr(tmp.length - 2, 2))) : parseInt(tmp);
        var mode1 = tmp.length > 2 ? (parseInt(tmp.substr(tmp.length - 3, 1))) : 0;
        var mode2 = tmp.length > 3 ? (parseInt(tmp.substr(tmp.length - 4, 1))) : 0;
        var mode3 = tmp.length === 5 ? (parseInt(tmp.substr(tmp.length - 5, 1))) : 0;
        i = stuff(operation, mode1, mode2, mode3, i);
    }
}

function stuff(operation, mode1, mode2, mode3, i) {
    if (operation === 1) {
        var pos1 = getPosition(mode1, 1, i);
        var pos2 = getPosition(mode2, 2, i);
        var pos3 = getPosition(mode3, 3, i);
        program[pos3] = parseInt(program[pos1]) + parseInt(program[pos2]);
        i = i + 4;
    } else if (operation === 2) {
        var pos1 = getPosition(mode1, 1, i);
        var pos2 = getPosition(mode2, 2, i);
        var pos3 = getPosition(mode3, 3, i);
        program[pos3] = parseInt(program[pos1]) * parseInt(program[pos2]);
        i = i + 4;
    } else if (operation === 3) {
        var pos1 = getPosition(mode1, 1, i);
        if (flag) {
            program[pos1] = input.x;
        } else {
            program[pos1] = input.y;
        }
        flag = !flag;
        i = i + 2;
    } else if (operation === 4) {
        var pos1 = getPosition(mode1, 1, i);
        if(parseInt(program[pos1]) === 1){
            str = str + "#";
        } else {
            str = str + ".";
        }
        
        i = i + 2;
    } else if (operation === 5) {
        var pos1 = getPosition(mode1, 1, i);
        var pos2 = getPosition(mode2, 2, i);
        if (parseInt(program[pos1]) > 0) {
            i = parseInt(program[pos2]);
        } else {
            i = i + 3;
        }
    } else if (operation === 6) {
        var pos1 = getPosition(mode1, 1, i);
        var pos2 = getPosition(mode2, 2, i);
        if (parseInt(program[pos1]) === 0) {
            i = parseInt(program[pos2]);
        } else {
            i = i + 3;
        }
    } else if (operation === 7) {
        var pos1 = getPosition(mode1, 1, i);
        var pos2 = getPosition(mode2, 2, i);
        var pos3 = getPosition(mode3, 3, i);
        if (parseInt(program[pos1]) < parseInt(program[pos2])) {
            program[pos3] = 1;
        } else {
            program[pos3] = 0;
        }
        i = i + 4;
    } else if (operation === 8) {
        var pos1 = getPosition(mode1, 1, i);
        var pos2 = getPosition(mode2, 2, i);
        var pos3 = getPosition(mode3, 3, i);
        if (parseInt(program[pos1]) === parseInt(program[pos2])) {
            program[pos3] = 1;
        } else {
            program[pos3] = 0;
        }
        i = i + 4;
    } else if (operation === 9) {
        var pos1 = getPosition(mode1, 1, i);
        relativeBase = relativeBase + parseInt(program[pos1]);
        i = i + 2;
    } else if (operation === 99) {
        i = program.length;
    }

    return(i);
}

function getPosition(mode, nParameter, i) {
    var parameter = 0;
    switch (mode) {
        case 0:
            parameter = parseInt(program[i + nParameter]);
            break;
        case 1:
            parameter = i + nParameter;
            break;
        case 2:
            parameter = relativeBase + parseInt(program[i + nParameter]);
            break;
    }
    return(parameter);
}
