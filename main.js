class Pokemon {
    constructor(Name, Number){
        this.Name = Name;
        this.Number = Number; 
    }
}

let table = ["PIKACHU","salameche","carapuce","reptincel","dracaufeu","tortank","test","test","test","test","test","test","test","test","test"];
let numbers = ["001","002"];

//let b = document.body;
// let pokemons = document.createElement("div");
// pokemons.className = "pokemons";
// console.log(pokemons);

for (let i = 0; i < table.length; i++){
    let pokemon = document.createElement('div');
    let header = document.createElement('div');
    let closeBtn = document.createElement('div');
    closeBtn.className = "closeBtn";
    header.className = "headPoke";
    pokemon.className = "pokemon";
    let pokemonName = document.createTextNode(table[i]);
    let X = document.createTextNode("X");
    pokemonName.className = "pokename";
    let test = document.getElementById("mainclasspokemons");
    pokemon.appendChild(header);
    header.appendChild(pokemonName);
    header.appendChild(closeBtn);
    closeBtn.appendChild(X);
    test.appendChild(pokemon);
    //elmnt.className("pokemon");
}

function createPokemonDiv(){

}