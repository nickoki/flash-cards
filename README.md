# flash-cards
GA WDI Project 1

## Technologies Used

To build this flash card game, I utilized HTML, CSS, and jQuery. HTML classes and ids provided the necessary DOM object selection and CSS allowed for styling and responsiveness. jQuery is the workhorse behind the scenes and accounts for all functionality in the game including displaying cards, updating scores, hiding elements, editing card decks, reading inputs, and more.

## Approach Taken

I started the project with pseudo code to layout the steps necessary to accomplish my Minimum Viable Product (i.e. displaying a hardcoded card, accepting an input, and checking for correctness). I also laid out steps for features I'd like to add after coding the initial product -- things like creating and editing your own decks.

I stored card data as an object and later created a Deck object to store lists of cards. The Decks and Cards are saved to localStorage so users can save their card lists and come back to them at a later date.

Along the way, I used git branches to tackle unforeseen problems such as UX issues (e.g. updating the display after deleting a card). This kept my workflow organized incase the fix was more difficult than expected.

Having not learned about MVC setups thus far in WDI, I used a workaround to achieve a similar result by hiding elements that were not in use (instead of switching views). I'm happy with the result, but it required much more CSS than I would have liked and there are certainly still some bugs (e.g. extra space at bottom of page in collapsed view).

## Unsolved Problems

As mentioned above, I'd like to convert this project to an MVC architecture as we learn more in the course.

I'd also like to implement the following features, if given more time:

  * Write a card flip animation to show card answers
  * Allow for multiple correct responses to a card
  * Add a maximum character limit for cards questions, answers, and deck names
  * Preserve deck completion state so users can swap between activities without losing progress; add a reset feature
  * Store decks in a database instead of localStorage


## User Stories

As a user, I should be able to:

  * study custom material to prepare for test, or to learn in general
  * create, name, and delete decks of flashcards
  * add and remove flashcards from those decks
  * edit flashcard questions and answers
  * easily test myself with those decks of flashcards and record my progress and scores
  * cycle back to unanswered or incorrect cards in the stack until answered correctly

# Submission
Submit project as an **issue** to this repo:

[github.com/ga-dc/project1-gallery](https://github.com/ga-dc/project1-gallery/issues/new?body=Link%20to%20repo%3A%0ALink%20to%20deployed%20app%3A%0A%0AThings%20you%27d%20like%20specific%20feedback%20on%3A%0A%0A)

### Deploying via GitHub Pages.su

**DO NOT** follow the instructions provided by GitHub for creating your Project Pages. Why not? They expect `gh_pages` to be a separate informational site about the project contained in the repo. What we want is to use the `gh_pages` functionality to actually host our application.

Instead, try these steps:

#### 1. Create a gh-pages branch, from master:
```
git checkout master
git checkout -b gh-pages
```
#### 2. Initial deploy to origin (via push):
```
git push -u origin gh-pages
```
#### 3. Verify
Browse to `<your_github_username>.github.io/<repo_name>`

#### Follow-up deployments:
After making further changes, deploy via push:
```
git push origin gh-pages
```

# Flash-Cards

Pre-load your app with some data, and let the user flip through
them quickly (back or front), and use the keyboard flip the card,
and to mark whether they got it right or not. Track which cards
were incorrect, and re-display them until the user gets them
right!

  *Bonus:*
    * Track scores over time (even if the page is reloaded)
    * Include images on one or both sides of the flash card
    * Let the user add flash cards (don't need to be saved across refreshes)
