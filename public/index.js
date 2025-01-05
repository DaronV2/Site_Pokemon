class Pokemon {
  constructor(NameStr, NumberInt, SpriteStr, TypesPokemonStr) {
    this.NameStr = NameStr+" #"+addZeros(NumberInt);
    this.NumberInt = NumberInt;
    this.SpriteStr = SpriteStr;
    this.TypesPokemonStr = TypesPokemonStr;
  }
}

const elements = {
  templatePokemon: document.getElementById("pokemon"),
  templateTypes: document.getElementById("typeTemplate"),
  mainClassPokemons: document.getElementById("mainclasspokemons"),
  loadColors : document.getElementById("loadColors")
};

let table = [];

async function fetchJsonData() {
  try {
    const response = await fetch("https://tyradex.vercel.app/api/v1/pokemon");

    if (!response.ok) {
      throw new Error("Erreur réseau : " + response.statusText);
    }

    const jsonData = await response.json();

    return jsonData; // Retourne les données si besoin d'utilisation externe
  } catch (error) {
    console.error("Erreur lors de la récupération du fichier JSON :", error);
  }
}

async function main() {
  const data = await fetchJsonData();

  if (data) {
    const pokemons = data.map(async (element) => {
      const pokeNumber = element.pokedex_id;
      const pokeName = element.name.fr;
      // const startTime = performance.now();
      const pokeSprite = await getSprites(pokeNumber);  // Récupère l'image du Pokémon
      // const endTime = performance.now();
      // console.log(`Execution Time: ${endTime} , ${startTime} milliseconds`);
      
      // Créer un tableau des types de Pokémon de manière plus efficace
      const pokeTypes = element.types ? element.types.map(type => type.name) : [];
  
      // Retourner une instance de la classe Pokemon
      return new Pokemon(pokeName, pokeNumber, pokeSprite, pokeTypes);
    });
  
    // Attendre que toutes les promesses soient résolues
    const pokemonList = await Promise.all(pokemons);

    // Ajouter tous les Pokémon dans le tableau
    table.push(...pokemonList);

    for (let j = 1; j < table.length; j++) {
      createDivPoke(table[j]);
    }
  } else {
    console.error("Erreur lors de la récupération des données");
  }
  document.getElementById("loader-bg").style.display = "none";
  document.getElementById("loader").style.display = "none";
  const endTime = performance.now();
}

function removeDiv(div) {
  div.remove();
}

function pokemonNameStr(pokeObj) {
  return (
    pokeObj.NameStr + " #" + addZeros(pokeObj.NumberInt) + pokeObj.NumberInt
  );
}

async function createDivPoke(pokeObj) {
  const templatePoke = elements.templatePokemon;
  const templateInstance = templatePoke.content.cloneNode(true);
  const spriteImg = templateInstance.querySelector(".spriteImg");
  templateInstance.querySelector(".pokemon").id = pokeObj.NameStr;
  templateInstance.querySelector(".pokeName").textContent = pokeObj.NameStr;
  templateInstance.querySelector(".closeBtn").id = pokeObj.NameStr;
  templateInstance.querySelector(".closeBtn").addEventListener("click", () => {
    document.getElementById(pokeObj.NameStr).classList.add("hidden");
  });
  templateInstance.querySelector(".spriteImg").src = pokeObj.SpriteStr;
  templateInstance.querySelector(".spriteImg").alt = pokeObj.NameStr;
  pokeObj.TypesPokemonStr.forEach((element) => {
    const types = elements.templateTypes;
    const templateTypes = types.content.cloneNode(true);
    templateTypes.querySelector(".type").textContent = element;
    templateTypes.querySelector(".type").classList.add("bg-"+removeAccentsAndUpperCase(element));
    if(removeAccentsAndUpperCase(element) == "electrik"){
      templateTypes.querySelector(".type").classList.add("text-black");
    }
    templateInstance.querySelector(".pokeTypes").appendChild(templateTypes);
  });
  templateInstance.querySelector(".shinyStar").addEventListener("click", async () => {
    const shinySprite = await getSpritesShiny(pokeObj.NumberInt);
    const sprite = await getSprites(pokeObj.NumberInt);
    if(spriteImg.src == shinySprite){
        spriteImg.classList.remove('animation');
        spriteImg.classList.add('animation');
        spriteImg.src = sprite;
        await sleep(2000).then( () =>spriteImg.classList.remove('animation'));
    }else{
        spriteImg.classList.add('animation');
        spriteImg.src = shinySprite;
        await sleep(2000).then( () =>spriteImg.classList.remove('animation'));
    }
  });
  elements.mainClassPokemons.appendChild(templateInstance);
}

function removeAccentsAndUpperCase(str) {
    return str
      .toLowerCase() // Convertit la chaîne en minuscules
      .normalize("NFD") // Décompose les caractères accentués
      .replace(/[\u0300-\u036f]/g, ""); // Supprime les accents
  }

function addZeros(integer) {
  if (integer < 10) {
    return "00"+integer;
  } else if (integer >= 10 && integer < 100) {
    return "0"+integer;
  } else {
    return ""+integer;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getSpritesShiny(pokeNumber) {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/" + pokeNumber
    );
    if (!response.ok) {
      throw new Error("Toujours pas");
    }

    const url = await response.json();
    const jsonData = url.sprites.front_shiny;

    return jsonData; // Retourne les données si besoin d'utilisation externe
  } catch (error) {
    console.error("Erreur lors de la récupération du fichier JSON :", error);
  }
}

async function getSprites(pokeNumber) {
  try {
    if(pokeNumber != 0){
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokeNumber}`
      );
      if (!response.ok) {
        throw new Error("Toujours pas");
      }
  
      const url = await response.json();
      const jsonData = url.sprites.front_default;
  
      return jsonData; // Retourne les données si besoin d'utilisation externe
    }
    return;
  } catch (error) {
    console.error("Erreur lors de la récupération du fichier JSON :", error);
  }
}

function getColorByType(text) {
  switch (text) {
    case "Plante":
      return "bg-[#004407]";
    case "Poison":
      return "bg-[#72259e]";
    case "Feu":
      return "bg-[#de1b27]";
    case "Vol":
      return "bg-[#063944]";
    case "Eau":
      return "bg-[#2e259e]";
    case "Insecte":
      return "bg-[#4b9e25]";
    case "Normal":
      return "bg-[#bfbfbe]";
    case "Électrik":
      return "bg-[#e4ef3e]";
    case "Sol":
      return "bg-[#828728]";
    case "Fée":
      return "bg-[#d935e0]";
    case "Combat":
      return "bg-[#ad4716]";
    case "Psy":
      return "bg-[#a116ad]";
    case "Roche":
      return "bg-[#c75923]";
    case "Acier":
      return "bg-[#737373]";
    case "Glace":
      return "bg-[#25c4d4]";
    case "Spectre":
      return "bg-[#562f56]";
    case "Dragon":
      return "bg-[#be8c25]";
    case "Ténèbres":
      return "bg-[#070548]";
  }
}

main();