'use strict'
console.log('💣 Find Those Mines! 💣');


const MINE = '💣';
const FLAG = '🚩';
const EMPTY = '';
const LIFE = '❤';
const HINT = '❓';



var gBoard = [];
var gStartTime = null;

// game variables
var gGame = {
    isOn: false,
    isWin: false,
    isFirstClick: true,
    life: 0,
    flagLeft: 0,
    timerInter: null,
    cellsRevealed: 0,
    isHint: false,
    hints: 0,
};
// level variables
var gLevel = {
    boardSize: 16,
    mineCount: 2,
    lifeCount: 0,
    hintCount: 0,
};


function initGame() {
    clearInterval(gGame.timerInter);
    gBoard = [];
    gStartTime = null;
    gGame.isFirstClick = true;
    gGame.isOn = true;
    gGame.isWin = false;
    gGame.cellsRevealed = 0
    gGame.life = gLevel.lifeCount;
    gGame.flagLeft = gLevel.mineCount;
    gGame.isHint = false;
    gGame.hints = gLevel.hintCount;
    gBoard = buildBoard()
    renderBoard(gBoard, '.mine-board');

    printFlagCount();
    printGameBtn();
    printLife();
    printHintBtn();
}

// create board
function buildBoard() {
    var board = [];
    var length = Math.sqrt(gLevel.boardSize);
    for (var i = 0; i < length; i++) {
        board.push([]);     // push rows
        for (var j = 0; j < length; j++) {
            var currCell = {       //create cell
                minesAroundCount: 0,
                isMine: false,
                isFirst: false,
                isShown: false,
                isMarked: false,
            }
            board[i][j] = currCell;
        }
    }
    return board;
}

// create mines
function createMines(board) {
    var length = Math.sqrt(gLevel.boardSize);
    for (var k = 0; k < gLevel.mineCount; k++) {
        var i = getRandomIntInclusive(0, length - 1);
        var j = getRandomIntInclusive(0, length - 1);
        if (board[i][j].isMine || board[i][j].isFirst) {
            k--;
            continue;
        } else board[i][j].isMine = true;
    }
}

// cell click activation
function cellClicked(elCell) {
    // check if game won or lost
    if (gGame.isWin || !gGame.isOn) return;
    //check if first click
    if (gGame.isFirstClick) firstClick(elCell);

    var row = +elCell.dataset.i;
    var col = +elCell.dataset.j;
    var currCell = gBoard[row][col];

    // check if hint is active
    if (gGame.isHint && gGame.hints > 0) {
        printHintBtn();
        activateHint(row, col);
        gGame.isHint = false;
        gGame.hints--;
        return;
    }

    if (currCell.isMarked || currCell.isShown) return
    currCell.isShown = true;
    if (currCell.minesAroundCount > 0) {
        elCell.innerHTML = currCell.minesAroundCount;
        elCell.style.backgroundColor = 'white';
    }
    if (currCell.minesAroundCount === 0 && !currCell.isMine) {
        elCell.style.backgroundColor = 'white';
        expandShow(row, col);
    }
    if (currCell.isMine) {
        elCell.innerHTML = MINE;
        elCell.style.backgroundColor = 'red';
        gGame.life--;
        printLife();
    }
    gGame.cellsRevealed++;

    // check if lose/win
    if (gGame.life < 0) gGame.isOn = false;
    if (gGame.cellsRevealed === gLevel.boardSize) {
        gGame.isWin = true;
        gGame.isOn = false;
    }
    checkGameOver()
}

// cell marked activation
function cellMarked(elCell) {
    event.preventDefault();
    if (gGame.isWin || !gGame.isOn) return;
    if (gGame.isFirstClick) {
        firstClick(elCell);
        setMinesNegsCount(gBoard);
    }
    var currCell = getElementData(elCell, gBoard);

    if (currCell.isShown) return;
    if (!currCell.isMarked) {
        if (gGame.flagLeft <= 0) return;
        currCell.isMarked = true;
        elCell.innerHTML = FLAG;
        gGame.flagLeft--;
        gGame.cellsRevealed++;
    } else {
        currCell.isMarked = false;
        elCell.innerHTML = EMPTY;
        gGame.flagLeft++;
        gGame.cellsRevealed--;
    }

    printFlagCount()
    
    // check win
    if (gGame.cellsRevealed === gLevel.boardSize) {
        gGame.isWin = true;
        gGame.isOn = false;
    }
    checkGameOver();
}

