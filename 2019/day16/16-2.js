var input = '03036732577212944063491565474664';
var offset = parseInt(input.slice(0, 7));

var tmp = "";
for (var i = 0; i < 10000; i++) {
    tmp = tmp + input;
}
var phase = tmp.split('').slice(0, offset+10);

console.log(phase.length);

var pattern = [0, 1, 0, -1];

for (var i = 0; i < 100; i++) {
    var newPhase = new Array();
    for (var times = 1; times <= phase.length; times++) {
        var sum = 0;
        var actualPattern = new Array;
        var patternIndex = 1;

        for (var i = 0; i < pattern.length; i++) {
            for (var a = 0; a < times; a++) {
                if (actualPattern.length < phase.length) {
                    actualPattern.push(pattern[i]);
                } else {
                    a = times;
                    i = pattern.length;
                }
            }
        }
        
        phase.forEach(function (element) {
            if (actualPattern[patternIndex] !== 0) {
                sum = sum + (parseInt(element) * actualPattern[patternIndex]);
            }
            patternIndex = patternIndex + 1 === actualPattern.length ? 0 : patternIndex + 1;
        });
        
        newPhase.push(sum.toString().split(''));
    }
    phase = newPhase;
}
var res = phase.slice(offset, 8);
document.getElementById('res').value = res.join('');