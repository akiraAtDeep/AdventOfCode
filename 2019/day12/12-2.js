
//var input = "<x=-8, y=-10, z=0>\n<x=5, y=5, z=10>\n<x=2, y=-7, z=3>\n<x=9, y=-8, z=-3>".split('\n');
var input = "<x=-1, y=0, z=2>\n<x=2, y=-10, z=-7>\n<x=4, y=-8, z=8>\n<x=3, y=5, z=-1>".split('\n');

for (var i = 0; i < input.length; i++) {
    var tmpStar = new Object();
    input[i] = input[i].replace('<', '');
    input[i] = input[i].replace('>', '');
    input[i] = input[i].split(', ');
    for (var a = 0; a < input[i].length; a++) {
        input[i][a] = input[i][a].split('=');
        tmpStar[input[i][a][0]] = parseInt(input[i][a][1]);
    }
    tmpStar.velocityX = 0;
    tmpStar.velocityY = 0;
    tmpStar.velocityZ = 0;
    input[i] = tmpStar;
}

var history = new Array();
var count = 0;
var goOn = true;

while (goOn) {
    var str = '';
    for (var i = 0; i < input.length; i++) {
        for (var a = 0; a < input.length; a++) {
            if (input[i].x !== input[a].x) {
                input[i].velocityX = input[i].x > input[a].x ? input[i].velocityX - 1 : input[i].velocityX + 1;
            }
            if (input[i].y !== input[a].y) {
                input[i].velocityY = input[i].y > input[a].y ? input[i].velocityY - 1 : input[i].velocityY + 1;
            }
            if (input[i].z !== input[a].z) {
                input[i].velocityZ = input[i].z > input[a].z ? input[i].velocityZ - 1 : input[i].velocityZ + 1;
            }
        }
    }

    for (var i = 0; i < input.length; i++) {
        input[i].x = input[i].x + input[i].velocityX;
        input[i].y = input[i].y + input[i].velocityY;
        input[i].z = input[i].z + input[i].velocityZ;

        str = str + '-' + input[i].x + ',' + input[i].y + ',' + input[i].z + ',' + input[i].velocityX + ',' + input[i].velocityY + ',' + input[i].velocityZ;
    }



    if (history.indexOf(str) !== -1) {
        goOn = false;
        console.log(history.indexOf(str));
    } else {
        history.push(str);
        count++;
    }

}

console.log(count);
