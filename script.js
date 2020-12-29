// 1: Check that DOM is ready
$(document).ready(function () {
  
  // 10: Load all the details in table
  displayPokemon();
  
  
  // 3: Create Form event listener - for button -> on click
  $("#form-pokemon-entry").submit(function (e) {
    e.preventDefault();
    // Creating object via form
    var pokemonID = $("#text-id").val();
    var pokemonName = $("#text-name").val();
    var pokemonType = $("#text-type").val();
    
    var pokemonSelected = new Pokemon(pokemonID, pokemonName, pokemonType);

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

  if(localStorage.getItem('pokemonList')){
    let pokemonList = JSON.parse(localStorage.getItem('pokemonList'));

    if(pokemonList.length){
      for (let pokemonSelected of pokemonList) {
        pokemonInfo += `<tr><td>${pokemonSelected.pokemonID}</td><td>${pokemonSelected.pokemonName}</td><td>${pokemonSelected.pokemonType}</td><td>${pokemonSelected.dateCreated}</td></tr>`;
      }

      $('#pokemon-info').html(pokemonInfo);
    } else {
      $('#pokemon-info').html('No Students Found');
    }

  }
  
} 
