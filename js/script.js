let main = document.querySelector("main");
let selectGen = document.querySelector("#generation");
let selectType = document.querySelector("#filtreType");

// COLOR
const normal = "#979797";
const roche = "#5f5151";
const fire = "#ffa700";
const water = "#2980ef";
const plant = "#3fa129";
const insect = "#91a119";
const elec = "#fac000";
const poison = "#8f41cb";
const fairy = "#ef71ef";
const fight = "#ff8000";
const psyco = "#ef4179";
const ghost = "#704170";
const dragon = "#5060e1";
const ice = "#3fd8ff";
const ground = "#915121";
const flying = "#81b9ef";
const dark = "#50413f";
const steel = "#60a1b8";


let allPokemons = [];

async function loadData(gen) {
  try {
    const reponse = await fetch("https://tyradex.app/api/v1/gen/" + gen);
    if (!reponse.ok) {
      throw new Error("Erreur HTTP : " + reponse.status);
    }
    allPokemons = await reponse.json();
    showPokemon();
  } catch (erreur) {
    console.error("Problème avec l'API :", erreur);
  }
}


function showPokemon() {
  document.querySelectorAll("article").forEach((article) => article.remove());

  const typeChoisi = selectType.value;

  const pokemonsFiltres = allPokemons.filter((pokemon) => {
    if (pokemon.name.fr === "MissingNo.") return false;
    if (typeChoisi === "all") return true;
    return pokemon.types[0].name === typeChoisi;
  });

  pokemonsFiltres.forEach(createCardPokemon);
}

selectGen.addEventListener("change", () => loadData(selectGen.value));
selectType.addEventListener("change", showPokemon);

function createCardPokemon(pokemon) {
  let colorType = whichColor(pokemon.types[0].name);
  let art = document.createElement("article");
  art.innerHTML = `
    <figure>
      <picture>
        <img src="${pokemon.sprites.regular}" alt="Image ${pokemon.name.jp}" />
      </picture>
      <figcaption>
        <div class="divTypes"></div>
        <span class="types"><img class="apiType" src="${pokemon.types[0].image}" alt="${pokemon.types[0].name}" /></span>
        <h2>${pokemon.name.jp}</h2>
        <ol>
          <li>Points de vie : ${pokemon.stats.hp}</li>
          <li>Attaque : ${pokemon.stats.atk}</li>
          <li>Défense : ${pokemon.stats.def}</li>
          <li>Attaque spécial : ${pokemon.stats.spe_atk}</li>
          <li>Vitesse : ${pokemon.stats.vit}</li>
        </ol>
      </figcaption>
    </figure>`;
  setColorType(colorType, art);
  main.appendChild(art);
}

function setColorType(color, element) {
  element.style.borderColor = color;
  element.style.background = color;
}

function whichColor(type) {
  switch (type) {
    case "Normal": return normal;
    case "Roche": return roche;
    case "Électrik": return elec;
    case "Feu": return fire;
    case "Dragon": return dragon;
    case "Psy": return psyco;
    case "Insecte": return insect;
    case "Glace": return ice;
    case "Sol": return ground;
    case "Poison": return poison;
    case "Combat": return fight;
    case "Spectre": return ghost;
    case "Eau": return water;
    case "Plante": return plant;
    case "Fée": return fairy;
    case "Vol": return flying;
    case "Ténèbres": return dark;
    case "Acier": return steel;
    default: return normal;
  }
}


loadData(1);