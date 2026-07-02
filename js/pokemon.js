// pokemon.js

class Pokemon {
    constructor(data) {
        this.id = parseInt(data.id);
        this.name = data.name;
        this.hp = parseInt(data.hp);
        this.maxHp = parseInt(data.hp);
        this.attack = parseInt(data.attack);
        this.defense = parseInt(data.defense);
        this.speed = parseInt(data.speed);
        this.imageUrl = data.image_url;

        this.attacks = data.moves || [];
    }
}

// Global data states
let pokeDex = [];
let playerTeam = [];
let enemyTeam = [];

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
        console.log("Database Integration Successful! Master Roster:", pokeDex);

        // TEMPORARY SEED FOR TEAM BATTLE UI TESTING:
        if (pokeDex.length >= 2) {
            playerTeam = [pokeDex[0]]; // Pikachu
            enemyTeam = [pokeDex[1]];  // Bulbasaur
        }

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

    console.log("TODO: make this actually heal")
    // healParty();
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