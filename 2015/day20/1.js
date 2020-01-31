console.time('Time');
var input = 34000000;
var houses = new Array();
var goOn = true;
var i = 2;
while (goOn) {
    for (var a = 2; a <= i; a++) {
        if (i % a === 0 ) {
            if (houses[i] === undefined) {
                houses[i] = 10;
            }
            houses[i] += a * 10;

            if (houses[i] >= input) {
                console.log(i);
                a = i;
                goOn = false;
            }
        }
    }
    i++;
}
console.timeEnd('Time');