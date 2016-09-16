/* script.js */

// GLOBAL VARIABLES
var currentCard = 0; // counter for cards list

// EVENT LISTENERS
$(startButton).on('click', startGame);

$(responseButton).on('click', submitResponse);

$(responseField).keypress(function(e) {
	if (e.which == 13) {
		e.preventDefault();
		submitResponse();
		clearInput();
		// TODO clear input field
		// TODO disable return character
	}
});


// GAME FUNCTIONS
// Start
startGame();

function startGame() {
	currentCard = 0; // reset card counter
	displayBoard();
	$(responseField).focus();
	nextCard();
}

// Display Board
function displayBoard() {
	$(flashcard).css('visibility', 'visible');
	$('.response-container').css('visibility', 'visible');
}

// Submit Response, check for correctness
function submitResponse() {
	console.log($(responseField).html() + '... expected: ' + cards[currentCard].a);
	if ($(responseField).html() == cards[currentCard].a) {
		console.log("Correct!");
	}
	currentCard++; // move to next card
	nextCard();
	// if correct, take out of list
	// if wrong, keep in list
	// go to next card
	// TODO randomize wrong cards order
}

function nextCard() {
	$('#flashcard .prompt').html(cards[currentCard].q);
}

function clearInput() {
	$(responseField).html('');
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
