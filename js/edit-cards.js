/* edit-cards.js */

function updateEditTable() {

	for (var i = 0; i < myDecks[currentDeck].cards.length; i++) {
		// Begin html table row
		var entry = '<tr>';

		// Add card number
		entry += '<td>' + (i + 1) + '</td>';

		// Add question
		entry += '<td id="editQ" contenteditable="true">' + myDecks[currentDeck].cards[i].q + '</td>';

		// Add answer
		entry += '<td id=editA" contenteditable="true">' + myDecks[currentDeck].cards[i].a + '</td>';

		// Add Options
		entry += '<td><div class="cancel-button table-button">Cancel</div><div class="save-button table-button">Save</div></td>';

		$('.edit-table').append(entry);
	}
}

// TODO cursor to end of line on table cell click
