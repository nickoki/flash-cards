/* script.js */



// GLOBAL VARIABLES
var myDecks = JSON.parse(localStorage.getItem('Flashcard Decks'));
var currentDeck = 0;
var currentCard = 0; // counter for cards list
var numCorrect = 0;


// GAME FUNCTIONS
// Start game
function startGame() {
	// TODO fix "overstart"
	toggleStartButton();

	currentCard = 0;

	displayFlashcard();
	displayArrows();
	displayInput();


	clearOverview();
	initScoreboard();
	resetScore();
	printScore();
	clearInput();
	$(responseField).focus();
	// Update flashcard
	$('#flashcard .prompt').html(myDecks[currentDeck].cards[currentCard].q);
	// Update scorboard overview
	$('#overview li').eq(currentCard).addClass('active');
	$('.overview-value').eq(currentCard).html(myDecks[currentDeck].cards[currentCard].q);
}

// Toggle Functions
function toggleStartButton() {
	if ($(startButton).has('.disabled')) {
		$(startButton).removeClass('disabled');
	} else {
		$(startButton).addClass('disabled');
	}
}



// TODO Reset game function


// End game
function endGame() {
	$('#flashcard .prompt').html("Congratulations! You're all done!");
	$('.response-container').css('visibility', 'hidden');
	$(previous).css('visibility', 'hidden');
	$(next).css('visibility', 'hidden');
	$(responseField).blur();
	$(overview).children().css('pointer-events', 'none');
}

// DISPLAY FUNCTIONS
function displayFlashcard() {
	$(flashcard).css('visibility', 'visible');
}

function hideFlashcard() {
	$(flashcard).css('visibility', 'hidden');
}

function displayArrows() {
	$(previous).css('visibility', 'visible');
	$(next).css('visibility', 'visible');
}

function hideArrows() {
	$(previous).css('visibility', 'hidden');
	$(next).css('visibility', 'hidden');
}

function displayInput() {
	$('.response-container').css('visibility', 'visible');
}

function hideInput() {
	$('.response-container').css('visibility', 'hidden');
}

/*
function displayBoard() {
	$(flashcard).css('visibility', 'visible');
	$('.response-container').css('visibility', 'visible');
}*/

