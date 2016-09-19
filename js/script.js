/* script.js */

// GLOBAL VARIABLES
var currentCard = 0; // counter for cards list
var numCorrect = 0;
var numIncorrect = 0;



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
	initScoreboard();
	clearInput();
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
		updateScore(true);
	} else {
		updateScore(false);
	}
	currentCard++; // move to next card
	nextCard();
	// if correct, take out of list
	// if wrong, keep in list
	// go to next card
	// TODO randomize wrong cards order
}

// Move to next card in stack
function nextCard() {
	// check for last card
	if (currentCard >= cards.length) {
		console.log("End of cards");
	} else {
		// Update flashcard
		$('#flashcard .prompt').html(cards[currentCard].q);
		// Update scorboard preview
		$('.preview-value').eq(currentCard).html(cards[currentCard].q);
		// TODO add show all button
	}
}

// SCOREBOARD

// Initialize scoreboard
function initScoreboard() {
	for (var i = 0; i < cards.length; i++) {
		//var scoreboardCard = '<li><span class="preview-status"><i class="fa fa-square-o" aria-hidden="true"></i></span><span class="preview-value">'+ cards[i].q + '</span></li>';
		var scoreboardCard = '<li><span class="preview-status"><i class="fa fa-square-o" aria-hidden="true"></i></span><span class="preview-value">. . .</span></li>';
		$(scoreboardList).append(scoreboardCard);
	}
}

function updateScore(isCorrect) {
	// TODO tally score
	// if correct
	if (isCorrect) {
		console.log("Correct!");
		numCorrect++;
		$('.preview-status').eq(currentCard).html('<i class="fa fa-check" aria-hidden="true"></i>');
		$('.preview-status').eq(currentCard).parent().css('color', '#a0d468');
		//$('.preview-value').eq(currentCard).css('text-decoration', 'line-through');
		// TODO add skip button
	} else {
		console.log("Incorrect");
		numIncorrect++;
		$('.preview-status').eq(currentCard).html('<i class="fa fa-times" aria-hidden="true"></i>');
		$('.preview-status').eq(currentCard).css('color', '#ed5565');
	}
	printScore();
	// Update scoreboardList
}

function printScore() {
	$(scoreboardCorrect).html(numCorrect);
	$(scoreboardIncorrect).html(numIncorrect);
}


// HELPER FUNCTIONS
// Clear response input field
function clearInput() {
	$(responseField).html('');
}




// TODO Write card flip animation function

// TODO If wrong, keep card in rotation, randomize. If correct, remove from queue

// TODO Scoreboard function

// TODO fix holy grail layout



// TODO SUBMISSION
/*
Deploy online

*/

// TODO
// TODO Write your own cards
// TODO Card animations

// TODO add 5 user stories

// TODO Card list on side bar
