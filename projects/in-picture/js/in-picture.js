'use strict';

var gQuests = [
    { id: 1, opt: [`Lanscape`, `Water`, `Snow`, `Mountain`], corrOptIdx: 2 },
    { id: 2, opt: [`Sky`, `Car`, `Desert`, `Vication`], corrOptIdx: 1 },
    { id: 3, opt: [`Black`, `Love`, `Red`, `Circle`], corrOptIdx: 2 },
    { id: 4, opt: [`Desserts`, `Cookies`, `Cakes`, `White`], corrOptIdx: 0 },
    { id: 5, opt: [`Mountain`, `Cloud`, `Animals`, `Road`], corrOptIdx: 0 },
    { id: 6, opt: [`Sunrise`, `Light`, `Sky`, `Sunset`], corrOptIdx: 3 }
];

var gCurrQuestsIdx = 0;
var gIsProcessing = false;


function initGame(elButton) {
    var elOptions = document.querySelector(`.options`);
    var elHeaderSpan = document.querySelector (`.header span`);
    gCurrQuestsIdx = 0;
    renderQuests();
    elHeaderSpan.classList.remove (`restart`);
    elHeaderSpan.innerHTML = `Good Luck 🤞`;
    elOptions.style.display = `inline-block`;
    elButton.style.display = `none`;
    elButton.innerHTML = `Restart`;
}

function cheackAnswer(elAnswer) {
    var elAnswers = document.querySelector(`.options`);
    var answerIdx = elAnswer.getAttribute(`data-idx`);
    var rightOpt = gQuests[gCurrQuestsIdx].corrOptIdx + '';
    var elPic = document.querySelector(`.pic`);
    var isCorrect = (answerIdx === rightOpt);
    elPic.style.transition = `100ms`;
    
    //multiply answers bug
    if (gIsProcessing) return;

    //if user pressed the right answer
    if (isCorrect) {
        gIsProcessing = true;
        elAnswer.style.backgroundColor = `green`;
        elPic.innerHTML = `<img src="/projects/in-picture/pictures/correct.jpg" alt="">`;
        gCurrQuestsIdx++;
        setTimeout(function () { renderQuests(); }, 1500);
        // check winning
        if (gCurrQuestsIdx > 5) {
            setTimeout(function () {
                elPic.innerHTML = `<img src="/projects/in-picture/pictures/winner.png" alt="">`;
                elAnswers.style.display = `none`;
                restartButton();
            }, 1000);
        }
        // if user pressed wrong answer
    } else {
        gIsProcessing = true;
        elAnswer.style.backgroundColor = `red`;
        elPic.innerHTML = `<img src="/projects/in-picture/pictures/incorrect.png" alt="">`;
        restartButton();
    }
}

function restartButton() {
    var elHeaderSpan = document.querySelector (`.header span`);
    var elButton = document.querySelector(`.header button`);
    elButton.style.display = `block`;
    elHeaderSpan.classList.add (`restart`);
    elHeaderSpan.innerHTML = `Play Again?`;
}

function renderQuests() {
    var strHTML = ``;
    var elPic = document.querySelector(`.pic`);
    elPic.innerHTML = `<img src="/projects/in-picture/pictures/${gCurrQuestsIdx}.jpeg" alt="">`;
    for (var i = 0; i < 4; i++) {
        var currOpt = gQuests[gCurrQuestsIdx].opt[i];
        strHTML += `<div class="answers" data-idx="${i}" onclick="cheackAnswer(this)"> ${currOpt}</div>`;
    }
    var elOpt = document.querySelector(`.options`)
    elOpt.innerHTML = strHTML;
    gIsProcessing = false;
}

