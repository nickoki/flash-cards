/* cards.js */

// Deck of cards constructor
function Deck() {
	return {
		name: '',
		cards: [],
	}
}

// Individual card constructor, added to cards[] in Deck object
function Card() {
	return {
		q: 'prompt',
		a: 'answer',
		status: 'unanswered',
		originalIndex: 0,
	}
}

var card1a = new Card();
card1a.q = 'What is the git command to stage all files with changes to your repo?';
card1a.a = 'git add .';

var card2a = new Card();
card2a.q = 'What programming workflow problem does git help solve?';
card2a.a = 'version control';

var card3a = new Card();
card3a.q = 'What is the git command to intialize a new git repository?';
card3a.a = 'git init';

var card4a = new Card();
card4a.q = 'What is the command to move your commits to an online GitHub repo?';
card4a.a = 'git push origin master';

var deckName1 = "git";

var deck1 = new Deck();

deck1.name = deckName1;
deck1.cards.push(card1a);
deck1.cards.push(card2a);
deck1.cards.push(card3a);
deck1.cards.push(card4a);



var card1b = new Card();
card1b.q = 'css';
card1b.a = 'cascading style sheets';

var card2b = new Card();
card2b.q = 'html';
card2b.a = 'hypertext markup language';

var card3b = new Card();
card3b.q = 'MVP';
card3b.a = 'minimum viable product';

var card4b = new Card();
card4b.q = 'http';
card4b.a = 'hypertext transfer protocol';

var card5b = new Card();
card5b.q = 'wdi ;)';
card5b.a = 'web development immersive';

var deckName2 = "Acronyms";

var deck2 = new Deck();

deck2.name = deckName2;
deck2.cards.push(card1b);
deck2.cards.push(card2b);
deck2.cards.push(card3b);
deck2.cards.push(card4b);
deck2.cards.push(card5b);

var decks = [];

decks.push(deck1);
decks.push(deck2);

// If no decks, create example decks
if (!(localStorage.getItem('Flashcard Decks'))){
	localStorage.setItem('Flashcard Decks', JSON.stringify(decks));
}
