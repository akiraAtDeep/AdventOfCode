var input = 34000000;
var houses = new Array();
var elves = new Array();

var goOn = true;
var i = 1;
while (goOn) {
    for (var a = 1; a <= i; a++) {
        if (elves[a] === undefined) {
            elves[a] = 0;
        }
        if (i % a === 0 && elves[a] < 50) {
            elves[a]++;
            if (houses[i] === undefined) {
                houses[i] = 0;
            }
            houses[i] += a * 11;

            if (houses[i] >= input) {
                console.log(i);
                a = i;
                goOn = false;
            }
        }
    }
    i++;
}

