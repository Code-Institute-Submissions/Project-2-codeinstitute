// 1: Check that DOM is ready
$(document).ready(function () {
  // 3: Create Form event listener - for button -> on click
  $("#form-pokemon-entry").submit(function (e) {
    e.preventDefault();
    // Creating object via form
    var pokemonID = $("#text-id").val();
    var pokemonName = $("#text-name").val();
    var pokemonType = $("#text-type").val();
    var pokemonSelected = new Pokemon(pokemonID, pokemonName, pokemonType);

    localStorage.setItem("pokemonA", JSON.stringify(pokemonSelected));

    // 4: Set empty pokemon array
    var pokemonList = [];

    // 5: Retrieve items from local storage
    if (localStorage.getItem("pokemonList")) {
      pokemonList = JSON.parse(localStorage.getItem("pokemonList"));
    }

    // 6: Push obj into array
    pokemonList.push(pokemonSelected);

    // 7: Set object into LocalStorage
    localStorage.setItem('pokemonList',JSON.stringify('pokemonList'));



    $("#pokemon-id").html(pokemonLocalStore.pokemonID);
    $("#date-created").html(pokemonLocalStore.dateCreated);
    $("#pokemon-name").html(pokemonLocalStore.pokemonName);
    $("#pokemon-type").html(pokemonLocalStore.pokemonType);
  });
});

// 2: Create Pokemon function object model template
function Pokemon(pokemonID, pokemonName, pokemonType) {
  this.pokemonID = pokemonID;
  this.pokemonName = pokemonName;
  this.pokemonType = pokemonType;
  this.dateCreated = Date.now();
}

// 8. Looping mechanic
function displayPokemon(){
  
} 
