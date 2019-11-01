document.addEventListener('DOMContentLoaded', () => {

  // DECLARATIONS ------------------------------------>
  let pokeUrl = "http://localhost:3000/pokemon"
  let pokeContainer = document.getElementById("pokemon-container")
  let form = document.getElementById("pokemon-search-form")
  let searchVal
  let allPokes
  // <------------------------------------END DECLARATIONS 


  // START FUNCTIONS ---------------------------------->

  
  function pokeClickHandler(e){

    //FIND THE CARD
    let card = e.target.parentNode
    if(card.className === "pokemon-image"){
      card = card.parentNode.parentNode
    }else if(card.className === "pokemon-frame"){
      card = card.parentNode
    }

    //Handle click by situation 
    if( e.target.className === "toggle-sprite"){
      let newSrc = e.target.dataset.action
      e.target.dataset.action = e.target.src
      e.target.src = newSrc
    } else if (e.target.tagName === "H1"){
      let hiddenFrame = document.body.querySelector(`div[data-poke-id="${card.dataset.id}"]`)
       hiddenFrame.style.display = "block";
       hiddenFrame.addEventListener("click", statsBarClickHandler)
    }
  }

  // EX out stats
  function statsBarClickHandler(e){
    let me = e.target
    console.log("clicked: ", me)
    while(me.className !== "overlay"){

      me = me.parentNode
      console.log("now me= ", me)
    }
    me.style.display = "none"
    me.removeEventListener("click", statsBarClickHandler)
  }

  // add poke to DOM
  function appendPoke(poke){

    let name = poke.name
    let id = poke.id
    let imageFront = poke.sprites.front
    let imageBack = poke.sprites.back


    let card = document.createElement("div")
    card.className = "pokemon-card"
    card.dataset.id = id 

    let frame = document.createElement("div")
    frame.className = "pokemon-frame"

    let h1 = document.createElement("h1")
    h1.className = "center-text"
    h1.innerText = name

    let imgContainer = document.createElement("div")
    imgContainer.className = "pokemon-image"

    let img = document.createElement("img")
    img.dataset.action = imageBack
    img.className = "toggle-sprite"
    img.src = imageFront

    imgContainer.appendChild(img)

    //add hidden stuff!! ----------------------------------

    let hiddenFrame = document.createElement("div")
    hiddenFrame.className = "overlay"
    hiddenFrame.dataset.pokeId = id

    let hiddenContainer = document.createElement("div")
    hiddenContainer.className = "overlay-content"

    let weight = document.createElement("h5")
    weight.innerText = "Weight: " + poke.weight
    
    let height = document.createElement("h5")
    height.innerText = "Height: " + poke.height
   
    let abilityTitle = document.createElement("h4")
    abilityTitle.innerText = "Abilities"

    let abils = document.createElement("ul")
 
    poke.abilities.forEach(function(ability){
      let li = document.createElement("li")

      li.innerText = ability
      abils.appendChild(li)
    })


    let statsTitle = document.createElement("h4")
    statsTitle.innerText = "Statzzz: "

    let stats = document.createElement("ul")
   
    poke.stats.forEach(function(stat){
      let li = document.createElement("li")
 
      li.innerText = `${stat.name}: ${stat.value}`
      stats.appendChild(li)
    })
  
    
    hiddenContainer.appendChild(weight)
    hiddenContainer.appendChild(height)
    hiddenContainer.appendChild(abilityTitle)
    hiddenContainer.appendChild(abils)
    hiddenContainer.appendChild(statsTitle)
    hiddenContainer.appendChild(stats)

    hiddenFrame.appendChild(hiddenContainer)
    

    //done adding hidden stuff -------------------------------

    frame.appendChild(h1)
    card.appendChild(hiddenFrame)
    frame.appendChild(imgContainer)

    card.appendChild(frame)

    pokeContainer.appendChild(card)

    card.addEventListener("click", pokeClickHandler)

  }
  
  function fetchPokes(){
    //first remove the <p> tag
    pokeContainer.innerHTML = ""

    //fetch the pokes and append them to the DOM
    fetch(pokeUrl)
      .then(resp => resp.json())
      .then((data) => {
        data.forEach(appendPoke)
        allPokes = data
      })
  }

  // Form submit handler
  function formTypeHandler(e){
    searchVal = e.target.value

    //CLEAR THE CONTAINER
    pokeContainer.innerHTML= ""

    allPokes.forEach(function(poke){
      if(poke.name.includes(searchVal)){
        appendPoke(poke)
      }
    })

  }

  // <------------------------------------ END FUNCTIONS


  // START EXECUTION ------------------------------------>
  
  //Grab all the Pokemon from the api
  fetchPokes()

  //Add a listener to the form!
  form.addEventListener("input",formTypeHandler)

  


  // <------------------------------------ END EXECUTION 



})
