document.addEventListener('DOMContentLoaded', () => {
  console.log(POKEMON)
  //YOUR CODE HERE

  // --------------------
  // Partially working Code below here
  // --------------------

  // Grab all the pokemon and populate the page
  const pokeUrl = 'http://localhost:3000/pokemon';
  let pokemon = [];

  const fetchAllPokemon = (url) => {
    fetch(url)
      .then(resp => resp.json())
      .then((json) => {
        // readAllPokemon(json);
        pokemon = [...json];
        console.log(pokemon);
        // readAllPokemon(pokemon);
      })
  }

  fetchAllPokemon(pokeUrl);

  const pokemonContainer = document.getElementById('pokemon-container');

  const readAllPokemon = (data) => {
    
    pokemonContainer.innerHTML = '';
    
    for (const pokemon of data) {
      
      const card = document.createElement('div');
      card.className = 'pokemon-card';
      
      const frame = document.createElement('div');
      frame.className = 'pokemon-frame';
      card.appendChild(frame);
      
      const nameField = document.createElement('h1');
      nameField.className = 'center-text';
      nameField.innerText = `${pokemon.name}`;
      frame.appendChild(nameField);

      const img = document.createElement('img');
      img.src = pokemon.sprites.front;
      img.dataset.id = pokemon.id;
      img.dataset.action = 'flip';
      img.className = 'toggle-sprite';
      img.addEventListener('click', (event) => {
        // event.preventDefault();
        console.log('clicked');
        if (event.target.src === pokemon.sprites.front) {
          event.target.src = pokemon.sprites.back;
        } else {
          event.target.src = pokemon.sprites.front;
        }
      })
      frame.appendChild(img);

      pokemonContainer.appendChild(card);

    }
  }

  readAllPokemon(POKEMON)

  let searchBar = document.getElementById('pokemon-search-input');
  
  const filterPokemon = () => {
    
    let input = searchBar.value;

    let filteredPokemon = POKEMON.filter(pokemon => pokemon.name.includes(input.toLowerCase()));
    if (filteredPokemon.length > 0) {
      readAllPokemon(filteredPokemon)
    } else {
      pokemonContainer.innerHTML = "<p class='center-text'>There are no pokemon here</p>";
    }
  }

  searchBar.addEventListener("input", filterPokemon);

})





























// const matchPokemon = (searchContents) => {
  
//   let regexp = RegExp(searchContents);
  
//   pokemonContainer.innerHTML = '';
  
//   fetch(pokeUrl).then(resp => resp.json()).then(json => {
//     for (const pokemon of json) {
      
//       if (pokemon.name.match(regexp) != null){
//         // console.log(regexp);
//         const card = document.createElement('div');
//         card.className = 'pokemon-card';
        
//         const frame = document.createElement('div');
//         frame.className = 'pokemon-frame';
//         card.appendChild(frame);
        
//         const nameField = document.createElement('h1');
//         nameField.className = 'center-text';
//         nameField.innerText = `${pokemon.name}`;
//         frame.appendChild(nameField);
  
//         const img = document.createElement('img');
//         img.src = pokemon.sprites.front;
//         img.dataset.id = pokemon.id;
//         img.dataset.action = 'flip';
//         img.className = 'toggle-sprite';
//         frame.appendChild(img);
  
//         pokemonContainer.appendChild(card);
//       }
//     }
//   })
// }