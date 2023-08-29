const poke_container = document.querySelector(".poke-container")
const search = document.querySelector(".search")
const searchBtn = document.querySelector(".searchBtn")
const searchInput = document.querySelector(".searchInput")

const pokemon_count = 151



const bg_color = {
    grass: '#8BD369',
    fire: '#FF603F',
    water: '#3399FF',
    bug: '#AABB22',
    normal: '#AAAA99',
    flying: '#9AA8FA',
    poison: '#B76EA4',
    electric: '#FFD34E',
    ground: '#E2C56A',
    fairy: '#F1A8EC',
    psychic: '#FF6EA4',
    fighting: '#C56E5C',
    rock: '#C5B679',
    dragon: '#7766EE',
    ice: '#66CCFF',
}




searchBtn.addEventListener("click", () => {
    search.classList.toggle("active")
})

searchInput.addEventListener("input",(e)=>{
    const searchValue = searchInput.value.toLowerCase()
    const pokemonNames = document.querySelectorAll(".poke-name")

    pokemonNames.forEach((pokename)=>{
        if(pokename.innerHTML.toLowerCase().includes(searchValue)){
            pokename.parentElement.parentElement.style.display="block"
        }else{
            pokename.parentElement.parentElement.style.display="none"
        }
    })
})


const fetchPokemons = async () => {
    for (let i = 1; i < pokemon_count; i++) {
        await getPoekemon(i)
    }
}



const getPoekemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()

    createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
    const pokemonDiv = document.createElement("div")
    pokemonDiv.classList.add("pokemon")


    const pokemonType = pokemon.types[0].type.name

    pokemonBg = bg_color[pokemonType]

    pokemonDiv.style.backgroundColor = `${pokemonBg}`

    const pokemonId = pokemon.id.toString().padStart(3, "0")


    const pokemonDivInnerHTML = `
   
    <div class="image-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
    </div>
    <div class="poke-info">
        <span class="poke-id">#${pokemonId}</span>
        <h3 class="poke-name">${pokemon.name}</h3>
        <div class="small">
            <small class="poke-experience">
                <i class="fa-solid fa-flash"></i>
                ${pokemon.base_experience} exp
            </small>
            <small class="poke-weight">
                <i class="fa-solid fa-flash"></i>
                ${pokemon.weight} kg
            </small>
        </div>
        <div class="poke-type">
            <i class="fa-brands fa-uncharted"></i>  ${pokemonType} 
        </div>
    </div>`

    pokemonDiv.innerHTML = pokemonDivInnerHTML
    poke_container.appendChild(pokemonDiv)
}
fetchPokemons()