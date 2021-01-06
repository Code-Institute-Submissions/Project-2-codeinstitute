// 1: Check that DOM is ready
$(document).ready(function () {
  // pull saved pokemon
  getPokemon(1);
  getPokemon(2);
  getPokemon(3);
  getPokemon(4);
  getPokemon(5);
  getPokemon(6);

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

  // Adding Pokemon 1 to Party
  $("#save-button1").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon1", JSON.stringify(pokemonPreview));
    getPokemon(1);
  })

  // Adding Pokemon 2 to Party
  $("#save-button2").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon2", JSON.stringify(pokemonPreview));
    getPokemon(2);
  })

  // Adding Pokemon 3 to Party
  $("#save-button3").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon3", JSON.stringify(pokemonPreview));
    getPokemon(3);
  })

  // Adding Pokemon 4 to Party
  $("#save-button4").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon4", JSON.stringify(pokemonPreview));
    getPokemon(4);
  })
  
  // Adding Pokemon 5 to Party
  $("#save-button5").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon5", JSON.stringify(pokemonPreview));
    getPokemon(5);
  })

  // Adding Pokemon 6 to Party
  $("#save-button6").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon6", JSON.stringify(pokemonPreview));
    getPokemon(6);
  })


  // Another function to extract from local storage and display in table
  function getPokemon(x) {
    pokemon = JSON.parse(localStorage.getItem(`pokemon${x}`));
    console.log(pokemon)
    let pokemonNameInput = pokemon.name

    let pokemonAPI = {
      url: "https://pokeapi.co/api/v2/pokemon/" + pokemonNameInput,
      method: "GET",
      timeout: 0
    };
    $.ajax(pokemonAPI).done(function (response) {
      pokemonPreview = response;
      let pokemonSprite = pokemonPreview.sprites.front_default;
      console.log("pokemonSprite", pokemonSprite);

      $(`img.pokemon${x}`).attr("src", pokemonSprite);
    })
  }
});


