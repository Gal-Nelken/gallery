`use strict`
console.log(`Touch The Numbers`);

var WRONG_SOUND = new Audio(`./sound/Wrong Answer.mp3`);
var WIN_SOUND = new Audio(`./sound/win sound.mp3`);

var gGameNums = [];
var gMistakeCount = 0;
var gNextIdx = 0;
var gBoardSize = 16;
var gIsGameOn = false;
var gIsWin = false;
var gDifficultyLvl = 'easy';
var gStartTime;
var gGameInter;


function initGame() {
    gIsWin = false;
    gIsGameOn = false;
    gStartTime = null;
    gMistakeCount = 0;
    gNextIdx = 0;
    resetNums();
    renderBoard();
    restartButton();
}

function renderBoard() {
    var idx = 0;
    var strHTML = '';
    for (var i = 0; i < Math.sqrt(gBoardSize); i++) {
        strHTML += '<tr>';
        for (var j = 0; j < Math.sqrt(gBoardSize); j++) {
            var currIdx = gGameNums[idx].id
            strHTML += `<td data-idx=${currIdx} onclick="cellClicked(this)" class="game-cell">${gGameNums[idx].num}</td>`;
            idx++;
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function cellClicked(elNum) {
    if (gIsWin) return;
    var numIdx = +elNum.getAttribute(`data-idx`);
    var currNum = getNumById(numIdx);
    if (currNum.isClicked) return;
    gIsGameOn = true;
    //check if game has started
    if (!gNextIdx) {
        gStartTime = Date.now();
        gGameInter = setInterval(renderPlayerTab, 100)
    }
    // check if correct
    if (numIdx === gNextIdx) {
        elNum.style.backgroundColor = 'black';
        gNextIdx++;
        currNum.isClicked = true;
        //check if win
        if (gNextIdx === gBoardSize) {
            gIsWin = true;
            gIsGameOn = false;
            WIN_SOUND.play();
            gGameInter = clearInterval(gGameInter);
        }
        // if mistake
    } else {
        gMistakeCount++;
        WRONG_SOUND.play();
    }
    restartButton();
}

function getNumById(id) {
    for (var i = 0; i < gGameNums.length; i++) {
        var currNum = gGameNums[i];
        if (currNum.id === id) return currNum
        else null
    }
}

function restartButton() {
    var elButton = document.querySelector(`.player-tab button`);
    if (gIsGameOn) elButton.style.display = 'none';
    else elButton.style.display = 'block';
    if (!gIsWin) elButton.innerHTML = `Shuffle Numbers`;
    else elButton.innerHTML = `Play Again?`;
}


function renderPlayerTab() {
    var elTimer = document.querySelector(".timer")
    var elMistakes = document.querySelector('.mistakes')
    var currTime = Date.now();
    var timer = `Time: ${(currTime - gStartTime) / 1000}sec`;
    elTimer.innerHTML = timer;
    elMistakes.innerHTML = `Mistakes: ${gMistakeCount}`;
}

function levelClick(elLevel) {
    if (gIsGameOn) return
    gBoardSize = +elLevel.dataset.num;
    gDifficultyLvl = elLevel.dataset.difficulty;
    initGame();
}

function resetNums() {
    var numsValue = []
    for (var i = 0; i < gBoardSize; i++) {
        if (gDifficultyLvl === `easy`) {
            numsValue.push({ num: i + 1, id: i, isClicked: false });
        }
        if (gDifficultyLvl === `medium`) {
            numsValue.push({ num: i + 3, id: i, isClicked: false });
        }
        if (gDifficultyLvl === `hard`) {
            numsValue.push({ num: (i + 2) * 4, id: i, isClicked: false });
        }
    }
    arrayShuffle(numsValue);
    gGameNums = numsValue.slice()
}

