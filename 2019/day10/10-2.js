var input = ".#..##.###...#######\n##.############..##.\n.#.######.########.#\n.###.#######.####.#.\n#####.##.#.##.###.##\n..#####..#.#########\n####################\n#.####....###.#.#.##\n##.#################\n#####.##.###..####..\n..######..##.#######\n####.##.####...##..#\n.#####..#.######.###\n##...#.##########...\n#.##########.#######\n.####.#.###.###.#.##\n....##.##.###..#####\n.#.#.###########.###\n#.#.#.#####.####.###\n###.##.####.##.#..##".split("\n");


var points = new Array();
input.forEach(function (rows, indexRow) {
    var row = rows.split('');
    row.forEach(function (element, indexColumn) {
        if (element === '#') {
            points.push({'x': indexColumn, 'y': indexRow});
        }
    });
});
var max = 0;
var winner = '';

points.forEach(function (element, index) {
    var slopes = new Array();
    var allSlopes = new Object();
    points.forEach(function (element1, index1) {
        if (index !== index1) {
            var slope = Math.atan2((element1.x - element.x), (element1.y - element.y));
            if (allSlopes[slope] === undefined) {
                allSlopes[slope] = new Array();
            }
            element1.id = index1;
            allSlopes[slope].push(element1);
            if (slopes.indexOf(slope) === -1) {
                slopes.push(slope);
            }
        }
    });
    if (slopes.length > max) {
        max = slopes.length;
        winner = element;
        winner.slopes = allSlopes;
    }
});

//console.log(winner);

var pointCopy = JSON.parse(JSON.stringify(points));

var count = 0;
var the200th = null;
while (count < 200) {
    var x = 0;
    var y = 0;
    for (var i = 0; i < 360; i++) {
        var atan2 = Math.atan2(x, y);
        if (winner.slopes[atan2] !== undefined) {
            var toDelete = null;
            var min = null;
            var id = 0;
            winner.slopes[atan2].forEach(function (element, index) {
                var dist = Math.sqrt((element.x - winner.x) ^ 2 + (element.y - winner.y) ^ 2);
                if (min === null || min > dist) {
                    min = dist;
                    toDelete = element;
                    id = index;
                }
            });
            
            
            winner.slopes[atan2].slice(id, 1);
            
            
            point.splice(pointCopy[toDelete.id],1);
            
            
            count++;
            if (count === 200) {
                the200th = toDelete;
                console.log(toDelete);
            }

        }
         

        if (i < 90) {
            x++;
            y++;
        } else if (i < 180) {
            x--;
            y++;
        } else if (i < 270) {
            x--;
            y--;
        } else {
            x++;
            y--;
        }
    }
}

console.log(the200th);