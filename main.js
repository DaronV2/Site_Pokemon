class Pokemon {
    constructor(Name, Number){
        this.Name = Name;
        this.Number = Number; 
    }
}

let table = ["pikachu","salameche","carapuce","reptincel","dracaufeu","tortank","test","test","test","test","test","test","test","test","test"];
let numbers = ["001","002"];

//let b = document.body;
// let pokemons = document.createElement("div");
// pokemons.className = "pokemons";
// console.log(pokemons);

for (let i = 0; i < table.length; i++){
    let pokemon = document.createElement('div');
    pokemon.className = "pokemon"
    let pokemonName = document.createTextNode(table[i]);
    let test = document.getElementById("mainclasspokemons");
    pokemon.appendChild(pokemonName);
    test.appendChild(pokemon);
    //elmnt.className("pokemon");
}

function createPokemonDiv(){

}