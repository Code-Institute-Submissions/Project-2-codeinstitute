// 1: Check that DOM is ready
$(document).ready(function () {
  // pull saved pokemon
  getPokemon1();

  // declare variables
  let pokemonPreview;
  let partyPokemon = [];

  $("#form-pokemon-entry").submit(function (e) {
    e.preventDefault();
    let pokemonNameInput = $("#text-name").val();
    let pokemonAPI = {
      url: "https://pokeapi.co/api/v2/pokemon/" + pokemonNameInput,
      method: "GET",
      timeout: 0
    };
    $.ajax(pokemonAPI).done(function (response) {
      pokemonPreview = response;
      let pokemonSprite = pokemonPreview.sprites.front_default;
      console.log("pokemonSprite", pokemonSprite);

      $("img.pokemonPreview").attr("src", pokemonSprite);
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
  // Write a function to save pokemonPreview to the local storage

  // Adding to Party
  $("#save-button1").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon1", JSON.stringify(pokemonPreview));
    getPokemon1();
  })
  // Another function to extract from local storage and display in table
  function getPokemon1() {
    pokemon1 = JSON.parse(localStorage.getItem("pokemon1"));
    console.log(pokemon1)
    let pokemon1NameInput = pokemon1.name

    let pokemonAPI = {
      url: "https://pokeapi.co/api/v2/pokemon/" + pokemon1NameInput,
      method: "GET",
      timeout: 0
    };
    $.ajax(pokemonAPI).done(function (response) {
      pokemonPreview = response;
      let pokemonSprite = pokemonPreview.sprites.front_default;
      console.log("pokemonSprite", pokemonSprite);

      $("img.pokemon1").attr("src", pokemonSprite);
    })
  }
});


