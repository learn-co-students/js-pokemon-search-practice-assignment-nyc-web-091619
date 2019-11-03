const DATA = ' http://localhost:3000/pokemon'

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById("pokemon-search-form")
  const container = document.getElementById("pokemon-container")

  function fetchPokemons(){
    container.innerHTML = ''
    fetch(DATA)
    .then(resp => resp.json())
    .then(json => json.forEach(renderPokemons))
  }

  function renderPokemons(pokemon){
    const outerDiv = document.createElement("div")
    outerDiv.className = "pokemon-card"

    const h1 = document.createElement("div")
    h1.innerText = `${pokemon.name}`
    h1.dataset.action = 'stats'
    h1.className = "center-text"
    h1.dataset.id = `${pokemon.id}`
    outerDiv.appendChild(h1)

    const secondDiv = document.createElement("div")
    secondDiv.className = "pokemon-frame"

    const innerDiv = document.createElement("div")
    innerDiv.className = "pokemon-image"

    const img = document.createElement("img")
    img.dataset.id = `${pokemon.id}`
    img.dataset.action = "flip"
    img.className = "toggle-sprite"
    img.src = `${pokemon.sprites.front}`

    innerDiv.appendChild(img)

    secondDiv.appendChild(h1)
    secondDiv.appendChild(innerDiv)

    outerDiv.appendChild(secondDiv)
    container.appendChild(outerDiv)

  }


  function updatePokemons(e) {
    container.innerHTML = ''
    fetch(DATA)
    .then(resp => resp.json())
    .then(function(json){
      json.forEach(function(pokemon){
        if (pokemon.name.includes(e.target.value)){
        renderPokemons(pokemon)
        } 
      })
    })
  }

  function turnAroundAndStats(e) {
    if (e.target.dataset.action === 'flip') {
      fetch(DATA)
      .then(resp => resp.json())
      .then(function(json){
        json.forEach(function(pokemon){
          if(pokemon.id === parseInt(e.target.dataset.id)){
            if (e.target.src === pokemon.sprites.front) {
              e.target.src = pokemon.sprites.back
            } else {
              e.target.src = pokemon.sprites.front
            }
          }
        })
      })
    }
    if (e.target.dataset.action === 'stats') {
      fetch(DATA)
      .then(resp => resp.json())
      .then(function(json){
        json.forEach(function(pokemon){
          if(pokemon.id === parseInt(e.target.dataset.id)){
            abilities = ''
            pokemon.abilities.forEach(function(ability){
              abilities += ` ${ability}`
            })
            moves = ''
            pokemon.moves.forEach(function(move){
              moves += ` ${move}`
            })
            stats = ''
            pokemon.stats.forEach(function(stat){
              stats += `${stat.name}: ${stat.value}\t`
            })
            types = ''
            pokemon.types.forEach(function(type){
              types += ` ${type}`
            })
            window.alert(`${pokemon.name}'s stats:\n
                          height: ${pokemon.height}\n
                          weight: ${pokemon.weight}\n
                          abilities: ${abilities}\n
                          moves: ${moves}\n
                          stats:\n ${stats}\n
                          types: ${types}`)
          }
        })
      })
    }
  }

  fetchPokemons()
  form.addEventListener("input", updatePokemons)
  container.addEventListener("click", turnAroundAndStats)
})
