'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  createQuestsTree();
}

function onStartGuessing() {
  // hide the game-start and game-win section
  $('.game-win').hide();
  $('.game-start').hide();
  renderQuest();
  // show the quest section
  $('.quest').show();
}

function renderQuest() {
  // select the <h2> inside quest and update its text by the currQuest text
  var currQuest = getCurrQuest();
  $('.quest h2').text(currQuest.txt);
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      onWin();

    } else {
      // hide and show new-quest section
      // alert('I dont know...teach me!');
      $('.quest').hide();
      $('.new-quest').show();
    }
  } else {
    // update the lastRes global var
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();
  }
}

// on computer right Guess
function onWin() {
  $('.quest').hide();
  $('.game-win').show();
  createQuestsTree();
}

function onAddGuess(ev) {
  ev.preventDefault();
  // Get the inputs' values
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  // Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes);
  $('#newGuess').val('');
  $('#newQuest').val('');
  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  gLastRes = null;
}
