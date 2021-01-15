# <img style="height:150px" src="images/rotom-pokedex.png" > Pokédex

# 1. Background & Objective
## Background / Problem Statement
Usually when playing pokemon games, the player is bombarded with many options, and they might not know which pokemon are good options for them to choose for their party of 6 for battling the games' final bosses.

Furthermore, due to the many versions, no one pokedex has been able to display all the 800+ pokemon in one single endpoint.

## Objective
Design a simple pokedex. When users fill in the form and ask the pokedex to "search", display the following details

- Pokemon Name
- Picture of pokemon
- Stats of the pokemon, like height, weight, size
- Type of the pokemon
- Abilities and description of the abilities
- Base Stats of the pokemon - HP, Attack, Special Attack, Defense, Special Defense, Speed
- Save up to 6 pokemon so you can refer to them again

# 2. Demo (Github Pages)
Site is published via github pages and can be viewed [here](https://malrhis.github.io/Project-2-codeinstitute/)

# 3. Technologies Used
- HTML
- CSS
- Bootstrap 4
- Javascript
- Jquery
- Jquesry UI

# 4. The Goals: User Stories or (JTBD) Jobs-to-be-Done

For the players of pokemon games, or fans who want to be able to search for the full breadth of the pokemon franchise:

1. I want to be able to search for a pokemon by name, instead of going through the clunky gameboy/switch keypad
2. I want to be able to view all pokemon across all the game versions.
3. The pokedex in the pokemon games does not give you enough information about the pokemon in a single screen. For instance, it does not tell you the stats of the pokemon:
    - I want to be able to see a sprite of the pokemon
    - I want to be able to see the type/types of the pokemon
    - I want to be able to see the ability that the pokemon has, and if the pokemon has a hidden ability, I want that to be displayed
    - I want to be able to read about the pokemon's genus and pokedex entry
    - I want to know what moves does the pokemon have
4. I want to be able to save my pokemon so that I can refer to them later
5. I want to be able to build a mock-up team

# 5. Key Features
- Pokemon API retrieval via [PokeAPI](https://pokeapi.co/)
- Local storage using javascript to remember previous pokemon choices and store them in 6 slots
- Auto-complete dropdown to help with users who might not know how to spell the full pokemon name in the search bar
- Form submit, information display and information storage in Local Storage
- Display of pokemon details via HTML and CSS manipulation and DOM traversal

# 6. Prototyping
Simple Prototyping was done directly using MS Powerpoint to mock-up the features of the website.

Reference was taken from:
- [The official Pokemon website's pokedex](https://sg.portal-pokemon.com/play/pokedex)
- [Original Pokedex design](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9dex)
- [Party Pokemon List of the Pokemon Games](https://bulbapedia.bulbagarden.net/wiki/Party)

## 6.1 Front-End UI Mock-up
<img style="height:400px" src="images/mockup-1.png" >
<img style="height:400px" src="images/mockup-2.png" >

Reference was taken from the original design of the very first pokdex art from generation 1 of the pokemon games:

<img style="height:100px" src="images/pokedex-pic-1.png">

## 6.2 Actual Final Design
<img style="height:300px" src="images/design-1.png" >
<img style="height:400px" src="images/design-2.png" >
<img style="height:400px" src="images/design-3.png" >
<img style="height:400px" src="images/design-4.png" >

### 6.3.1 Components
- Pokedex Search Bar
- Preview Pokemon Card
- Movelist for pokemon 
- Saving function for saving preview Pokemon as one of 6 party pokemon

### 6.3.2 Colour
Something  closer to  the original pokedex colour palette was chosen to enable familiarity in users
```
For the Red: #c83033
For the Gray: #6c757d
```


# 7. Bootstrap 4 and Jquery Implementation
- Bootstrap 4 was used for re-building the website in a responsive, mobile-first manner. You can access Boostrap 4 resouces [here](https://getbootstrap.com/docs/4.5/getting-started/introduction/)

- Jquery library was used to simplify HTML DOM traversal and manipulation, event handling and calling of PokeAPI
Jquery can be accessed at this [link](https://jquery.com/download/)

- Jquery UI was further used to enable the searchbar to have auto-complete features and to implement component like progressbar. Jqery UI library can be accessed at this [link](https://jqueryui.com/download/)

The below `code snippets` were added to HTML `<head>`

- For CSS
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
```
- For JQuery and Jquery UI
```
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>

<script src="js/jquery-ui.min.js" crossorigin="anonymous"></script>
```

# 8. Boostrap 4 Templates & Examples Used

# 9. Which user stories does each page fulfill?

# 10. Content Credits

# 12. Testing
## 12.1 Code Validation using Code Validators
## 12.2 User Acceptance Testing + Bug fixing Process

# 13. Bugs Found

# 14. Deployment

# 15. Acknowledgements