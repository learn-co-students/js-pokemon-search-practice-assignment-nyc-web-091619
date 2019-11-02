document.addEventListener('DOMContentLoaded', () => {
  const pokeAll = 'http://localhost:3000/pokemon';
  const pokemonContainer = document.querySelector('#pokemon-container');
  const searchBarInput = document.querySelector('#pokemon-search-input');
  const noPokes = pokemonContainer.querySelectorAll(':nth-child(-n+3)');
  let allMon = [];
  let pokeNames = [];
  let currentPokemon = [];

  const appendPokemonCard = obj => {
    currentPokemon.push(obj);
    const divCard = document.createElement('div');
    const divFrame = document.createElement('div');
    const h1 = document.createElement('h1');
    const divImage = document.createElement('div');
    const img = document.createElement('img');

    divCard.className = 'pokemon-card';
    divFrame.className = 'pokemon-frame';
    h1.className = 'center-text';
    divImage.className = 'pokemon-image';
    img.className = 'toggle-sprite';

    h1.innerText = obj.name;
    img.src = obj.sprites.front;
    img.dataset.id = obj.id;
    img.dataset.action = 'flip';

    divCard.appendChild(divFrame);
    divFrame.appendChild(h1);
    divFrame.appendChild(divImage);
    divImage.appendChild(img);

    pokemonContainer.appendChild(divCard);
    noPokes.forEach(node => node.remove());
  };

  const flipHandler = event => {
    const imgTag = event.target;
    const currentMon = allMon.find(
      poke => poke.id === parseInt(imgTag.dataset.id, 10),
    );
    if (imgTag.src === currentMon.sprites.front) {
      event.target.src = currentMon.sprites.back;
    } else {
      event.target.src = currentMon.sprites.front;
    }
  };

  const partialMatch = (collection, partial) =>
    collection.filter(collName => collName.includes(partial));

  const searchHandler = event => {
    pokemonContainer.innerHTML = '';
    currentPokemon = [];
    noPokes.forEach(node => pokemonContainer.appendChild(node));
    const currentInput = event.target.value;
    const matchingMon = partialMatch(pokeNames, currentInput);
    allMon
      .filter(mon => matchingMon.includes(mon.name))
      .forEach(appendPokemonCard);
  };

  // const statsBlock = mon => {
  //   let div1 = document.createElement('div');
  //   div1.dataset.id = 'stats';
  //   console.log(mon);
  //   // type
  //   let pTagType = document.createElement('p');
  //   let monType = 'Type: ';
  //   pTagType.innerText = mon.type.forEach(type => (monType += `${type} `));
  //   // abilities
  //   let pTagAbilities = document.createElement('p');
  //   // moves
  //   let pTagMoves = document.createElement('p');
  //   // stats
  //   let pTagStats = document.createElement('p');
  //   pTagStats.innerText =
  // };

  // const infoHandler = event => {
  //   const frameDivClicked = event.target.parentNode;
  //   const imgToChange = frameDivClicked.querySelector('img');
  //   const currentMon = allMon.find(
  //     poke => poke.id === parseInt(imgToChange.dataset.id),
  //   );
  //   if (frameDivClicked.innerHTML.includes('stats')) {
  //     console.log('remove the stats block');
  //   } else {
  //     console.log('overlay the stats block');
  //     // imgToChange.remove();
  //     statsBlock(currentMon);
  //   }
  // };

  fetch(pokeAll)
    .then(resp => resp.json())
    .then(pokeArr => {
      pokeArr.forEach(appendPokemonCard);
      allMon = [...pokeArr];
      pokeNames = allMon.map(poke => poke.name);
    });

  pokemonContainer.addEventListener('click', e => {
    if (e.target.dataset.action === 'flip') flipHandler(e);
    // if (e.target.className === 'center-text') infoHandler(e);
  });

  searchBarInput.addEventListener('input', e => searchHandler(e));
});
