// 1: Check that DOM is ready
$(document).ready(function () {
  
  // 10: Load all the details in table
  displayPokemon();
  
  
  // 3: Create Form event listener - for button -> on click
  $('#form-pokemon-entry').submit(function (e) {
    e.preventDefault();

    // Creating object via form
    var pokemonID = $("#text-id").val();
    var pokemonName = $("#text-name").val();
    var pokemonType = $("#text-type").val();
    
    var pokemonSelected = new Pokemon(pokemonID, pokemonName, pokemonType);

    // 4: Set empty pokemon array
    var pokemonList = [];

    // 5: Retrieve items from local storage
    if (localStorage.getItem('pokemonList')) {
      pokemonList = JSON.parse(localStorage.getItem("pokemonList"));
    }

    // 6: Push obj into array
    pokemonList.push(pokemonSelected);

    // 7: Set object into LocalStorage
    localStorage.setItem('pokemonList',JSON.stringify(pokemonList));

    displayPokemon();
  });
});//eof

// 2: Create Pokemon function object model template
function Pokemon(pokemonID, pokemonName, pokemonType) {
  this.pokemonID = pokemonID;
  this.pokemonName = pokemonName;
  this.pokemonType = pokemonType;
  this.dateCreated = Date.now();
}

// 8. Looping mechanic
function displayPokemon(){
  
  var pokemonInfo = "";

  if(localStorage.getItem('pokemonList')) {
    let pokemonList = JSON.parse(localStorage.getItem('pokemonList'));

    if(pokemonList.length) {
      for (let pokemonSelected of pokemonList) {
        pokemonInfo += `<tr><td>${pokemonSelected.pokemonID}</td><td>${pokemonSelected.pokemonName}</td><td>${pokemonSelected.pokemonType}</td><td>${pokemonSelected.dateCreated}</td></tr>`;
      }

      $('#pokemon-info').html(pokemonInfo);
    } else {
      $('#pokemon-info').html('No Pokemon Found');
    }

  }
  
}

// Get Pokemon
pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
pokemon1Name = pokemonList[0].pokemonName;

// Call Pokemon API
var settings = {
  "url": "https://pokeapi.co/api/v2/pokemon/" + pokemon1Name,
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Cookie": "__cfduid=da70e70cfa2fc56204a2621c43554fdf41608363674"
  },
};

// Extract data from API and print
$.ajax(settings).done(function (response) {
  console.log(response);
  this.name = response.name;
  this.ability1 = response.abilities[0].ability.name;
  this.ability2 = response.abilities[1].ability.name;
  this.type1 = response.types[0].type.name;
  console.log(this.name);
  console.log(this.ability1);
  console.log(this.ability2);
  console.log(this.type1);
});