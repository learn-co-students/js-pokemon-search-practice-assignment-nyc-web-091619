
const api = 'http://localhost:3000/pokemon';

document.addEventListener('DOMContentLoaded', () => {
  //console.log(POKEMON)
  POKEMON
  
  fetchPokemon();
  filterPokemon(POKEMON)
  
})

//fetch
let fetchPokemon = function(){
  return fetch(api)
    .then(function(response) {
      return response.json();
    })
    .then(function(pokemons){
      return iteratePokemon(pokemons)
       //return filterPokemon(pokemons)
    }) 
    //
}

//iterate through
function iteratePokemon(pokemons) {
  // let pkc = document.getElementsByClassName("pokemon-card")
  // console.log(`${pkc.length}, I am pkc length`)
  // for (let i = 0; i < pkc.length; i++) {
  //   console.log(i)
  //   pkc[i].remove()
  // }
  
  pokemons.forEach(function(pokemon){
    return appendPokemon(pokemon)
  })
}

//add pokemon onto the page
function appendPokemon(pokemon) {
  // console.log("appending")
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
  // console.log(`i am adding ${pokemon}`)
}

let pokemonCardClass = document.getElementsByClassName("pokemon-card")

let filterPokemon = function(pokemon) {
  let searchBar = document.getElementById("pokemon-search-input")
  
  console.log(`${pokemonCardClass.length}, I am pokemon-card length at filterPokemon`)
  
  searchBar.addEventListener('input', function(e) {
    
    console.log(`${pokemonCardClass.length}, I am pokemon-card length, after the event listener is called`)

    /* Hi I am a current mod 3 student: 
    
    Can someone explain the difference between these two, 
    I would expect it to have the same behavior, but results of first
    one, do not produce the correct values, whenreas the other one
    does. */
    
    // this one does not work
    // HTMLCollection.prototype.forEach = Array.prototype.forEach
    // pokemonCardClass.forEach(function(element){
    //   element.remove()
    // })

    //This one works
    Array.from(pokemonCardClass).forEach(function(element) {
      element.remove()
    })

    

    // for (const element of pokemonCardClass) {
    //   console.log(`The pokemonCardClass length is ${pokemonCardClass.length}`)
    //   element.remove()
    // }

  //   for (let i = 0; i < fixedPkcLenght; i++) {
  //   console.log(`The pkc length is ${pkc.length}, and i has iterated ${i} times`)
  //   pkc[i].remove()
  // }
    console.log("In filtered pokemon, after the event clicker")
    
    filteredPokemon = pokemon.filter(function(pokemon) {

      if (pokemon.name.includes(e.target.value)) {
        
        console.log(e.target.value)
        
        return pokemon
      } 
    })
    
    iteratePokemon(filteredPokemon)

    // if(!!filteredPokemon.length) {
    //   center.style.display = "block"
    // }
  })
}