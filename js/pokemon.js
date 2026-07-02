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
        
        // TEMPORARY SEED FOR TEAM BATTLE UI TESTING:
        if (pokeDex.length >= 2) {
            playerTeam = [pokeDex[0]]; 
            enemyTeam = [pokeDex[1]];  
            console.log("player team test", playerTeam);
            console.log("enemy team test", enemyTeam);
        }

    } catch (error) {
        console.error("Failed to integrate database with game system:", error);
    }
}