/* script.js */

// TODO Start button



// EVENT LISTENERS
$(startButton).on('click', startGame);

$(responseButton).on('click', submitResponse);



// GAME FUNCTIONS
// Start
function startGame() {
	displayCard();
}

// Display Card
function displayCard() {
	// TODO show first card
	$('#flashcard .prompt').html(cards[0].q);
}

// Submit Response, check for correctness
function submitResponse() {
	if ($(responseField).val() === 'Nick') {
		console.log("Correct!");
	}
	// if correct, take out of list
	// if wrong, keep in list
	// go to next card
	// TODO randomize wrong cards order
}

function nextCard() {

}




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
