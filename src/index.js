document.addEventListener('DOMContentLoaded', () => {

let pokemonContainer = document.getElementById("pokemon-container")
let currentPokemon = []
let notice = pokemonContainer.children[1]
let form = document.getElementById("pokemon-search-form")



function pokemonFilter(array, searchValue) {
  array.forEach(function(element){
    if (element.name.includes(searchValue)) {
      appendPokemon(element)
    }})}


form.addEventListener("input", function(e) {

  e.preventDefault()
  pokemonContainer.innerHTML= ""

  let searchValue = e.target.value

  fetch('http://localhost:3000/pokemon')
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      pokemonFilter(response, searchValue)
    }
  )  
})




function switchImage(e) {


  fetch('http://localhost:3000/pokemon')
    .then(function(response) {
      return response.json()
    })
      .then(function(json){ 
        json.forEach(function(pokemon) {
          if (pokemon.id === parseInt(e.target.dataset.id)) {
            if (e.target.src === `${pokemon.sprites.front}`) {
              e.target.src = `${pokemon.sprites.back}`
            } else {
              e.target.src = `${pokemon.sprites.front}`
            }
          }
        })
      })
  
}



function appendPokemon(pokemon) {

let divCard = document.createElement("div")
divCard.className="pokemon-card"
let divFrame = document.createElement("div")
divFrame.className= "pokemon-frame"
let h1 = document.createElement("h1")
h1.className= "center-text"
h1.innerText= `${pokemon.name}`
let divImage = document.createElement("div")
divImage.className= "pokemon-image"
let img = document.createElement("img")
img.className="toggle-sprite"
img.src= `${pokemon.sprites.front}`
img.dataset.id = pokemon.id 
img.dataset.action = "flip"

img.addEventListener("click", switchImage) 
  

divCard.appendChild(divFrame)
divFrame.appendChild(h1)
divFrame.appendChild(divImage)
divImage.appendChild(img)
pokemonContainer.appendChild(divCard)




}

function getPokemon() {
  fetch('http://localhost:3000/pokemon')
  .then(function(response){
    return response.json()
  })
  .then(function(response) {
  
    response.forEach(function(pokemon) {
      appendPokemon(pokemon)
      // currentPokemon.push(pokemon)
    })
  
  })
  notice.innerText = ""

}




getPokemon()
console.log(currentPokemon)






})
