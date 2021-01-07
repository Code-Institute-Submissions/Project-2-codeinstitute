// 1: Check that DOM is ready
$(document).ready(function () {
  // pull saved party pokemon
  getPokemon(1);
  getPokemon(2);
  getPokemon(3);
  getPokemon(4);
  getPokemon(5);
  getPokemon(6);

  // declare variables
  let pokemonPreview;
  let pokemonPreviewSpecies;
  let typeURL = {
    bug: "https://www.serebii.net/pokedex-bw/type/bug.gif",
    dark: "https://www.serebii.net/pokedex-bw/type/dark.gif",
    dragon: "https://www.serebii.net/pokedex-bw/type/dragon.gif",
    electric: "https://www.serebii.net/pokedex-bw/type/electric.gif",
    fairy: "https://www.serebii.net/pokedex-bw/type/fairy.gif",
    fighting: "https://www.serebii.net/pokedex-bw/type/fighting.gif",
    fire: "https://www.serebii.net/pokedex-bw/type/fire.gif",
    flying: "https://www.serebii.net/pokedex-bw/type/flying.gif",
    ghost: "https://www.serebii.net/pokedex-bw/type/ghost.gif",
    grass: "https://www.serebii.net/pokedex-bw/type/grass.gif",
    ground: "https://www.serebii.net/pokedex-bw/type/ground.gif",
    ice: "https://www.serebii.net/pokedex-bw/type/ice.gif",
    normal: "https://www.serebii.net/pokedex-bw/type/normal.gif",
    poison: "https://www.serebii.net/pokedex-bw/type/poison.gif",
    psychic: "https://www.serebii.net/pokedex-bw/type/psychic.gif",
    rock: "https://www.serebii.net/pokedex-bw/type/rock.gif",
    steel: "https://www.serebii.net/pokedex-bw/type/steel.gif",
    water: "https://www.serebii.net/pokedex-bw/type/water.gif",
  };

  $("#form-pokemon-entry").submit(function (e) {
    e.preventDefault();
    let pokemonNameInput = $("#text-name").val();

    let pokemonAPI = {
      url: "https://pokeapi.co/api/v2/pokemon/" + pokemonNameInput,
      method: "GET",
      timeout: 0,
    };
    $.ajax(pokemonAPI).done(function (response) {
      pokemonPreview = response;
      console.log(pokemonPreview.sprites.front_default);
      console.log(typeURL[pokemonPreview.types[0].type.name]);

      $("img.pokemonPreview").attr("src", pokemonPreview.sprites.front_default);
      $(".pokemon-preview-name").html(
        pokemonPreview.name.charAt(0).toUpperCase() +
          pokemonPreview.name.slice(1)
      );
      $("img.pokemon-preview-type1").attr(
        "src",
        typeURL[pokemonPreview.types[0].type.name]
      );
      if (pokemonPreview.types[1]) {
        $("img.pokemon-preview-type2").attr(
          "src",
          typeURL[pokemonPreview.types[1].type.name]
        );
      } else {
        $("img.pokemon-preview-type2").attr("src", "");
      }
    });

    let pokemonspeciesAPI = {
      url: "https://pokeapi.co/api/v2/pokemon-species/" + pokemonNameInput,
      method: "GET",
      timeout: 0,
    };
    $.ajax(pokemonspeciesAPI).done(function (response) {
      pokemonPreviewSpecies = response;
      console.log(pokemonPreviewSpecies.genera[7].genus);
      $(".pokemon-preview-genus").html(
        pokemonPreviewSpecies.genera[7].genus.charAt(0).toUpperCase() +
          pokemonPreviewSpecies.genera[7].genus.slice(1)
      );
    });
  });

  // Autocomplete search bar
  $(function () {
    let allPokemonListCall = {
      url: "https://pokeapi.co/api/v2/pokemon?limit=1118",
      method: "GET",
      timeout: 0,
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
  });

  // Adding Pokemon 2 to Party
  $("#save-button2").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon2", JSON.stringify(pokemonPreview));
    getPokemon(2);
  });

  // Adding Pokemon 3 to Party
  $("#save-button3").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon3", JSON.stringify(pokemonPreview));
    getPokemon(3);
  });

  // Adding Pokemon 4 to Party
  $("#save-button4").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon4", JSON.stringify(pokemonPreview));
    getPokemon(4);
  });

  // Adding Pokemon 5 to Party
  $("#save-button5").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon5", JSON.stringify(pokemonPreview));
    getPokemon(5);
  });

  // Adding Pokemon 6 to Party
  $("#save-button6").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon6", JSON.stringify(pokemonPreview));
    getPokemon(6);
  });

  // Another function to extract from local storage and display in table
  function getPokemon(x) {
    if (JSON.parse(localStorage.getItem(`pokemon${x}`))) {
      pokemon = JSON.parse(localStorage.getItem(`pokemon${x}`));
      console.log(pokemon);
      let pokemonNameInput = pokemon.name;

      let pokemonAPI = {
        url: "https://pokeapi.co/api/v2/pokemon/" + pokemonNameInput,
        method: "GET",
        timeout: 0,
      };
      $.ajax(pokemonAPI).done(function (response) {
        pokemonPreview = response;
        let pokemonSprite = pokemonPreview.sprites.front_default;
        console.log("pokemonSprite", pokemonSprite);

        $(`img.pokemon${x}`).attr("src", pokemonSprite);
      });
    }
  }
});