// first click activation
function firstClick(elCell) {
    gGame.isFirstClick = false;
    gStartTime = Date.now();
    gGame.timerInter = setInterval(timerSet, 1000);
    var currCell = getElementData(elCell, gBoard);
    currCell.isFirst = true;
    createMines(gBoard);
    setMinesNegsCount(gBoard)
}

// set mines neighbors 
function setMinesNegsCount(board) {
    var length = Math.sqrt(gLevel.boardSize);
    for (var i = 0; i < length; i++) {
        for (var j = 0; j < length; j++) {
            board[i][j].minesAroundCount = countMinesNeighbors(board, i, j);
        }
    }
}
// count mines neighbors
function countMinesNeighbors(mat, cellI, cellJ) {
    var neighborsSum = 0;
    for (var i = cellI - 1; i <= (cellI + 1); i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= (cellJ + 1); j++) {
            if (j < 0 || j >= mat[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (mat[i][j].isMine) neighborsSum++;
        }
    }
    return neighborsSum;
}

// check if game over
function checkGameOver() {
    // game active
    if (gGame.isOn && !gGame.isWin) return;
    clearInterval(gGame.timerInter)
    // victory
    if (gGame.isWin &&
        gGame.life > 0) {
        console.log('Winner!');
    }
    // lose
    if (!gGame.isOn && !gGame.isWin) {
        showMines();
        console.log('Try Again');
    }
    printGameBtn();
}

// expand no mines cells and show neigbors
function expandShow(row, col) {
    for (var i = row - 1; i <= (row + 1); i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = col - 1; j <= (col + 1); j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            if (i === row && j === col) continue;
            var ngbCell = gBoard[i][j];
            if (ngbCell.isShown) continue;
            var elNgbCell = document.querySelector(`.cell-${i}-${j}`);
            cellClicked(elNgbCell)
        }
    }
}

// toggle levels
function levelClick(elLevel) {
    gLevel.boardSize = +elLevel.dataset.size;
    gLevel.lifeCount = +elLevel.dataset.life;
    gLevel.mineCount = +elLevel.dataset.mines;
    gLevel.hintCount = +elLevel.dataset.hint;
    initGame();
}

// toggle hint 
function toggleHint() {
    if (gGame.isFirstClick) return;
    if (gGame.isHint) gGame.isHint = false;
    else gGame.isHint = true;
    printHintBtn();
}
// show hint
function activateHint(row, col) {
    for (var i = row - 1; i <= (row + 1); i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = col - 1; j <= (col + 1); j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            var ngbCell = gBoard[i][j];
            if (ngbCell.isShown) continue;
            var elNgbCell = document.querySelector(`.cell-${i}-${j}`);
            elNgbCell.style.backgroundColor = 'yellow';
            if (ngbCell.isMine) {
                elNgbCell.innerHTML = MINE;
                elNgbCell.style.backgroundColor = 'c97d7d';
            }
            else if (ngbCell.minesAroundCount > 0) elNgbCell.innerHTML = ngbCell.minesAroundCount;
        }
    }
    setTimeout(function () {
        disactivateHint(row, col);
        gGame.isHint = false;
        printHintBtn();
    }, 1000);
}

// hide hint
function disactivateHint(row, col) {
    for (var i = row - 1; i <= (row + 1); i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = col - 1; j <= (col + 1); j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            var ngbCell = gBoard[i][j];
            if (ngbCell.isShown) continue;
            var elNgbCell = document.querySelector(`.cell-${i}-${j}`);
            elNgbCell.style.backgroundColor = '#bfd39f';
            if (ngbCell.isMarked) elNgbCell.innerHTML = FLAG;
            else elNgbCell.innerHTML = '';
        }
    }
}