// Submit Response, check for correctness
function submitResponse() {
	var res = $(responseField).html().toLowerCase(); // TODO Create cards function, format input
	// check is response was right or wrong
	if (res == myDecks[currentDeck].cards[currentCard].a) {
		updateScore(true);
	} else if (res != '') {
		updateScore(false);
	}
	// Check if all cards are correct
	if (numCorrect === myDecks[currentDeck].cards.length) {
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
	if (currentCard >= myDecks[currentDeck].cards.length) {
		// If last card, return to start
		currentCard = 0;
	}
	//Skip if already correct
	while (myDecks[currentDeck].cards[currentCard].status === 'correct') {
		currentCard++;
		// Check for last card again
		if (currentCard >= myDecks[currentDeck].cards.length) {
			// If last card, return to start
			currentCard = 0;
		}
	}
	// Update flashcard
	$('#flashcard .prompt').html(myDecks[currentDeck].cards[currentCard].q);
	// Update scorboard overview
	$('#overview li').eq(currentCard).addClass('active');
	$('.overview-value').eq(currentCard).html(myDecks[currentDeck].cards[currentCard].q);
	// TODO Add show all button
}

// Previous Card
function previousCard() {
	$('#overview li').eq(currentCard).removeClass('active');
	currentCard--;
	if (currentCard < 0) {
		// If last card, return to start
		currentCard = myDecks[currentDeck].cards.length-1;
	}
	while (myDecks[currentDeck].cards[currentCard].status === 'correct') {
		currentCard--;
		console.log(currentCard);
		if (currentCard < 0) {
			// If last card, return to start
			currentCard = myDecks[currentDeck].cards.length-1;
		}
	}

	$('#flashcard .prompt').html(myDecks[currentDeck].cards[currentCard].q);
	$('#overview li').eq(currentCard).addClass('active');
	$('.overview-value').eq(currentCard).html(myDecks[currentDeck].cards[currentCard].q);
}

// Show card
function showCard(i) {
	currentCard = i;
	$('#flashcard .prompt').html(myDecks[currentDeck].cards[i].q);
	$('.overview-value').eq(currentCard).html(myDecks[currentDeck].cards[currentCard].q);
}



// SCOREBOARD FUNCTIONS
// Initialize scoreboard
function initScoreboard() {
	$(scoreboard).css('visibility', 'visible');
	for (var i = 0; i < myDecks[currentDeck].cards.length; i++) {
		var cardOverview = '<li data-index="' + i + '"><span class="overview-status"><i class="fa fa-square-o" aria-hidden="true"></i></span><span class="overview-value">. . .</span></li>';
		$(overview).append(cardOverview);
	}
}

function clearOverview() {
	$(overview).html('');
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

function resetScore() {
	numCorrect = 0;
	for (var i = 0; i < myDecks[currentDeck].cards.length; i++) {
		myDecks[currentDeck].cards[i].status = 'unanswered';
	}
}

// Correct response
function setCorrect() {
	numCorrect++;
	myDecks[currentDeck].cards[currentCard].status = 'correct'; // TODO if correct, skip in card list
	$('.overview-status').eq(currentCard).html('<i class="fa fa-check" aria-hidden="true"></i>');
	$('.overview-status').eq(currentCard).parent().css('color', '#a0d468');
}

// Incorrect response
function setIncorrect() {
	myDecks[currentDeck].cards[currentCard].status = 'incorrect';
	$('.overview-status').eq(currentCard).html('<i class="fa fa-times" aria-hidden="true"></i>');
	$('.overview-status').eq(currentCard).parent().css('color', '#ed5565');
}

// Print scoreboard changes to DOM
function printScore() {
	var numRemaining = myDecks[currentDeck].cards.length;
	var numCorrect = 0;
	var numIncorrect = 0;
	// count correct and incorrect cards in stack
	for (var i = 0; i < myDecks[currentDeck].cards.length; i++) {
		if (myDecks[currentDeck].cards[i].status === 'correct') {
			numCorrect++;
			numRemaining--;
		} else if (myDecks[currentDeck].cards[i].status === 'incorrect') {
			numIncorrect++;
		}
	}
	// update DOM
	$(scoreboardTotalCards).html(myDecks[currentDeck].cards.length);
	$(scoreboardRemainingCards).html(numRemaining);
	$(scoreboardCorrect).html(numCorrect);
	$(scoreboardIncorrect).html(numIncorrect);
}



// DECKLIST FUNCTIONS
updateDeckList();
function updateDeckList() {
	for (var i = 0; i < myDecks.length; i++) {
		var deckName = '<li class="deck" value="' + i + '">' + myDecks[i].name + ' (' + myDecks[i].cards.length + ' cards)</li>';
		$(deckList).append(deckName);
	}
}

function activateDeck() {
	for (var i = 0; i < myDecks.length; i++) {
		$('.deck').eq(i).removeClass('active');
	}
	$(this).addClass('active');
	// TODO add fa
}




// HELPER FUNCTIONS
// Clear response input field
function clearInput() {
	$(responseField).html('');
}



// EVENT LISTENERS
// Start button click
$(startButton).on('click', function() {
	if ($('.deck.active') === null) {
		currentDeck = $('.deck.active').attr('value');
	}
	startGame();
});

// Response submission click
$(responseButton).on('click', function() {
	submitResponse();
	clearInput();
});

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

// Deck List click, activate
$('.deck').on('click', activateDeck);



// Overview click
$('#overview').on('click', 'li', function() {
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

// TODO Solve button

// TODO Test for different viewports

// TODO SUBMISSION
/*
Deploy online

*/

// TODO Write your own cards

// TODO Card animations

// TODO add 5 user stories

// TODO multiple correct answers
