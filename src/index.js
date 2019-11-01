
const api = 'http://localhost:3000/pokemon';

document.addEventListener('DOMContentLoaded', () => {
  //console.log(POKEMON)
  
  fetchPokemon();
  
})

//fetch
let fetchPokemon = function(){
  return fetch(api)
    .then(function(response) {
      return response.json();
    })
    .then(function(pokemons){
      iteratePokemon(pokemons)
       return filterPokemon(pokemons)
    }) 
}

//iterate through
function iteratePokemon(pokemons) {
  pokemons.forEach(function(pokemon){
    return appendPokemon(pokemon)
  })
}

//add pokemon onto the page
function appendPokemon(pokemon) {
  //
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
}


let filterPokemon = function(pokemons) {
  let searchBar = document.getElementById("pokemon-search-input")
  searchBar.addEventListener('input', function(e){
    console.log("i am searching, outside from the filter")
    console.dir(e.target.value)
    filteredPokemnon = pokemons.filter(function(pokemon) {
      if (pokemon.name.includes(e.target.value)) {
        console.log("i am in the filter function")
        console.dir(e.target.value)
        return appendPokemon(pokemon)
        debugger
      }
    })
  })


}