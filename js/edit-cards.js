/* edit-cards.js */

function clearEditTable() {
	$('.edit-table').html('');
}

function updateEditTable() {

	clearEditTable();

	var labels = '<tr class="labels"><th>#</th><th>Question</th><th>Answer</th><th class="options-column"></th></tr>';
	$('.edit-table').append(labels);

	for (var i = 0; i < myDecks[currentDeck].cards.length; i++) {
		addCardToTable(i);
	}
}

function addCardToTable(i) {
	// NHO: template strings ftw!
	// Sidenote: if you feel like you are writing a lot of stringified templates, I might recommend checking out a templating library like Handlebars

	// Begin html table row
	var entry = '<tr>';

	// Add card number
	entry += '<td>' + (i + 1) + '</td>';

	// Add question
	entry += '<td id="editQ" contenteditable="true">' + myDecks[currentDeck].cards[i].q + '</td>';

	// Add answer
	entry += '<td id="editA" contenteditable="true">' + myDecks[currentDeck].cards[i].a + '</td>';

	// Add Options
	entry += '<td><div class="delete-button table-button" value="' + i + '">Delete Card</div></td></tr>';

	$('.edit-table').append(entry);
}

// Add new card to deck
function newCard() {
	var newCard = new Card();
	myDecks[currentDeck].cards.push(newCard);
	addCardToTable((myDecks[currentDeck].cards.length)-1);
}

// Create a new Deck
function newDeck() {
	var newDeck = new Deck();
	newDeck.name = 'New Deck';
	var firstCard = new Card();
	newDeck.cards.push(firstCard);

	myDecks.unshift(newDeck);
	saveDeckEdits();
}



// Save to local storage
function saveDeckEdits() {
	localStorage.setItem('Flashcard Decks', JSON.stringify(myDecks));
}



// EVENT LISTENERS

// Rename Deck button listener
$(deleteDeckButton).on('click', function() {
	var x = confirm('Are you sure you want to delete your deck: ' + myDecks[currentDeck].name + '?');
	if (x == true) {
		myDecks.splice(currentDeck, 1);
		saveDeckEdits();
		location.reload();
	}
})

// Rename Deck [enter] listener
$('.edit-container .deck-name').keypress(function(e) {
	if (e.which == 13) {
		e.preventDefault();
		var newName = $('.edit-container .deck-name').html();
		myDecks[currentDeck].name = newName;
		saveDeckEdits();
		updateDeckName();
		$('.deck.active span').html(newName);
	}
});


$('.edit-container .deck-name').on('blur', function() {
	var newName = $('.edit-container .deck-name').html();
	myDecks[currentDeck].name = newName;
	saveDeckEdits();
	updateDeckName();
	// Update deck name in desklist
	$('.deck.active span').html(newName);
})

// New Card button listener
$(addCardButton).on('click', newCard);

// Delete Button listener
$('.edit-table').on('click', '.delete-button', function() {
	var i = parseInt($(this).attr('value'));
	$('.edit-table').children().eq(i+1).remove();
	myDecks[currentDeck].cards.splice(i, 1);
	saveDeckEdits();

	// Relabel rows
	for (var j = i; j < myDecks[currentDeck].cards.length + 1; j++) {
		$('.edit-table').children().eq(j).children().eq(0).html(j);
		$('.edit-table').children().eq(j).children().eq(3).children().attr('value', (j-1));
	}
})

// Save Button listener
$(saveButton).on('click', function() {
	for (var i = 0; i < myDecks[currentDeck].cards.length; i++) {
		myDecks[currentDeck].cards[i].q = $('.edit-table').children().eq(i+1).children().eq(1).html();
		myDecks[currentDeck].cards[i].a = $('.edit-table').children().eq(i+1).children().eq(2).html().toLowerCase();
	}
	saveDeckEdits();
})

$('.edit-table').on('blur', '#editA', function() {
	for (var i = 0; i < myDecks[currentDeck].cards.length; i++) {
		myDecks[currentDeck].cards[i].q = $('.edit-table').children().eq(i+1).children().eq(1).html();
		myDecks[currentDeck].cards[i].a = $('.edit-table').children().eq(i+1).children().eq(2).html().toLowerCase();
	}
	saveDeckEdits();
})

$('.edit-table').on('blur', '#editQ', function() {
	for (var i = 0; i < myDecks[currentDeck].cards.length; i++) {
		myDecks[currentDeck].cards[i].q = $('.edit-table').children().eq(i+1).children().eq(1).html();
		myDecks[currentDeck].cards[i].a = $('.edit-table').children().eq(i+1).children().eq(2).html().toLowerCase();
	}
	saveDeckEdits();
})

// Cancel Button listener
$(cancelButton).on('click', function() {
	clearEditTable();
	updateEditTable();
})





// TODO cursor to end of line on table cell click
