class Pokemon {
    constructor(NameStr, NumberInt, SpriteStr, TypesPokemonStr){
        this.NameStr = NameStr;
        this.NumberInt = NumberInt; 
        this.SpriteStr = SpriteStr;
        this.TypesPokemonStr = TypesPokemonStr;
    }
}

let table = [];

const startTime = performance.now();
async function fetchJsonData() {
    try {
        const response = await fetch('https://tyradex.vercel.app/api/v1/pokemon');
        
        if (!response.ok) {
            throw new Error('Erreur réseau : ' + response.statusText);
        }

        const jsonData = await response.json(); 
       
        return jsonData; // Retourne les données si besoin d'utilisation externe
    } catch (error) {
        console.error('Erreur lors de la récupération du fichier JSON :', error);
    }
}

async function main(){

    const data = await fetchJsonData();
    
    if (data){
        const spritePromises = data.map(async (element) => {
            const pokeNumber = element.pokedex_id;
            const pokeName = element.name.fr;
            const pokeSprite = await getSprites(pokeNumber); 
            let pokeTypes = [];
            const types = element.types;
            for (const type in types){
                pokeTypes.push(types[type].name);
            }
            return new Pokemon(pokeName, pokeNumber, pokeSprite, pokeTypes);
        });

        // Attendre que toutes les promesses soient résolues
        const pokemonList = await Promise.all(spritePromises);

        // Ajouter tous les Pokémon dans le tableau
        table.push(...pokemonList);

        for ( let j = 1 ; j < table.length ; j++){
             pokemonObj = table[j];
            // createDivPoke(pokemonNameStr(pokemonObj), pokemonObj.SpriteStr);
            createDivPoke(pokemonObj);
        }
    }else{
        console.log("pas de datas");
    }
    document.getElementById("loader-bg").style.display = 'none';
    document.getElementById("loader").style.display = 'none';
    const endTime = performance.now();  // Capture le temps de fin
    console.log(`Execution Time: ${endTime - startTime} milliseconds`);  // Affiche la durée
}

function removeDiv(div){
    div.remove();
}

function readJSON(data){
    console.log(data);
}

function pokemonNameStr(pokeObj){
    return pokeObj.NameStr + " #" + addZeros(pokeObj.NumberInt) + pokeObj.NumberInt;
}

async function createDivPoke(pokeObj){
    const pokemon = document.createElement('div');
    const header = document.createElement('div');
    const closeBtn = document.createElement('div');
    const bodyPokemon = document.createElement('div');
    const divTypesPoke = document.createElement('div');
    const sprite = document.createElement('img');
    const shinyButton = document.createElement('img');
    shinyButton.src = "./assets/shiny-star.png";
    shinyButton.className = "shinyStar";
    // <a target="_blank" href="https://icons8.com/icon/fFxJbHvoteZT/pixel-star">Pixel Star</a> icône par <a target="_blank" href="https://icons8.com">Icons8</a>
    bodyPokemon.className = "pokemonBody";
    sprite.className = "spriteImg";
    sprite.src = pokeObj.SpriteStr;
    shinyButton.addEventListener("click", async () => {
        sprite.src = await getSpritesShiny(pokeObj.NumberInt, sprite)
    });
    closeBtn.className = "closeBtn";
    closeBtn.id = pokeObj.NameStr;
    header.className = "headPoke";
    pokemon.className = "pokemon";
    pokemon.id = pokeObj.NameStr;
    let pokemonName = document.createTextNode(pokemonNameStr(pokemonObj));
    let X = document.createTextNode("X");
    pokemonName.className = "pokename";
    let test = document.getElementById("mainclasspokemons");
    pokemon.appendChild(header);
    pokemon.appendChild(bodyPokemon);
    bodyPokemon.appendChild(sprite);
    header.appendChild(pokemonName);
    header.appendChild(closeBtn);
    closeBtn.appendChild(X);
    test.appendChild(pokemon);
    divTypesPoke.className = "pokeTypes";
    for (let types in pokeObj.TypesPokemonStr){
        const type = document.createElement("p");
        let text = pokeObj.TypesPokemonStr[types];
        type.innerHTML = text;
        type.className = "type"
        type.style.backgroundColor = addColor(text);
        divTypesPoke.appendChild(type);
    }
    bodyPokemon.appendChild(divTypesPoke);
    bodyPokemon.appendChild(shinyButton);
    closeBtn.addEventListener("click", () => removeDiv(pokemon));
}

function addZeros(integer){
    if (integer < 10){
        return "00";
    }
    else if(integer >= 10 && integer <100){
        return "0";
    }
    else{
        return "";
    }
}

async function getSpritesShiny(pokeNumber, element){
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokeNumber, { cache: 'no-store' });
        if (!response.ok){
            throw new Error('Toujours pas');
        }
       
        const url = await response.json();
        const jsonData = url.sprites.front_shiny;
         // Désérialise et assigne à la variable
        //console.log(jsonData); // Utilise la variable jsonData comme nécessaire
        
        return jsonData; // Retourne les données si besoin d'utilisation externe
    } catch (error) {
        console.error('Erreur lors de la récupération du fichier JSON :', error);
    }
}

async function getSprites(pokeNumber){
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokeNumber, { cache: 'no-store' });
        if (!response.ok){
            throw new Error('Toujours pas');
        }
       
        const url = await response.json();
        const jsonData = url.sprites.front_default;
         // Désérialise et assigne à la variable
        //console.log(jsonData); // Utilise la variable jsonData comme nécessaire
        
        return jsonData; // Retourne les données si besoin d'utilisation externe
    } catch (error) {
        console.error('Erreur lors de la récupération du fichier JSON :', error);
    }
}

function addColor(text){
    switch(text){
        case 'Plante':
            return "#259e32";
        case 'Poison':
            return "#72259e";
        case 'Feu':
            return "#de1b27";
        case 'Vol':
            return "#258a9e";
        case 'Eau':
            return "#2e259e";
        case 'Insecte':
            return "#4b9e25"
        case 'Normal':
            return "#bfbfbe";
        case 'Électrik':
            return "#e4ef3e";
        case 'Sol':
            return "#828728";
        case 'Fée':
            return "#d935e0";
        case 'Combat':
            return "#ad4716";
        case 'Psy':
            return "#a116ad";
        case 'Roche':
            return '#c75923';
        case 'Acier':
            return "#737373";
        case 'Glace':
            return '#25c4d4';
        case 'Spectre':
            return "#562f56";
        case 'Dragon':
            return "#be8c25";
        case 'Ténèbres':
            return "#070548";
    }
}


main();