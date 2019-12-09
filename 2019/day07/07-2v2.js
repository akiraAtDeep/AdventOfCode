var program = '3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5';
var input = '9,8,7,6,5'.split(',');
//var program = '3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10';
//var input = '9,7,8,5,6'.split(',');
var usePhase = [true, true, true, true, true];
var lastOut = 0;
var programs = new Array();
var exit = false;
var amp = 0;
var pointer = [0, 0, 0, 0, 0];
while (!exit) {
    if (programs[amp] === undefined) {
        programs[amp] = program.split(',');
    }
    //element.forEach(function (element) {
    for (var i = pointer[amp]; i < programs[amp].length; ) {

        var tmp = programs[amp][i].toString();
        var operation = tmp.length > 2 ? (parseInt(tmp.substr(tmp.length - 2, 2))) : parseInt(tmp);
        exit = amp === 4 && operation === 99 ? true : false;
        var mode1 = tmp.length > 2 ? (parseInt(tmp.substr(tmp.length - 3, 1))) : 0;
        var mode2 = tmp.length > 3 ? (parseInt(tmp.substr(tmp.length - 4, 1))) : 0;
        var mode3 = tmp.length === 5 ? (parseInt(tmp.substr(tmp.length - 5, 1))) : 0;

        i = stuff(operation, mode1, mode2, mode3, i, amp);
    }
    amp = amp === 4 ? 0 : amp + 1;
}
console.log('end');


function stuff(operation, mode1, mode2, mode3, i, amp) {
    var program = programs[amp];
    if (operation === 1) {
        var pos1 = mode1 === 0 ? (parseInt(program[i + 1])) : (i + 1);
        var pos2 = mode2 === 0 ? (parseInt(program[i + 2])) : (i + 2);
        var pos3 = mode3 === 0 ? (parseInt(program[i + 3])) : (i + 3);
        program[pos3] = parseInt(program[pos1]) + parseInt(program[pos2]);
        i = i + 4;
    } else if (operation === 2) {
        var pos1 = mode1 === 0 ? (parseInt(program[i + 1])) : (i + 1);
        var pos2 = mode2 === 0 ? (parseInt(program[i + 2])) : (i + 2);
        var pos3 = mode3 === 0 ? (parseInt(program[i + 3])) : (i + 3);
        program[pos3] = parseInt(program[pos1]) * parseInt(program[pos2]);
        i = i + 4;
    } else if (operation === 3) {
        var pos1 = mode1 === 0 ? (parseInt(program[i + 1])) : (i + 1);
        program[pos1] = usePhase[amp] ? input[amp] : lastOut;
        usePhase[amp] = false;
        i = i + 2;
    } else if (operation === 4) {
        var pos1 = mode1 === 0 ? (parseInt(program[i + 1])) : (i + 1);
        if (amp === 4) {
            console.log(program[pos1]);
        }
        lastOut = program[pos1];
        pointer[amp] = i + 2;
        i = programs[amp].length;
    } else if (operation === 5) {
        var pos1 = mode1 === 0 ? (parseInt(program[i + 1])) : (i + 1);
        var pos2 = mode2 === 0 ? (parseInt(program[i + 2])) : (i + 2);
        if (parseInt(program[pos1]) > 0) {
            i = parseInt(program[pos2]);
        } else {
            i = i + 3;
        }
    } else if (operation === 6) {
        var pos1 = mode1 === 0 ? (parseInt(program[i + 1])) : (i + 1);
        var pos2 = mode2 === 0 ? (parseInt(program[i + 2])) : (i + 2);
        if (parseInt(program[pos1]) === 0) {
            i = parseInt(program[pos2]);
        } else {
            i = i + 3;
        }
    } else if (operation === 7) {
        var pos1 = mode1 === 0 ? (parseInt(program[i + 1])) : (i + 1);
        var pos2 = mode2 === 0 ? (parseInt(program[i + 2])) : (i + 2);
        var pos3 = mode3 === 0 ? (parseInt(program[i + 3])) : (i + 3);
        if (parseInt(program[pos1]) < parseInt(program[pos2])) {
            program[pos3] = 1;
        } else {
            program[pos3] = 0;
        }
        i = i + 4;
    } else if (operation === 8) {
        var pos1 = mode1 === 0 ? (parseInt(program[i + 1])) : (i + 1);
        var pos2 = mode2 === 0 ? (parseInt(program[i + 2])) : (i + 2);
        var pos3 = mode3 === 0 ? (parseInt(program[i + 3])) : (i + 3);
        if (parseInt(program[pos1]) === parseInt(program[pos2])) {
            program[pos3] = 1;
        } else {
            program[pos3] = 0;
        }
        i = i + 4;
    } else if (operation === 99) {
        i = program.length;
    }

    return(i);
}
