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
