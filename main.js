class Pokemon {
    constructor(Name, Number, Sprite){
        this.Name = Name;
        this.Number = Number; 
        this.Sprite = Sprite;
    }
}

let table = [];
let numbers = ["001","002"];

// fetch('https://tyradex.vercel.app/api/v1/pokemon')
//     .then((response) => response.json())
//     .then((json) => parseJson(json))


// function parseJson(json){
    // let user = JSON.parse(json);
    // console.log(user.pokedex_id);
// }
async function fetchJsonData() {
    try {
        const response = await fetch('https://tyradex.vercel.app/api/v1/pokemon');
        
        if (!response.ok) {
            throw new Error('Erreur réseau : ' + response.statusText);
        }

        const jsonData = await response.json(); // Désérialise et assigne à la variable
        //console.log(jsonData); // Utilise la variable jsonData comme nécessaire

        return jsonData; // Retourne les données si besoin d'utilisation externe
    } catch (error) {
        console.error('Erreur lors de la récupération du fichier JSON :', error);
    }
}

fetchJsonData().then(data => {
    data.forEach(element => {
        let pokeNumber = element.pokedex_id;
        let pokeName = element.name.fr;
        let pokeSprite = element.sprites.regular;
        const poke = new Pokemon(pokeName,pokeNumber,pokeSprite);
        table.push(poke);
    });
});

for (let j = 0; j < table.length; j++){
    console.log(table[j].Name);
}


for (let i = 0; i < table.length; i++){
    let pokemon = document.createElement('div');
    let header = document.createElement('div');
    let closeBtn = document.createElement('div');
    closeBtn.className = "closeBtn";
    closeBtn.id = table[i];
    header.className = "headPoke";
    pokemon.className = "pokemon";
    pokemon.id = table[i];
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
    closeBtn.addEventListener("click", () => removeDiv(pokemon));
}

function removeDiv(div){
    div.remove();
}

function readJSON(data){
    console.log(data);
}