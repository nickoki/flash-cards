# flash-cards
GA WDI Project 1

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


---

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
