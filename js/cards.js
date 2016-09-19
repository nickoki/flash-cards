/* cards.js */


function Card() {
	return {
		q: '',
		a: '',
		status: 'unanswered',
		originalIndex: 0,
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

var card4 = new Card();
card4.q = 'A';
card4.a = 'A';

var card5 = new Card();
card5.q = 'B';
card5.a = 'B';

var card6 = new Card();
card6.q = 'C';
card6.a = 'C';

cards.push(card1);
cards.push(card2);
cards.push(card3);
cards.push(card4);
cards.push(card5);
cards.push(card6);
