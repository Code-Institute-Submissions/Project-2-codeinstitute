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
      console.log(pokemonPreview.abilities[0].ability.name);
      console.log("hp: ", pokemonPreview.stats[0].base_stat);
      console.log("attack: ", pokemonPreview.stats[1].base_stat);
      console.log("defense: ", pokemonPreview.stats[2].base_stat);
      console.log("special-attack: ", pokemonPreview.stats[3].base_stat);
      console.log("special-defense: ", pokemonPreview.stats[4].base_stat);
      console.log("speed: ", pokemonPreview.stats[5].base_stat);

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
      
      if (pokemonPreview.abilities[1]) {
        $(".pokemon-preview-ability").html(
          `Ability: ${pokemonPreview.abilities[0].ability.name} 
          <br> Hidden Ability: ${pokemonPreview.abilities[1].ability.name}`)
      } else { 
        $(".pokemon-preview-ability").html(
          `Ability 1: ${pokemonPreview.abilities[0].ability.name}`
        )}
      
      
      // Get and Set Pokemon Stats
      $("span.pokemon-preview-total").html(
        pokemonPreview.stats[0].base_stat +
          pokemonPreview.stats[1].base_stat +
          pokemonPreview.stats[2].base_stat +
          pokemonPreview.stats[3].base_stat +
          pokemonPreview.stats[4].base_stat +
          pokemonPreview.stats[5].base_stat
      );
      $("span.pokemon-preview-hp").html(pokemonPreview.stats[0].base_stat);
      $("span.pokemon-preview-attack").html(pokemonPreview.stats[1].base_stat);
      $("span.pokemon-preview-defense").html(pokemonPreview.stats[2].base_stat);
      $("span.pokemon-preview-sp-atk").html(pokemonPreview.stats[3].base_stat);
      $("span.pokemon-preview-sp-def").html(pokemonPreview.stats[4].base_stat);
      $("span.pokemon-preview-speed").html(pokemonPreview.stats[5].base_stat);
      $("#progressbar-hp").progressbar({
        value: (pokemonPreview.stats[0].base_stat / 200) * 100,
      });
      $("#progressbar-attack").progressbar({
        value: (pokemonPreview.stats[1].base_stat / 200) * 100,
      });
      $("#progressbar-defense").progressbar({
        value: (pokemonPreview.stats[2].base_stat / 200) * 100,
      });
      $("#progressbar-sp-atk").progressbar({
        value: (pokemonPreview.stats[3].base_stat / 200) * 100,
      });
      $("#progressbar-sp-def").progressbar({
        value: (pokemonPreview.stats[4].base_stat / 200) * 100,
      });
      $("#progressbar-speed").progressbar({
        value: (pokemonPreview.stats[5].base_stat / 200) * 100,
      });
    });

    let pokemonspeciesAPI = {
      url: "https://pokeapi.co/api/v2/pokemon-species/" + pokemonNameInput,
      method: "GET",
      timeout: 0,
    };
    $.ajax(pokemonspeciesAPI).done(function (response) {
      pokemonPreviewSpecies = response;
      console.log(
        pokemonPreviewSpecies.flavor_text_entries.find(function(x) {
          return x.language.name == "en" 
        }).flavor_text.replace(/\r\n|\n|\r|/gm ," ")
        )
      $(".pokemon-preview-flavor-text").html(
        `"${pokemonPreviewSpecies.flavor_text_entries.find(function(x) {
          return x.language.name == "en" 
        }).flavor_text.replace(/\r\n|\n|\r|/gm ," ")}"`
      )
      
    
      //   .map(function(x) {
      //   if(x.language.name == "en"){
      //     return x.flavor_text
      //   }
      // }
      
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
    localStorage.setItem(
      "pokemon1Species",
      JSON.stringify(pokemonPreviewSpecies)
    );
    getPokemon(1);
  });

  // Adding Pokemon 2 to Party
  $("#save-button2").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon2", JSON.stringify(pokemonPreview));
    localStorage.setItem(
      "pokemon2Species",
      JSON.stringify(pokemonPreviewSpecies)
    );
    getPokemon(2);
  });

  // Adding Pokemon 3 to Party
  $("#save-button3").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon3", JSON.stringify(pokemonPreview));
    localStorage.setItem(
      "pokemon3Species",
      JSON.stringify(pokemonPreviewSpecies)
    );
    getPokemon(3);
  });

  // Adding Pokemon 4 to Party
  $("#save-button4").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon4", JSON.stringify(pokemonPreview));
    localStorage.setItem(
      "pokemon4Species",
      JSON.stringify(pokemonPreviewSpecies)
    );
    getPokemon(4);
  });

  // Adding Pokemon 5 to Party
  $("#save-button5").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon5", JSON.stringify(pokemonPreview));
    localStorage.setItem(
      "pokemon5Species",
      JSON.stringify(pokemonPreviewSpecies)
    );
    getPokemon(5);
  });

  // Adding Pokemon 6 to Party
  $("#save-button6").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon6", JSON.stringify(pokemonPreview));
    localStorage.setItem(
      "pokemon6Species",
      JSON.stringify(pokemonPreviewSpecies)
    );
    getPokemon(6);
  });

  // Another function to extract from local storage and display in table
  function getPokemon(x) {
    if (JSON.parse(localStorage.getItem(`pokemon${x}`))) {
      pokemon = JSON.parse(localStorage.getItem(`pokemon${x}`));
      pokemonSpecies = JSON.parse(localStorage.getItem(`pokemon${x}Species`));
      console.log(pokemon);
      console.log(pokemonSpecies);
      let pokemonNameInput = pokemon.name;

      let pokemonAPI = {
        url: "https://pokeapi.co/api/v2/pokemon/" + pokemonNameInput,
        method: "GET",
        timeout: 0,
      };
      $.ajax(pokemonAPI).done(function (response) {
        pokemonPreview = response;
        console.log(pokemonPreview.sprites.front_default);
        console.log(typeURL[pokemonPreview.types[0].type.name]);

        $(`img.pokemon${x}`).attr("src", pokemonPreview.sprites.front_default);
        $(`.pokemon-${x}-name`).html(
          pokemonPreview.name.charAt(0).toUpperCase() +
            pokemonPreview.name.slice(1)
        );
        $(`img.pokemon-${x}-type1`).attr(
          "src",
          typeURL[pokemonPreview.types[0].type.name]
        );
        if (pokemonPreview.types[1]) {
          $(`img.pokemon-${x}-type2`).attr(
            "src",
            typeURL[pokemonPreview.types[1].type.name]
          );
        } else {
          $(`img.pokemon-${x}-type2`).attr("src", "");
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
        $(`.pokemon-${x}-genus`).html(
          pokemonPreviewSpecies.genera[7].genus.charAt(0).toUpperCase() +
            pokemonPreviewSpecies.genera[7].genus.slice(1)
        );
      });
    }
  }
});
