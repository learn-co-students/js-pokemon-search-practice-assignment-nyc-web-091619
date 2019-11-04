const api = 'http://localhost:3000/pokemon';

document.addEventListener('DOMContentLoaded', () => {
  fetchPokemon();
})

//fetch
let fetchPokemon = function(){
  return fetch(api)
    .then(function(response) {
      return response.json();
    })
    .then(function(pokemons){
      iteratePokemon(pokemons);
      filterPokemon(pokemons)
      return flipPokemon(pokemons)
      
    }) 
} //end fetch

//iterate through
function iteratePokemon(pokemons) {
  pokemons.forEach(function(pokemon){
    return appendPokemon(pokemon)
  })
} //end iteration

//add pokemon onto the page
function appendPokemon(pokemon) {
  center = document.querySelector("center")
  center.style.display = "none"

  // attributes to build image
  let image = document.createElement("img")
  image.dataset.id = pokemon.id
  image.dataset.action = "flip"
  image.className = "toggle-sprite"
  image.src = pokemon.sprites.front 

  //div class to put image into
  let pokemonImageContainer = document.createElement("div")
  pokemonImageContainer.className = "pokemon-image"

  //create h1 tag to hold pokemon name
  let h1 = document.createElement("h1")
  h1.className = "center-text"
  h1.innerText = pokemon.name

  //create div frame
  let pokemonFrameContainer = document.createElement("div")
  pokemonFrameContainer.className = "pokemon-frame"

  //create div card
  let pokemonCardContainer = document.createElement("div")
  pokemonCardContainer.className = "pokemon-card"

  pokemonCardContainer.appendChild(pokemonFrameContainer)
  pokemonFrameContainer.appendChild(h1)
  h1.appendChild(pokemonImageContainer)
  pokemonImageContainer.appendChild(image)

  let pkc = document.getElementById("pokemon-container")
  pkc.appendChild(pokemonCardContainer)
} //append pokemon

let pokemonCardClass = document.getElementsByClassName("pokemon-card")

//filter pokemon
let filterPokemon = function(pokemons) {
  let searchBar = document.getElementById("pokemon-search-input")
  searchBar.addEventListener('input', function(e) {
    Array.from(pokemonCardClass).forEach(function(element) {
      element.remove()
    })
    
    let filteredPokemon = pokemons.filter(function(pokemon) {
      if (pokemon.name.includes(e.target.value)) {
        return pokemon
      } 
    })
    if (!filteredPokemon.length) {
      center.style.display = "block"
    }
    iteratePokemon(filteredPokemon)
  })
} //end filter pokemon


let flipPokemon = function(pokemons) {
  document.addEventListener('click', function(e) {
    if (e.target.className === "toggle-sprite") {
      let id = parseInt(e.target.dataset.id)
      let foundPokemon = pokemons.find(function(pokemon) {
        return pokemon.id === id
      })

    if (e.target.src === foundPokemon.sprites.front) {
      e.target.src = foundPokemon.sprites.back
    } else {
      e.target.src = foundPokemon.sprites.front
    }
    }
  })
} //end flipPokemon

//solution from github

document.addEventListener('DOMContentLoaded', () => {
  /*********************** DOM Selectors ****************************************/
    const pokemonContainer = document.querySelector('#pokemon-container')
    const pokemonSearchForm = document.querySelector('#pokemon-search-form')
  
  /*********************** Initial Render ***************************************/
    pokemonContainer.innerHTML = renderAllPokemon(POKEMON) //add all pokemon to page on initial page load
  
  /************************ Event Listeners *************************************/
    pokemonContainer.addEventListener('click', (event) => {
      if (event.target.dataset.action === 'flip') {
        // dataset always returns string data we can use == to leverage type coerscion to compare:
        // '1' === 1 //false
        // '1' == 1 //true
        //arrow fn no curlies {} will IMPLICITLY RETURN
        const targetPoke = POKEMON.find(pokeObj => pokeObj.id == event.target.dataset.id)
        // alternatively, parseInt('1') // 1
        // const targetPoke = POKEMON.find(pokeObj => pokeObj.id === parseInt(event.target.dataset.id))
        if (event.target.src === targetPoke.sprites.front) {
          event.target.src = targetPoke.sprites.back
        } else {
          event.target.src = targetPoke.sprites.front
        }
      }
    })
  
    pokemonSearchForm.addEventListener('input', (event) => {
      const filteredPokes = POKEMON.filter(pokeObj => pokeObj.name.includes(event.target.value.toLowerCase()))
      const filteredPokeHTML = renderAllPokemon(filteredPokes)
      // if our filter returns no pokemon, filteredPokeHTML will be an empty string
      // empty strings are `falsey` in js
      // if (filteredPokeHTML) { // empty string is `falsey`
      //   pokemonContainer.innerHTML = filteredPokeHTML
      // } else {
      //   pokemonContainer.innerHTML = `<p><center>There are no Pokémon here</center></p>`
      // }
      // using a ternary:
      pokemonContainer.innerHTML = filteredPokeHTML ? filteredPokeHTML : `<p><center>There are no Pokémon here</center></p>`
    })
  })

/************************* Helper Fns for Producing HTML **********************/
function renderAllPokemon(pokemonArray) {
  return pokemonArray.map(renderSinglePokemon).join('')
}

function renderSinglePokemon(pokemon) {
  return (`
  <div class="pokemon-card">
    <div class="pokemon-frame">
      <h1 class="center-text">${pokemon.name}</h1>
      <div class="pokemon-image">
        <img data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
      </div>
    </div>
  </div>`)
}