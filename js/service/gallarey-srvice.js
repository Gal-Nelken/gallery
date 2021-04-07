'use strict'

var gProj = [
    {
        name: 'book-shop',
        title: 'Book-Shop',
        intro: 'Manage your book store',
        desc: 'Here you can add a new book\'s to your book shop, update book\'s quantity and price, remove a book from store or view it in a side modal. ',
        publishedAt: 'April 2021',
        url: 'projects/book-shop',
        labels: [''],
    }, {
        name: 'guess-who',
        title: 'Guess Who',
        intro: 'I know who you are thinking off...',
        desc: 'In this game, you need to think of someone and the program will try to guess who you thought of. Dont worry, he\'s not that good. If you win (most propably) submit who you thought of and a guidline question to that answer so he would know better next time.',
        publishedAt: 'April 2021',
        url: 'projects/guess-who',
        labels: [''],
    }, {
        name: 'in-picture',
        title: 'In-Picture',
        intro: 'What\' the word that hide in the picture ',
        desc: 'In this game you\'ll see a picture and need to guess the right answer.',
        publishedAt: 'March 2021',
        url: 'projects/in-picture',
        labels: [''],
    }, {
        name: 'mine-sweeper',
        title: 'Mine Sweeper',
        intro: 'Find Those Mines!',
        desc: 'In this classic game you need to flag all the mines and reveal the non-mined squers. In diffrence of the classic game, in medium and hard levels you can use a hint (press the questionmark if he\'s leate) and have life (look at the left side of the game bar to know how many lives do you have).',
        publishedAt: 'March 2021',
        url: 'projects/mine-sweeper',
        labels: [''],
    }, {
        name: 'touch-the-nums',
        title: 'Touch The Numbers',
        intro: 'How sharp you think you are?',
        desc: 'In these project you need to press the number\'s in the right order, harder levels have more number squers, timer will record your time till finish.',
        publishedAt: 'March 2021',
        url: 'projects/touch-the-nums',
        labels: [''],
    },
];

function getUrl(subject, body) {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=galnelken07@gmail.com&su=${subject}&body=${body}`
}


function getProjs() {
    return gProj;
}

