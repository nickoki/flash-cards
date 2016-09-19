/* script.js */

// GLOBAL VARIABLES
var currentCard = 0; // counter for cards list



// GAME FUNCTIONS
// Start
startGame();

function startGame() {
	currentCard = -1; // reset card counter
	displayBoard();
	initScoreboard();
	printScore();
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
	nextCard();
	// if correct, take out of list
	// if wrong, keep in list
	// go to next card
	// TODO randomize wrong cards order
}

// Move to next card in stack
function nextCard() {
	$('#overview li').eq(currentCard).removeClass('active');
	currentCard++; // Move to next card
	// check for last card
	if (currentCard >= cards.length) {
		console.log("End of cards");
	} else {
		// Update flashcard
		$('#flashcard .prompt').html(cards[currentCard].q);
		// Update scorboard overview
		$('#overview li').eq(currentCard).addClass('active');
		$('.overview-value').eq(currentCard).html(cards[currentCard].q);
		// TODO add show all button
	}
}

// Show card
function showCard(i) {
	currentCard = i;
	$('#flashcard .prompt').html(cards[i].q);
	$('.overview-value').eq(currentCard).html(cards[currentCard].q);

}



// SCOREBOARD

// Initialize scoreboard
function initScoreboard() {
	for (var i = 0; i < cards.length; i++) {
		//var scoreboardCard = '<li><span class="overview-status"><i class="fa fa-square-o" aria-hidden="true"></i></span><span class="overview-value">'+ cards[i].q + '</span></li>';
		var scoreboardCard = '<li data-index="' + i + '"><span class="overview-status"><i class="fa fa-square-o" aria-hidden="true"></i></span><span class="overview-value">. . .</span></li>';
		$(overview).append(scoreboardCard);
	}
}

function updateScore(isCorrect) {
	// TODO tally score
	// if correct
	if (isCorrect) {
		setCorrect();
		// TODO add skip button
	} else {
		setIncorrect();
	}
	printScore();
	// Update overview
}

function setCorrect() {
	cards[currentCard].status = 'correct'; // TODO if correct, skip in card list
	$('.overview-status').eq(currentCard).html('<i class="fa fa-check" aria-hidden="true"></i>');
	$('.overview-status').eq(currentCard).parent().css('color', '#a0d468');
}

function setIncorrect() {
	cards[currentCard].status = 'incorrect';
	$('.overview-status').eq(currentCard).html('<i class="fa fa-times" aria-hidden="true"></i>');
	$('.overview-status').eq(currentCard).parent().css('color', '#ed5565');
}

// Print scoreboard changes to DOM
function printScore() {
	var numRemaining = cards.length;
	var numCorrect = 0;
	var numIncorrect = 0;
	// count correct and incorrect cards in stack
	for (var i = 0; i < cards.length; i++) {
		if (cards[i].status === 'correct') {
			numCorrect++;
			numRemaining--;
		} else if (cards[i].status === 'incorrect') {
			numIncorrect++;
		}
	}
	// update DOM
	$(scoreboardTotalCards).html(cards.length);
	$(scoreboardRemainingCards).html(numRemaining);
	$(scoreboardCorrect).html(numCorrect);
	$(scoreboardIncorrect).html(numIncorrect);
}



// HELPER FUNCTIONS
// Clear response input field
function clearInput() {
	$(responseField).html('');
}



// EVENT LISTENERS
$(startButton).on('click', startGame);

$(responseButton).on('click', submitResponse);

// Response submission [enter]
$(responseField).keypress(function(e) {
	if (e.which == 13) {
		e.preventDefault();
		submitResponse();
		clearInput();
		// TODO clear input field
		// TODO disable return character
	}
});

// Scoreboard overview click
//$('#overview li').on('click', showCard($(this).attr('data-index')));

$('#overview li').on('click', function() {
	console.log(currentCard);
	$('#overview li').eq(currentCard).removeClass('active');
	showCard($(this).attr('data-index'));
	$(this).addClass('active');
	$(responseField).focus();
})





// TODO Write card flip animation function

// TODO If wrong, keep card in rotation, randomize. If correct, remove from queue

// TODO Scoreboard function

// TODO fix holy grail layout

// TODO next and previous cards function and buttons

// TODO SUBMISSION
/*
Deploy online

*/

// TODO
// TODO Write your own cards
// TODO Card animations

// TODO add 5 user stories

// TODO Card list on side bar
