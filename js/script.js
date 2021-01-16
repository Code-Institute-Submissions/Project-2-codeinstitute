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
  // Pokemon Type gif URLs
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

  // Pokedex Search Section 
  $("#form-pokemon-entry").submit(function (e) {
    e.preventDefault();

    // clear the previewChosenMoveList
    $(`.preview-move-chosen`).remove();
    localStorage.removeItem("previewChosenMoveList");

    let pokemonNameInput = $("#text-name").val();
    // Call Pokemon API
    let pokemonAPI = {
      url: "https://pokeapi.co/api/v2/pokemon/" + pokemonNameInput,
      method: "GET",
      timeout: 0,
    };
    $.ajax(pokemonAPI).done(function (response) {
          pokemonPreview = response;

          $("img.pokemonPreview").attr(
            "src",
            pokemonPreview.sprites.front_default
          );
          $(".pokemon-preview-name").html(
            pokemonPreview.name.charAt(0).toUpperCase() +
              pokemonPreview.name.slice(1)
          );
          // Dual Type handling
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
          // Hidden Ability Handling
          if (pokemonPreview.abilities[1]) {
            $(".pokemon-preview-ability").html(
              `Ability: ${pokemonPreview.abilities[0].ability.name} 
          <br> Hidden Ability: ${pokemonPreview.abilities[1].ability.name}`
            );
          } else {
            $(".pokemon-preview-ability").html(
              `Ability 1: ${pokemonPreview.abilities[0].ability.name}`
            );
          }

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
          $("span.pokemon-preview-attack").html(
            pokemonPreview.stats[1].base_stat
          );
          $("span.pokemon-preview-defense").html(
            pokemonPreview.stats[2].base_stat
          );
          $("span.pokemon-preview-sp-atk").html(
            pokemonPreview.stats[3].base_stat
          );
          $("span.pokemon-preview-sp-def").html(
            pokemonPreview.stats[4].base_stat
          );
          $("span.pokemon-preview-speed").html(
            pokemonPreview.stats[5].base_stat
          );
          // Handle progress bar scaling by /200*100
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

          // Initialize Pokemon Move info variable
          let pokemonMoveInfo = "";

          // Extract moves from the API response
          let pokemonMoveList = pokemonPreview.moves.map(function (x) {
            return x.move.name;
          });

          // loop to check if movelist exists and then store moves into pokemonMoveInfo
          if (pokemonMoveList.length) {
            for (let moves of pokemonMoveList) {
              pokemonMoveInfo += `<option value="${moves}">${moves}</option>`;
            }
          }
          $("#pokemon-preview-move-select").html(
            `<option value="">--Available Moveset--</option>${pokemonMoveInfo}`
          ); 
        }
      )
      // failure check for pokemonAPI
      .fail(function (response) {
        if (response.status == "404") {
          alert("Please Enter a Real Pokémon");
        }
      }); // eof

    let pokemonspeciesAPI = {
      url: "https://pokeapi.co/api/v2/pokemon-species/" + pokemonNameInput,
      method: "GET",
      timeout: 0,
    };
    $.ajax(pokemonspeciesAPI).done(function (response) {
      pokemonPreviewSpecies = response;
      // Get pokedex text
      $(".pokemon-preview-flavor-text").html(
        `Pokédex Entry: "${pokemonPreviewSpecies.flavor_text_entries
          .find(function (x) {
            return x.language.name == "en";
          })
          .flavor_text.replace(/\r\n|\n|\r|/gm, " ")}"`
      );
      // Get pokemon genus
      $(".pokemon-preview-genus").html(
        pokemonPreviewSpecies.genera[7].genus.charAt(0).toUpperCase() +
          pokemonPreviewSpecies.genera[7].genus.slice(1)
      );
    });
  }); //eof

  // Move Selector Listener for each pokemon that stores chosen moves for preview pokemon
  $(function () {
    $("#pokemon-preview-move-select").change(function (event) {
      event.preventDefault();
      moveListSanityDisplay(`preview`);
    });
  }); //eof

  $(function () {
    $("#pokemon-1-move-select").change(function (event) {
      event.preventDefault();
      moveListSanityDisplay(`1`);
    });
  }); //eof

  $(function () {
    $("#pokemon-2-move-select").change(function (event) {
      event.preventDefault();
      moveListSanityDisplay(`2`);
    });
  }); //eof

  $(function () {
    $("#pokemon-3-move-select").change(function (event) {
      event.preventDefault();
      moveListSanityDisplay(`3`);
    });
  }); //eof

  $(function () {
    $("#pokemon-4-move-select").change(function (event) {
      event.preventDefault();
      moveListSanityDisplay(`4`);
    });
  }); //eof

  $(function () {
    $("#pokemon-5-move-select").change(function (event) {
      event.preventDefault();
      moveListSanityDisplay(`5`);
    });
  }); //eof

  $(function () {
    $("#pokemon-6-move-select").change(function (event) {
      event.preventDefault();
      moveListSanityDisplay(`6`);
    });
  }); //eof

  // function for checking movelist sanity(check if moves duplicated)
  function moveListSanityDisplay(x) {
    let chosenMove = $(`#pokemon-${x}-move-select`).val();

    // initialise List variable
    let chosenMoveList = [];

    // Get Move List if it exists in local storage
    if (localStorage.getItem(`${x}ChosenMoveList`)) {
      if (
        JSON.parse(
          localStorage.getItem(`${x}ChosenMoveList`).includes(chosenMove)
        )
      ) {
        alert("Move has already been selected");
        // directly display moves
        displayMoveList(x);
      } else {
        chosenMoveList = JSON.parse(localStorage.getItem(`${x}ChosenMoveList`));
        // Pass chosen move into list
        chosenMoveList.push(chosenMove);
        // Store list into localstorage
        localStorage.setItem(
          `${x}ChosenMoveList`,
          JSON.stringify(chosenMoveList)
        );

        displayMoveList(x);
      }
    } else {
      // Pass chosen move into list
      chosenMoveList.push(chosenMove);
      // Store list into localstorage
      localStorage.setItem(
        `${x}ChosenMoveList`,
        JSON.stringify(chosenMoveList)
      );

      displayMoveList(x);
    }
  } //eof

  // function for displaying movelist
  function displayMoveList(x) {
    let movesListExtracted = "";

    // get chosen moves for pokemon(x) from localstorage
    if (localStorage.getItem(`${x}ChosenMoveList`)) {
      // save into variable pokemonMoveListExtracted
      let pokemonMoveListExtracted = JSON.parse(
        localStorage.getItem(`${x}ChosenMoveList`)
      );

      // add html tag to each element
      if (pokemonMoveListExtracted.length) {
        for (let movesExtracted of pokemonMoveListExtracted) {
          movesListExtracted += `<div class="${x}-move-chosen">${movesExtracted}</div>`;
        }
      }
      $(`#pokemon-${x}-move-chosen`).html(movesListExtracted);
    }
  } //eof

  // event listener for clearing move buttons
  $("#pokemon-preview-move-clear").click(function (e) {
    e.preventDefault();
    $(`.preview-move-chosen`).remove();
    localStorage.removeItem("previewChosenMoveList");
  }); //eof

  $("#pokemon-1-move-clear").click(function (e) {
    e.preventDefault();
    $(`.1-move-chosen`).remove();
    localStorage.removeItem("1ChosenMoveList");
  }); //eof

  $("#pokemon-2-move-clear").click(function (e) {
    e.preventDefault();
    $(`.2-move-chosen`).remove();
    localStorage.removeItem("2ChosenMoveList");
  }); //eof

  $("#pokemon-3-move-clear").click(function (e) {
    e.preventDefault();
    $(`.3-move-chosen`).remove();
    localStorage.removeItem("3ChosenMoveList");
  }); //eof

  $("#pokemon-4-move-clear").click(function (e) {
    e.preventDefault();
    $(`.4-move-chosen`).remove();
    localStorage.removeItem("4ChosenMoveList");
  }); //eof

  $("#5-preview-move-clear").click(function (e) {
    e.preventDefault();
    $(`.5-move-chosen`).remove();
    localStorage.removeItem("5ChosenMoveList");
  }); //eof

  $("#6-preview-move-clear").click(function (e) {
    e.preventDefault();
    $(`.6-move-chosen`).remove();
    localStorage.removeItem("6ChosenMoveList");
  }); //eof

  // Autocomplete search bar
  $(function () {
    let allPokemonListCall = {
      url: "https://pokeapi.co/api/v2/pokemon?limit=1118",
      method: "GET",
      timeout: 0,
    };
    $.ajax(allPokemonListCall).done(function (response) {
      // .map() method to drill into response array
      let allPokemonList = response.results.map(function (x) {
        return x.name;
      });
      $("#text-name").autocomplete({
        source: allPokemonList,
      });
    });
  }); //eof

  // Adding Pokemon 1 to Party
  $("#save-button1").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon1", JSON.stringify(pokemonPreview));
    localStorage.setItem(
      "pokemon1Species",
      JSON.stringify(pokemonPreviewSpecies)
    );
    $(`.1-move-chosen`).remove();
    localStorage.removeItem("1ChosenMoveList");
    if (localStorage.getItem("previewChosenMoveList")) {

      let saveMovelist = JSON.parse(localStorage.getItem("previewChosenMoveList"));

      localStorage.setItem("1ChosenMoveList", JSON.stringify(saveMovelist));
    }
    getPokemon(1);
    alert(
      `You have saved ${JSON.parse(localStorage.getItem("pokemon1")).name}`
    );
  }); //eof

  // Adding Pokemon 2 to Party
  $("#save-button2").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon2", JSON.stringify(pokemonPreview));
    localStorage.setItem(
      "pokemon2Species",
      JSON.stringify(pokemonPreviewSpecies)
    );
    $(`.2-move-chosen`).remove();
    localStorage.removeItem("2ChosenMoveList");
    if (localStorage.getItem("previewChosenMoveList")) {

      let saveMovelist = JSON.parse(localStorage.getItem("previewChosenMoveList"));

      localStorage.setItem("2ChosenMoveList", JSON.stringify(saveMovelist));
    }
    getPokemon(2);
    alert(
      `You have saved ${JSON.parse(localStorage.getItem("pokemon2")).name}`
    );
  }); //eof

  // Adding Pokemon 3 to Party
  $("#save-button3").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon3", JSON.stringify(pokemonPreview));
    localStorage.setItem(
      "pokemon3Species",
      JSON.stringify(pokemonPreviewSpecies)
    );
    $(`.3-move-chosen`).remove();
    localStorage.removeItem("3ChosenMoveList");
    if (localStorage.getItem("previewChosenMoveList")) {

      let saveMovelist = JSON.parse(localStorage.getItem("previewChosenMoveList"));

      localStorage.setItem("3ChosenMoveList", JSON.stringify(saveMovelist));
    }
    getPokemon(3);
    alert(
      `You have saved ${JSON.parse(localStorage.getItem("pokemon3")).name}`
    );
  }); //eof

  // Adding Pokemon 4 to Party
  $("#save-button4").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon4", JSON.stringify(pokemonPreview));
    localStorage.setItem(
      "pokemon4Species",
      JSON.stringify(pokemonPreviewSpecies)
    );
    $(`.4-move-chosen`).remove();
    localStorage.removeItem("4ChosenMoveList");
    if (localStorage.getItem("previewChosenMoveList")) {

      let saveMovelist = JSON.parse(localStorage.getItem("previewChosenMoveList"));

      localStorage.setItem("4ChosenMoveList", JSON.stringify(saveMovelist));
    }
    getPokemon(4);
    alert(
      `You have saved ${JSON.parse(localStorage.getItem("pokemon4")).name}`
    );
  }); //eof

  // Adding Pokemon 5 to Party
  $("#save-button5").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon5", JSON.stringify(pokemonPreview));
    localStorage.setItem(
      "pokemon5Species",
      JSON.stringify(pokemonPreviewSpecies)
    );
    $(`.5-move-chosen`).remove();
    localStorage.removeItem("5ChosenMoveList");
    if (localStorage.getItem("previewChosenMoveList")) {

      let saveMovelist = JSON.parse(localStorage.getItem("previewChosenMoveList"));

      localStorage.setItem("5ChosenMoveList", JSON.stringify(saveMovelist));
    }
    getPokemon(5);
    alert(
      `You have saved ${JSON.parse(localStorage.getItem("pokemon5")).name}`
    );
  }); //eof

  // Adding Pokemon 6 to Party
  $("#save-button6").click(function (e) {
    e.preventDefault();
    localStorage.setItem("pokemon6", JSON.stringify(pokemonPreview));
    localStorage.setItem(
      "pokemon6Species",
      JSON.stringify(pokemonPreviewSpecies)
    );
    $(`.6-move-chosen`).remove();
    localStorage.removeItem("6ChosenMoveList");
    if (localStorage.getItem("previewChosenMoveList")) {

      let saveMovelist = JSON.parse(localStorage.getItem("previewChosenMoveList"));

      localStorage.setItem("6ChosenMoveList", JSON.stringify(saveMovelist));
    }
    getPokemon(6);
    alert(
      `You have saved ${JSON.parse(localStorage.getItem("pokemon6")).name}`
    );
  }); //eof

  // GetPokemon function to extract from local storage and display in table
  function getPokemon(x) {
    if (JSON.parse(localStorage.getItem(`pokemon${x}`))) {
      let pokemon = JSON.parse(localStorage.getItem(`pokemon${x}`));

      let pokemonNameInput = pokemon.name;

      let pokemonAPI = {
        url: "https://pokeapi.co/api/v2/pokemon/" + pokemonNameInput,
        method: "GET",
        timeout: 0,
      };
      $.ajax(pokemonAPI).done(function (response) {
        pokemonPreview = response;

        $(`img.pokemon${x}`).attr("src", pokemonPreview.sprites.front_default);
        $(`.pokemon-${x}-name`).html(
          pokemonPreview.name.charAt(0).toUpperCase() +
            pokemonPreview.name.slice(1)
        );
        $(`img.slot-${x}-img`).attr("src",pokemonPreview.sprites.front_default);
        $(`img.pokemon-${x}-type1`).attr(
          "src",
          typeURL[pokemonPreview.types[0].type.name]
        );
        // Dual Type handling
        if (pokemonPreview.types[1]) {
          $(`img.pokemon-${x}-type2`).attr(
            "src",
            typeURL[pokemonPreview.types[1].type.name]
          );
        } else {
          $(`img.pokemon-${x}-type2`).attr("src", "");
        }
        // Ability and hidden ability handling
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

        $(`span.pokemon-${x}-total`).html(
          pokemonPreview.stats[0].base_stat +
            pokemonPreview.stats[1].base_stat +
            pokemonPreview.stats[2].base_stat +
            pokemonPreview.stats[3].base_stat +
            pokemonPreview.stats[4].base_stat +
            pokemonPreview.stats[5].base_stat
        );
        $(`span.pokemon-${x}-hp`).html(pokemonPreview.stats[0].base_stat);
        $(`span.pokemon-${x}-attack`).html(pokemonPreview.stats[1].base_stat);
        $(`span.pokemon-${x}-defense`).html(pokemonPreview.stats[2].base_stat);
        $(`span.pokemon-${x}-sp-atk`).html(pokemonPreview.stats[3].base_stat);
        $(`span.pokemon-${x}-sp-def`).html(pokemonPreview.stats[4].base_stat);
        $(`span.pokemon-${x}-speed`).html(pokemonPreview.stats[5].base_stat);
        // Stat and progress bar scaling by /200*100
        $(`#${x}-progressbar-hp`).progressbar({
          value: (pokemonPreview.stats[0].base_stat / 200) * 100,
        });
        $(`#${x}-progressbar-attack`).progressbar({
          value: (pokemonPreview.stats[1].base_stat / 200) * 100,
        });
        $(`#${x}-progressbar-defense`).progressbar({
          value: (pokemonPreview.stats[2].base_stat / 200) * 100,
        });
        $(`#${x}-progressbar-sp-atk`).progressbar({
          value: (pokemonPreview.stats[3].base_stat / 200) * 100,
        });
        $(`#${x}-progressbar-sp-def`).progressbar({
          value: (pokemonPreview.stats[4].base_stat / 200) * 100,
        });
        $(`#${x}-progressbar-speed`).progressbar({
          value: (pokemonPreview.stats[5].base_stat / 200) * 100,
        });

        // Initialize Pokemon Move info variable
        let pokemonMoveInfo = "";

        // Extract moves from the API response
        let pokemonMoveList = pokemonPreview.moves.map(function (x) {
          return x.move.name;
        });

        // loop to check if movelist exists and then store moves into pokemonMoveInfo
        if (pokemonMoveList.length) {
          for (let moves of pokemonMoveList) {
            pokemonMoveInfo += `<option value="${moves}">${moves}</option>`;
          }
        }
        $(`#pokemon-${x}-move-select`).html(
          `<option value="">--Available Moveset--</option>${pokemonMoveInfo}`
        );

        displayMoveList(x);
      });

      let pokemonspeciesAPI = {
        url: "https://pokeapi.co/api/v2/pokemon-species/" + pokemonNameInput,
        method: "GET",
        timeout: 0,
      };
      $.ajax(pokemonspeciesAPI).done(function (response) {
        pokemonPreviewSpecies = response;
        // Get pokedex flavor text
        $(`.pokemon-${x}-flavor-text`).html(
          `Pokédex Entry: "${pokemonPreviewSpecies.flavor_text_entries
            .find(function (x) {
              return x.language.name == "en";
            })
            .flavor_text.replace(/\r\n|\n|\r|/gm, " ")}"`
        );
        // Get pokemon genus
        $(`.pokemon-${x}-genus`).html(
          pokemonPreviewSpecies.genera[7].genus.charAt(0).toUpperCase() +
            pokemonPreviewSpecies.genera[7].genus.slice(1)
        );
      });
    }
  } //eof
}); // end of Document Ready Function
