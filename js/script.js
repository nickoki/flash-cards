/* script.js */

// GLOBAL VARIABLES
var currentCard = 0; // counter for cards list
var numCorrect = 0;


// GAME FUNCTIONS
// Start
startGame();

// Start game
function startGame() {
	currentCard = 0;
	displayBoard();
	initScoreboard();
	printScore();
	clearInput();
	$(responseField).focus();
	// Update flashcard
	$('#flashcard .prompt').html(cards[currentCard].q);
	// Update scorboard overview
	$('#overview li').eq(currentCard).addClass('active');
	$('.overview-value').eq(currentCard).html(cards[currentCard].q);
}

// End game
function endGame() {
	$('#flashcard .prompt').html("Congratulations! You're all done!");
	$('.response-container').css('visibility', 'hidden');
	$(responseField).blur();
}

// Display Board
function displayBoard() {
	$(flashcard).css('visibility', 'visible');
	$('.response-container').css('visibility', 'visible');
}

// Submit Response, check for correctness
function submitResponse() {
	var res = $(responseField).html().toLowerCase(); // TODO Create cards function, format input
	// check is response was right or wrong
	if (res == cards[currentCard].a) {
		updateScore(true);
	} else if (res != '') {
		updateScore(false);
	}
	// Check if all cards are correct
	if (numCorrect === cards.length) {
		$('#overview li').eq(currentCard).removeClass('active');
		endGame();
	} else {
		nextCard();
	}
	// TODO Randomize wrong cards order
}



// CARD FUNCTIONS
// Move to next card in stack
function nextCard() {
	$('#overview li').eq(currentCard).removeClass('active');
	// Move to next unanswered/incorrect card
	currentCard++;
	// Check for last card
	if (currentCard >= cards.length) {
		// If last card, return to start
		currentCard = 0;
	}
	//Skip if already correct
	while (cards[currentCard].status === 'correct') {
		currentCard++;
		// Check for last card again
		if (currentCard >= cards.length) {
			// If last card, return to start
			currentCard = 0;
		}
	}
	// Update flashcard
	$('#flashcard .prompt').html(cards[currentCard].q);
	// Update scorboard overview
	$('#overview li').eq(currentCard).addClass('active');
	$('.overview-value').eq(currentCard).html(cards[currentCard].q);
	// TODO Add show all button
}

// Previous Card
function previousCard() {
	$('#overview li').eq(currentCard).removeClass('active');
	currentCard--;
	if (currentCard < 0) {
		// If last card, return to start
		currentCard = cards.length-1;
	}
	while (cards[currentCard].status === 'correct') {
		currentCard--;
		console.log(currentCard);
		if (currentCard < 0) {
			// If last card, return to start
			currentCard = cards.length-1;
		}
	}

	$('#flashcard .prompt').html(cards[currentCard].q);
	$('#overview li').eq(currentCard).addClass('active');
	$('.overview-value').eq(currentCard).html(cards[currentCard].q);
}

// Show card
function showCard(i) {
	currentCard = i;
	$('#flashcard .prompt').html(cards[i].q);
	$('.overview-value').eq(currentCard).html(cards[currentCard].q);
}



// SCOREBOARD FUNCTIONS
// Initialize scoreboard
function initScoreboard() {
	for (var i = 0; i < cards.length; i++) {
		//var scoreboardCard = '<li><span class="overview-status"><i class="fa fa-square-o" aria-hidden="true"></i></span><span class="overview-value">'+ cards[i].q + '</span></li>';
		var scoreboardCard = '<li data-index="' + i + '"><span class="overview-status"><i class="fa fa-square-o" aria-hidden="true"></i></span><span class="overview-value">. . .</span></li>';
		$(overview).append(scoreboardCard);
	}
}

// Update score
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

// Correct response
function setCorrect() {
	numCorrect++;
	cards[currentCard].status = 'correct'; // TODO if correct, skip in card list
	$('.overview-status').eq(currentCard).html('<i class="fa fa-check" aria-hidden="true"></i>');
	$('.overview-status').eq(currentCard).parent().css('color', '#a0d468');
}

// Incorrect response
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
// Start button click
$(startButton).on('click', startGame);

// Response submission click
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

// Overview click
$('#overview li').on('click', function() {
	console.log(currentCard);
	$('#overview li').eq(currentCard).removeClass('active');
	showCard($(this).attr('data-index'));
	$(this).addClass('active');
	$(responseField).focus();
})

// Previous Card
$(previous).on('click', function() {
	previousCard();
	$(responseField).focus();
})

$(next).on('click', function() {
	nextCard();
	$(responseField).focus();
})





// TODO Write card flip animation function

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
