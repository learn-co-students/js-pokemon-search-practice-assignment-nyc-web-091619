document.addEventListener('DOMContentLoaded', () => {
  console.log(POKEMON)
  //YOUR CODE HERE
  let removeDiv = document.querySelector("#pokemon-container")
  let removeP = document.getElementsByTagName("p")
  removeDiv.remove(removeP)
  
  let pokeApi = 'http://localhost:3000/pokemon'
  function getPokemons() {
    fetch(pokeApi)
    .then(function(resp) {
      return resp.json()
    }) 
    .then(function(data) {
      data.forEach(appendPokemons)
    })
  }

  getPokemons()

  let containerDiv = document.createElement("div")
  containerDiv.id = "pokemon-container"
  let bigDiv = document.querySelector("#container")
  
  let appendPokemons = function(e) {
    let cardDiv = document.createElement("div")
    let frameDiv = document.createElement("div")
    let pokeName = document.createElement("h1")
    let imgDiv = document.createElement("div")
    let pokeImg = document.createElement("img")
    
    cardDiv.className = "pokemon-card"
    frameDiv.className = "pokemon-frame"
    pokeName.className = "center-text"
    imgDiv.className = "pokemon-image"
    pokeImg.className = "toggle-spirit"
    pokeImg.dataset.action = "flip"
    
    pokeName.innerText = e.name
    pokeImg.dataset.id = e.id
    pokeImg.src = e.sprites.front
    let flip = e.sprites.back
    let unflip = e.sprites.front
    pokeImg.addEventListener("click", function() {
      if (pokeImg.src === unflip) {
        pokeImg.src = flip
      } else if (pokeImg.src === flip) {
        pokeImg.src = unflip
      }
    })
    
    imgDiv.appendChild(pokeImg)
    frameDiv.appendChild(pokeName)
    frameDiv.appendChild(imgDiv)
    cardDiv.appendChild(frameDiv)
    containerDiv.appendChild(cardDiv)
    bigDiv.appendChild(containerDiv)
  }

  let pokeForm = document.querySelector("#pokemon-search-form")
  // let names = document.querySelectorAll("h1")
  // names.isArray(Array.prototype)
  pokeForm.addEventListener("input", function (e) {
    console.log("input", e.target.value)
    let containerDiv = document.getElementById("pokemon-container")
    containerDiv.innerHTML = ""

      POKEMON.forEach( function(poke) {

        if(poke.name.includes(e.target.value)){
          appendPokemons(poke)
        }
      })
      // let newContainerDiv = document.querySelector("#pokemon-container")
      // const filteredPokes = POKEMON.filter(function(pokeObj) { 
      //   pokeObj.name.includes(e.target.value.toLowerCase())
      // })
      // const filteredPokeHTML = renderFilteredPokemon(filteredPokes)
      // newContainerDiv.append(filteredPokeHTML)
      // console.log(filteredPokes)
  })

  // function renderFilteredPokemon(pokemonArray) {
  //   return pokemonArray.map(onePoke).join('')
  // }

  // function onePoke(e) {
  //   return (`
  //   <div class="pokemon-card">
  //     <div class="pokemon-frame">
  //       <h1 class="center-text">${e.name}</h1>
  //       <div class="pokemon-image">
  //         <img data-id="${e.id}" data-action="flip" class="toggle-sprite" src="${e.sprites.front}">
  //       </div>
  //     </div>
  //   </div>`)
  // }
})

