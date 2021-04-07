`use strict`

function arrayShuffle(array) {
    var newPos;
    var temp;
    for (var i = array.length - 1; i > 0; i--) {
        newPos = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[newPos];
        array[newPos] = temp;
    }
    return array;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}