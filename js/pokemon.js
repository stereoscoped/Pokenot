class Pokemon {
    constructor(data) {
        // this.id = data.id;
        // this.name = data.name;

        //rest of stats

        // this.attacks = [];
    }
}

let playerTeam = [];

let enemyTeam = [];

function addPokemonToPlayerTeam(pokemon) {
    playerTeam.push(pokemon);
}

function healParty() {
    for (let pokemon of playerTeam) {
        if (pokemon.hp !== undefined) {
            pokemon.hp = pokemon.maxHP || 100;
        }
    }
}