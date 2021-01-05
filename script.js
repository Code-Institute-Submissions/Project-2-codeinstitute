// 1: Check that DOM is ready
$(document).ready(function () {
  let pokemonPreview;
  $("#form-pokemon-entry").submit(function (e) {
    e.preventDefault();
    var pokemonNameInput = $("#text-name").val();
    var pokemonAPI = {
      url: "https://pokeapi.co/api/v2/pokemon/" + pokemonNameInput,
      method: "GET",
      timeout: 0
    };
    $.ajax(pokemonAPI).done(function (response) {
      pokemonPreview = response;
      let pokemonSprite = pokemonPreview.sprites.front_default;
      console.log("pokemonSprite", pokemonSprite);

      $("img.pokemonPreview").attr("src", pokemonSprite);
      // Write a function to save pokemonPreview to the local storage
      // Another function to extract from local storage and display in table
    });
  });

  // Autocomplete search bar
  $(function () {
    let allPokemonListCall = {
      url: "https://pokeapi.co/api/v2/pokemon?limit=1118",
      method: "GET",
      timeout: 0
    };
    $.ajax(allPokemonListCall).done(function (response) {
      console.log(
        response.results.map(function (x) {
          return x.name;
        })
      );
      let allPokemonList = response.results.map(function (x) {
        return x.name;
      });
      $("#text-name").autocomplete({
        source: allPokemonList,
      });
    });
  });
  
  // Adding to Party
  $("#form-pokemon-entry").submit(function (e) {
    e.preventDefault();
    console.log(pokemonPreview)
  })
});


