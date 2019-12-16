var input = '59738476840592413842278931183278699191914982551989917217627400830430491752064195443028039738111788940383790187992349338669216882218362200304304999723624146472831445016914494176940890353790253254035638361091058562936884762179780957079673204210602643442603213181538626042470133454835824128662952579974587126896226949714610624975813583386749314141495655816215568136392852888525754247201021383516228214171660111826524421384758783400220017148022332694799323429711845103305784628923350853888186977670136593067604033507812932778183786479207072226236705355778245701287481396364826358903409595200711678577506495998876303181569252680220083046665757597971122614';
//var input = '03036732577212944063491565474664';
var offset = parseInt(input.slice(0, 7));

var tmp = "";
for (var i = 0; i < 10000; i++) {
    tmp = tmp + input;
}
var phase = tmp.split('');

console.log(phase.length);

/*
 var input = '80871224585914546619083218645595';
 var offset = 0;
 var phase = input.split('');
 */
var pattern = [0, 1, 0, -1];
for (var phases = 0; phases < 100; phases++) {
    console.log(phases);
    var newPhase = new Array();
    for (var times = 1; times <= phase.length; times++) {
        var sum = 0;
        var actualPattern = new Array;
        var patternIndex = times;
        for (var i = 0; i < pattern.length; i++) {
            for (var a = 0; a < times; a++) {
                if (actualPattern.length < phase.length + 1) {
                    actualPattern.push(pattern[i]);
                } else {
                    i = pattern.length;
                    a = times;
                }
            }
        }
        for (var i = patternIndex - 1; i < phase.length; i++) {
            if (actualPattern[patternIndex] !== 0){
                sum = sum + (parseInt(phase[i]) * actualPattern[patternIndex]);
                patternIndex = patternIndex + 1 === actualPattern.length ? 0 : patternIndex + 1;
            }
        }
        var tmp = sum.toString().split('');
        newPhase.push(tmp[tmp.length - 1]);
    }
    phase = newPhase;
    //console.log(newPhase.join());
}
var res = phase.slice(offset, 8);
console.log(res.join(''));