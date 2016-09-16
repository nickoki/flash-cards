/* script.js */

// GLOBAL VARIABLES
var currentCard = 0;

// EVENT LISTENERS
$(startButton).on('click', startGame);

$(responseButton).on('click', submitResponse);



// GAME FUNCTIONS
// Start
function startGame() {
	currentCard = 0; // reset card counter
	displayCard(currentCard);
}

// Display Card
function displayCard(currentCard) {
	// TODO show first card
	nextCard(currentCard);
}

// Submit Response, check for correctness
function submitResponse() {
	if ($(responseField).val() === cards[currentCard].a) {
		console.log("Correct!");
	}
	currentCard++; // move to next card
	nextCard(currentCard);
	// if correct, take out of list
	// if wrong, keep in list
	// go to next card
	// TODO randomize wrong cards order
}

function nextCard(currentCard) {
	$('#flashcard .prompt').html(cards[currentCard].q);
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
