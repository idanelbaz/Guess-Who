'use strict';

var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
    $('.alert').text('')
}

function onStartGuessing() {
    $('.game-start').hide();
    renderQuest();
    $('.quest').show();
}

function renderQuest() {
    $('.quest h2').text(gCurrQuest.txt);
}

function onUserResponse(res) {

    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            $('.alert').text('Yes, I knew it!')
                // TODO: improve UX
        } else {
            $('.alert').text('I dont know...teach me!')
                // TODO: hide and show new-quest section
            $('.quest').hide();
            $('.new-quest').show();

        }
    } else {
        // TODO: update the lastRes global var
        gLastRes = res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    var elInputThinking = $('.name').val();
    var elInputNewQuest = $('.question').val();

    console.log(elInputNewQuest, elInputThinking);

    // TODO: Call the service addGuess
    addGuess(elInputNewQuest, elInputThinking, gLastRes);
    onRestartGame();
}


function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
    init();

}