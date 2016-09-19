/* cards.js */


function Card() {
	return {
		q: '',
		a: '',
		status: '',
	}
}

var cards = [];

var card1 = new Card();
card1.q = 'What is your name?';
card1.a = 'Nick';

var card2 = new Card();
card2.q = 'How old are you?';
card2.a = 25;

var card3 = new Card();
card3.q = 'What full-time course are you taking at GA?';
card3.a = 'WDI';

cards.push(card1);
cards.push(card2);
cards.push(card3);
