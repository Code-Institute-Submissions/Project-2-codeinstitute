# <img style="height:150px" src="images/rotom-pokedex.png" > Pokédex

# 1. Background & Objective
## Background / Problem Statement
Usually when playing pokemon games, the player is bombarded with many options, and they might not know which pokemon are good options for them to choose for their party of 6 for battling the games' final bosses.

Furthermore, due to the many versions, no one pokedex has been able to display all the 800+ pokemon in one single endpoint.

## Objective
Design a simple pokedex. When users fill in the form and ask the pokedex to "search", display the following details

1. Pokemon Name
2. Picture of pokemon
3. Stats of the pokemon, like height, weight, size
4. Type of the pokemon
5. Abilities and description of the abilities
6. Base Stats of the pokemon - HP, Attack, Special Attack, Defense, Special Defense, Speed
7. Save up to 6 pokemon so you can refer to them again

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

```
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
```

# 5. Key Features
- Pokemon API retrieval via [PokeAPI](https://pokeapi.co/)
- Local storage using javascript to remember previous pokemon choices and store them in 6 slots
- Auto-complete dropdown to help with users who might not know how to spell the full pokemon name in the search bar
- Form submit, information display and information storage in Local Storage
- Display of pokemon details via HTML and CSS manipulation and DOM traversal

## 5.1 Feature List
|# | Name          | Description   |     
| -| ------------- |-------------|
|1 |Pokemon API retrieval|via [PokeAPI](https://pokeapi.co/)| 
|2 |Autocomplete Search Bar for Pokedex| Using https://pokeapi.co/api/v2/pokemon/| 
|3 | Navigation Bar with Anchor links within page |       | 
|4 | Retrieval of Pokemon Genus & Flavour Text | https://pokeapi.co/api/v2/pokemon-species/| 
|5 | Extraction of pokemon moves |via [PokeAPI](https://pokeapi.co/)| 
|6 | Storage of Pokemon into LocalStorage | Inclusive of pokemon stats and moveset|
|7 | Retrieval of stored pokemon | Up to 6 pokemon can be saved|
<br>

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

The final design aims to provide a solution to all user stories listed in `section 4 The Goals: User Stories or (JTBD) Jobs-to-be-Done` 

## 6.3 Colour
Something  closer to  the original pokedex colour palette was chosen to enable familiarity in users
```
For the Red: #c83033
For the Gray: #6c757d
```
# 7. Detailed Features
## 7.1 Search Bar
- Implemented using [Jquery UI Autocomplete Widget](https://jqueryui.com/autocomplete/)
- List of pokemon were generated using https://pokeapi.co/api/v2/pokemon/ 
- Array of pokemon that were returned from the endpoint were handled using the `.map()` method to access the nested `names` of the pokemon ([Link to resource](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map))

## 7.1.1 Search Bar Validation
- If a non-existing pokemon name is entered, an alert will appear to the user saying `"Please enter a real pokemon"`
- check was done using `.fail()` to check if `response.status == "404"`

## 7.2 Preview Pokemon
* Return the following from `https://pokeapi.co/api/v2/pokemon/{pokemon name}`
  * Pokemon Sprite
  * Pokemon Name
  * Pokemon Type
  * Pokemon Stats
  * Pokemon Moves
  * Pokemon Abilities

* Return the following from `https://pokeapi.co/api/v2/pokemon-species/{pokemon name}`
  *  Pokemon Genus
  *  Pokemon Flavor Text

* Display all data returned from API using `.htm()` method. 

## 7.2.1 Stats Bar
* Stats are displayed using using [Jquery UI Progressbar widget](https://jqueryui.com/progressbar/)
* As the value of the bar is set at `"100"`, and pokemon stats can go up to `>200`, the stats were scaled back to a base of `100` before using `.progressbar()` to create the progressbar in the pokemon card

## 7.2.2 Array manipulation for Pokemon Moves and flavor text
* Pokemon Moves in the response from `https://pokeapi.co/api/v2/pokemon/{pokemon name}` were nested. `.map()` was used to return an array of move names instead of the original objects

* Pokemon Flavor text was embedded in the `https://pokeapi.co/api/v2/pokemon-species/{pokemon name}` endpoint's response array. 
  * in order to extract only the english pokedex flavor text, the `.find()` method was used ([Link to resource](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find))
  ```
   .find(function (x) {
              return x.language.name == "en";
            }
  ```

* Pokemon Flavor Text had odd characters
  ```
  "Spits fire that\nis hot enough to\nmelt boulders.\u000cKnown to cause\nforest fires\nunintentionally."
  ```
  * These had to be removed using the `.replace()` method ([Link to resource](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace))
  ```
  .flavor_text.replace(/\r\n|\n|\r|/gm, " ")}"`);
  ```
  * "" character was also found in the response from the API, and had to be removed from the flavor text upon further testing.

## 7.2.3 Pokemon Move selection: double-entry validation 
In the event user selects the same move again from the dropdown of the moves, an alert will appear telling the user that the `"Move has already been selected"` The user will be blocked from adding that move to the movelist of the pokemon

## 7.2.4 Pokemon Abilities
In the event that pokemon have a hidden ability, the `getpokemon()` function used to display pokemon, as well as the handling of the initial API call for `Preview Pokemon` will check if there's a hidden ability
```
if (pokemonPreview.abilities[1]) {
          $(`.pokemon-${x}-ability`).html(
            `Ability: ${pokemonPreview.abilities[0].ability.name} 
          <br> Hidden Ability: ${pokemonPreview.abilities[1].ability.name}`
          );
        } else {
          $(`.pokemon-${x}-ability`).html(
            `Ability 1: ${pokemonPreview.abilities[0].ability.name}`
          );
        }
```


## 7.2.5 Saving Pokemon into party of 6
Once any of the 6 buttons have been clicked to save the pokemon, both the movesets that have been chosen, the pokemon array and the pokemon species array would be saved into localStorage, and immediately displayed using the `getpokemon()` function. 

`LocalStorage.setItem` for saving
```
localStorage.setItem("pokemon1", JSON.stringify(pokemonPreview));
localStorage.setItem("pokemon1Species",JSON.stringify(pokemonPreviewSpecies)
localStorage.setItem("1ChosenMoveList", JSON.stringify(saveMovelist));
```

`getPokemon()`function
Takes in an argument of any of the 6 pokemon `value: 1 to 6`, and display all of the details stored in localStorage. 


# 8. Bootstrap 4 and Jquery Implementation
- Bootstrap 4 was used for re-building the website in a responsive, mobile-first manner. You can access Boostrap 4 resouces [here](https://getbootstrap.com/docs/4.5/getting-started/introduction/)

- Jquery library was used to simplify HTML DOM traversal and manipulation, event handling and calling of PokeAPI
Jquery can be accessed at this [link](https://jquery.com/download/)

- Jquery UI was further used to enable the searchbar to have auto-complete features and to implement component like progressbar. Jqery UI library can be accessed at this [link](https://jqueryui.com/download/)

The below `code snippets` were added to HTML `<head>`

- For CSS
```
- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">

- <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
```
- For JQuery and Jquery UI
```
- <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>

- <script src="js/jquery-ui.min.js" crossorigin="anonymous"></script>
```
# 10.

# 11. Content Credits

# 12. Testing
## 12.1 Code Validation using Code Validators
- `style.css` was validated using the W3C Jigsaw validator ([Link](https://jigsaw.w3.org/css-validator/validator))
  - No issues were found with `style.css`
- `script.js` was validated using JShint ([Link](https://jshint.com/))
  -  The following configurations were included:
  - <img src="images/jshint-config.png">
  - No issues were found with `New Javascript features (ES6)` and `jQuery` checked in the configuration list
  
- `index.html` was validated using the W3 Nu HTML Validator ([Link](https://validator.w3.org/nu/#file))
  - It was found that `<section>` tags and `label`/`placeholder` attributes were wrongly used.
  - Code was changed to remove erroneous tags and attributes. Replaced these tags with `<div>` and `<p>` to render content instead.
  - Post code fix Response from Nu Html Checker: `"Document checking completed. No errors or warnings to show."`

## 12.2 User Acceptance Testing + Bug fixing Process


# 14. Deployment

# 15. Acknowledgements