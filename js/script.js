/* script.js */


// NHO: Love that you took an OO approach for Cards and Decks, you could do the same thing here for Game potentiallly!
// This could help with keeping track of progress through a session etc...

 // NHO: These Vars could be properties on you Game object

// NHO: Another thing that might be helpful is to save references to all the elements you plan on using
// so you don't have to repeat selectors, i.e. var responseContainer = $('.response-container')

// GLOBAL VARIABLES
var myDecks = JSON.parse(localStorage.getItem('Flashcard Decks'));
var currentDeck = 0;
var currentCard = 0; // counter for cards list
var numCorrect = 0;

// NHO: and these functions could be methods on that Game object

// GAME FUNCTIONS
// Start game
function startGame() {
	//
	//toggleStartButton();

	currentCard = 0; // NHO: don't believe this line is necessary since you are already initializing it 0 above
	hideEditContainer();
	hideEditControls();
	displayCardContainer();
	displayFlashcard();
	displayArrows();
	displayResponseContainer();
	displayInput();
	displayScoreboard();

	clearOverview();
	initScoreboard();
	resetScore();
	printScore();
	clearInput();
	$(responseField).focus();
	// Update flashcard
	// NHO: this line will throw a type error if `q` is undefined btw...
	$('#flashcard .prompt').html(myDecks[currentDeck].cards[currentCard].q);
	// Update scorboard overview
	$('#overview li').eq(currentCard).addClass('active');
	$('.overview-value').eq(currentCard).html(myDecks[currentDeck].cards[currentCard].q);
}

// NHO: Reminder to remove unused / commented out code or move to a Work In Progress branch
// Toggle Functions
/*
function toggleStartButton() {
	if ($(startButton).has('.disabled')) {
		$(startButton).removeClass('disabled');
	} else {
		$(startButton).addClass('disabled');
	}
}
*/

// End game
function endGame() {
	$('#flashcard .prompt').html("Congratulations! You're all done!");
	hideResponseContainer();
	hideArrows();
	$(responseField).blur();
	//$(overview).children().css('pointer-events', 'none');
}


// NHO: I think its great that you've organized your code like this, very clear to read
// one idea that might reduce all of these display functions is to have one toggleDisplay function that
// take an element as a parameter, then toggle's that elements 'hidden' class

// DISPLAY FUNCTIONS
function displayCardContainer() {
	$('.card-container').removeClass('hidden');
}

function hideCardContainer() {
	$('.card-container').addClass('hidden');
}

function displayResponseContainer() {
	$('.response-container').removeClass('hidden');
}

function hideResponseContainer() {
	$('.response-container').addClass('hidden');
}

function displayEditContainer() {
	$('.edit-container').removeClass('hidden');
}

function hideEditContainer() {
	$('.edit-container').addClass('hidden');
}

function displayFlashcard() {
	$(flashcard).removeClass('hidden');
}

function hideFlashcard() {
	$(flashcard).addClass('hidden');
}

function displayArrows() {
	$(previous).removeClass('hidden');
	$(next).removeClass('hidden');
}

function hideArrows() {
	$(previous).addClass('hidden');
	$(next).addClass('hidden');
}

function displayInput() {
	$('.response-container').removeClass('hidden');
}

function hideInput() {
	$('.response-container').addClass('hidden');
}

function displayEditControls() {
	$('#editControls').removeClass('hidden');
}

function hideEditControls() {
	$('#editControls').addClass('hidden');
}

function displayScoreboard() {
	$('#scoreboard').removeClass('hidden');
	$('#overview').removeClass('hidden');
}

function hideScoreboard() {
	$('#scoreboard').addClass('hidden');
	$('#overview').addClass('hidden');
}

/*
function displayBoard() {
	$(flashcard).css('visibility', 'visible');
	$('.response-container').css('visibility', 'visible');
}*/

// Submit Response, check for correctness
function submitResponse() {
	var res = $(responseField).html().toLowerCase();
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
	currentCard = i; // NHO: is this necessary to update the global var?
	$('#flashcard .prompt').html(myDecks[currentDeck].cards[i].q);
	$('.overview-value').eq(currentCard).html(myDecks[currentDeck].cards[currentCard].q);
}


// NHO: I feel like this scoreboard is a great opportunity to make use of the view model pattern in development
// This is where we can create classes or (models) of View templates as well. Ultimately the view model
// will have a render method that decides what html to put on the page, then you just have bunch of ways of updating the display.
// We'll go over this more in class later, but if you want to take a peak ahead check out https://github.com/ga-wdi-lessons/js-view-constructors (ES5 syntax)

// SCOREBOARD FUNCTIONS
// Initialize scoreboard
function initScoreboard() {
	var header = '<h3>Deck Overview</h3>';
	$(overview).append(header);
	for (var i = 0; i < myDecks[currentDeck].cards.length; i++) {
		var cardOverview = '<li data-index="' + i + '"><span class="overview-status"><i class="fa fa-square-o" aria-hidden="true"></i></span><span class="overview-value">. . .</span></li>';
		$(overview).append(cardOverview);
	}
}

// clear Overview list
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

// Set Scores back to 0
function resetScore() {
	numCorrect = 0;
	for (var i = 0; i < myDecks[currentDeck].cards.length; i++) {
		myDecks[currentDeck].cards[i].status = 'unanswered'; // NHO: might recommend using a boolean as the data type for status || rename it to completed
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
	$(deckList).html('');
	var header = '<h3>Select a Deck</h3>';
	$(deckList).append(header);
	for (var i = 0; i < myDecks.length; i++) {
		var deckName = '<li class="deck" value="' + i + '"><span>' + myDecks[i].name + '</span> (' + myDecks[i].cards.length + ' cards)</li>';
		$(deckList).append(deckName);
	}
	$('#deckList li').eq(0).addClass('active');
}

function activateDeck() {
	for (var i = 0; i < myDecks.length; i++) {
		$('.deck').eq(i).removeClass('active');
	}
	$(this).addClass('active');
	currentDeck = $('.deck.active').attr('value');
}




// HELPER FUNCTIONS
// Clear response input field
function clearInput() {
	$(responseField).html('');
}

// update Deck name
updateDeckName();
function updateDeckName() {
	$('.deck-name').html(myDecks[currentDeck].name);
}

// Go To Edit screen
function goToEdit() {
	hideCardContainer();
	hideArrows();
	hideFlashcard();
	hideInput();
	hideScoreboard();

	displayEditContainer();
	displayEditControls();
	updateEditTable();
	updateDeckName();
}


// EVENT LISTENERS
// Start button click
$(startButton).on('click',function() {
	startGame();
})

// Edit button click
$(editButton).on('click', goToEdit);

// Response submission click
$(responseButton).on('click', function() {
	submitResponse();
	clearInput();
})

// Response submission [enter]
$(responseField).keypress(function(e) {
	if (e.which == 13) {
		e.preventDefault();
		submitResponse();
		clearInput();
	}
});

// Deck List click, activate
$(deckList).on('click', '.deck', activateDeck)

// Overview click
$('#overview').on('click', 'li', function() {
	$('#overview li').eq(currentCard).removeClass('active');
	showCard($(this).attr('data-index'));
	$(this).addClass('active');
	$(responseField).focus();
})

// New Deck Button
$(newDeckButton).on('click', function() {
	currentDeck = 0;
	newDeck();
	updateDeckList();
	goToEdit();
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

// TODO Solve button

// TODO multiple correct answers

// TODO add max characters for cards and deck names
