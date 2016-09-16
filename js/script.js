/* script.js */

// TODO Start button
function startGame() {
	displayCard();
}

function displayCard() {
	// TODO show first card
	$('#flashcard .prompt').html(cards[0].q);
}

// EVENT LISTENERS
$(startButton).on('click', startGame);

// TODO Write card flip function

// TODO Write next card function

// TODO If wrong, keep card in rotation, randomize. If correct, remove from queue

// TODO Scoreboard function



// TODO SUBMISSION
/*
Deploy online

*/

// TODO
// TODO Write your own cards
// TODO Card animations

// TODO add 5 user stories
