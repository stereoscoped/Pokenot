// pokemon.js

class Pokemon {
    constructor(data) {
        this.id = parseInt(data.id);
        this.name = data.name;
        this.hp = parseInt(data.hp);
        this.maxHP = parseInt(data.hp);
        this.attack = parseInt(data.attack);
        this.defense = parseInt(data.defense);
        this.speed = parseInt(data.speed);
        this.image_url = data.image_url; 
        this.moves = data.moves || []; 
    }
}

// Global data states
let pokeDex = []; 
let playerTeam = [];          
let enemyTeam = [];           
const MAX_TEAM_SIZE = 6;

// Gateway pulling from external PHP file
async function loadPokemonDatabase() {
    try {
        const response = await fetch('fetch_pokemon.php');
        if (!response.ok) throw new Error("Database file response failed");
        
        const rawData = await response.json();
        
        //See if the server sent an error object instead of an array
        if (rawData.error) {
            console.error("The PHP server reported a database error:", rawData.error);
            return; 
        }
        
        // Transform raw database rows into instance objects
        pokeDex = rawData.map(item => new Pokemon(item));
        console.log("Database Integration Successful!", pokeDex);
        
        //Temp Mew as starter pokemon lol
        //playerTeam[0] = structuredClone(pokeDex[150]); 
        //enemyTeam[0] = structuredClone(pokeDex[1]);  
        //console.log("player team test", playerTeam);
        //console.log("enemy team test", enemyTeam);

    } catch (error) {
        console.error("Failed to integrate database with game system:", error);
    }
}

let canHeal = true;
let healTimer = 0;
const HEAL_TIME = 150;
let previousMusic = "";

function startHeal() {
    if (gameState !== OVERWORLD)
        return;

    gameState = HEAL;
    healTimer = 0;
    previousMusic = currentMap.music;

    if (currentSong)
        currentSong.pause();

    playSound("teamHeal", 1);

    healParty();
    canHeal = false;
}

function updateHeal() {
    healTimer++;

    if (healTimer >= HEAL_TIME) {
        if (currentSong)
            currentSong.play();

        gameState = OVERWORLD;
    }
}

function drawHeal() {
    drawOverworld();

    if (healTimer > 30) {
        let alpha =
            0.20 +
            Math.sin(healTimer * 0.20) * 0.10;

        //green glow
        ctx.fillStyle = `rgba(120,255,150,${alpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //white glow
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.35})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}



function healParty() {
    for (let pokemon of playerTeam) {
        pokemon.hp = pokemon.maxHP;
    }

}



function addPokemonToPlayerTeam(pokemon, options = {}) {
    // options: { atFront: bool, hp: number }
    const atFront = options.atFront || false;
    if (typeof options.hp !== 'undefined') {
        pokemon.hp = options.hp;
    }

    if (atFront) {
        playerTeam.unshift(pokemon);
    } else {
        playerTeam.push(pokemon);
    }

}

function addPokemonToEnemyTeam(pokemon) {
    enemyTeam.push(pokemon);
}

function clearEnemyTeam() {
    enemyTeam = [];
}

function getRarity(pokemon) {
    let IV = (pokemon.attack + pokemon.defense + pokemon.hp + pokemon.speed);
    
    //console.log("IV: ", IV);
    if (IV < 180)
        return "Common";
    else if (IV < 260)
        return "Uncommon";
    else if (IV < 340)
        return "Rare";
    else
        return "Legendary";
}

function getRarityColor(pokemon) {
    let rarity = getRarity(pokemon);

    if (rarity === "Common") {
        return "white";
    } else if (rarity === "Uncommon") {
        return "#95E8A4";
    } else if (rarity === "Rare") {
        return "#66A3FF";
    } else {
        return "gold";
    }
}



function levelUpPokemon(pokemon) {
    pokemon.maxHP += 10;
    pokemon.attack += 5;
    pokemon.defense += 5;
    pokemon.speed += 5;
    pokemon.hp = pokemon.maxHP; // Heal to full on level up
}