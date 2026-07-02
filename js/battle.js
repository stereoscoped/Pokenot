// battle stuff -- TODO

let selectedBattleOption = 0;
let battleMenu = "main";
let battleMessage = "A wild Pokenot appeared!";
let battleOver = false;
let enemyDefeated = false;

// TEMPORARY!!! replace with player's selected Pokenot from DB
let playerPokemon;

// TEMPORARY!!! replace with enemy/wild Pokenot from DB or encounter table
let enemyPokemon;

let mainBattleOptions = ["Fight", "Heal", "Switch", "Run"];

// TEMPORARY!!! replace with moves loaded from DB
let attackOptions = [];
let switchOptions = [];
let healOptions = ["Use Potion", "Back"];
 
// TEMPORARY!!! replace with player's inventory from DB
let healingPotions = 3;
let potionHealAmount = 50;

// TEMPORARY!!! replace with player's team from DB
let selectedTeamIndex = 0;

function startBattle() {
    gameState = BATTLE;

    let myPokemon = document.getElementById("mypokemon");
    let enemyPokemonSprite = document.getElementById("encounterpokemon");

    // TEMPORARY!!! currently random pokemon sprites will appear
    let randomNum = Math.floor(Math.random() * pokeDex.length);
    let randomNum2 = Math.floor(Math.random() * pokeDex.length);
    // Player's first pokemon is usually the first in the team. Guard against missing data.
    let pokemonName;
    if (playerTeam && playerTeam.length > 0 && playerTeam[0] && playerTeam[0].name) {
        pokemonName = playerTeam[0].name;
    } else if (pokeDex && pokeDex.length > 0 && pokeDex[randomNum] && pokeDex[randomNum].name) {
        // fallback to random pokedex entry if team is empty
        pokemonName = pokeDex[randomNum].name;
    } else {
        pokemonName = 'MissingNo';
    }

    let pokemonName2 = (pokeDex && pokeDex.length > 0 && pokeDex[randomNum2] && pokeDex[randomNum2].name) ? pokeDex[randomNum2].name : 'MissingNo';

    myPokemon.src = `assets/pokemon_back_sprites/${pokemonName}.gif`;
    enemyPokemonSprite.src = `assets/pokemon_front_sprites/${pokemonName2}.gif`;

    //start hidden
    myPokemon.style.visibility = "hidden";
    enemyPokemonSprite.style.visibility = "hidden";

    // position enemy off-screen to match intro start
    enemyPokemonSprite.style.left = (typeof battleIntro.enemyX !== 'undefined') ? battleIntro.enemyX + 'px' : '-200px';
    // ensure player sprite fully transparent until its phase
    myPokemon.style.opacity = '0';

    // Ensure selected team index points to a valid pokemon; otherwise use a fallback object
    selectedTeamIndex = 0;
    if (playerTeam && playerTeam.length > 0 && playerTeam[selectedTeamIndex]) {
        playerPokemon = playerTeam[selectedTeamIndex];
    } else if (pokeDex && pokeDex.length > 0 && pokeDex[randomNum]) {
        playerPokemon = structuredClone(pokeDex[randomNum]);
    } else {
        playerPokemon = makePokemon('MissingNo', 1, 1, 1, 1, []);
    }

    enemyPokemon = (pokeDex && pokeDex.length > 0 && pokeDex[randomNum2]) ? structuredClone(pokeDex[randomNum2]) : makePokemon('MissingNo', 1, 1, 1, 1, []);

    attackOptions = (playerPokemon.moves || []).map(function(move) {
        return move.name || 'Tackle';
    });

    selectedBattleOption = 0;
    battleMenu = "main";
    battleOver = false;
    enemyDefeated = false;
    let enemypokemon=enemyPokemon.name;
    let rarity = getRarity(enemyPokemon);

    battleMessage = "A wild " + rarity.toUpperCase() + " " + enemyPokemon.name.toUpperCase() + " appeared!";

    // start intro animation timeline
    startBattleIntro();
}

function makePokemon(name, hp, attack, defense, speed, moves) {
    return {
        name: name,
        hp: hp,
        maxHp: hp,
        attack: attack,
        defense: defense,
        speed: speed,
        moves: moves
    };
}

function updateBattle() {

    if (battleIntro.active) {
        updateBattleIntro();
        return;
    }

    let options = getBattleOptions();

    if (keys["arrowup"] || keys["w"]) {
        selectedBattleOption--;

        if (selectedBattleOption < 0) {
            selectedBattleOption = options.length - 1;
        }

        keys["arrowup"] = false;
        keys["w"] = false;
    }

    if (keys["arrowdown"] || keys["s"]) {
        selectedBattleOption++;

        if (selectedBattleOption >= options.length) {
            selectedBattleOption = 0;
        }

        keys["arrowdown"] = false;
        keys["s"] = false;
    }

    if (keys["enter"]) {
        chooseBattleOption();
        keys["enter"] = false;
    }
}

function getBattleOptions() {
    if (battleMenu === "moves") {
        return attackOptions.concat(["Back"]);
    }

    if (battleMenu === "heal") {
        return healOptions;
    }
    if (battleMenu === "switch") {
        switchOptions = playerTeam.map(function(pokemon) {
            return pokemon.name + (pokemon.hp <= 0 ? " (Fainted)" : "");
        });

        return switchOptions.concat(["Back"]);
    }

    if (battleMenu === "captureOffer") {
        return ["Yes", "No"];
    }

    if (battleMenu === "captureSwap") {
        switchOptions = playerTeam.map(function(pokemon) {
            return pokemon.name;
        });
        return switchOptions.concat(["Cancel"]);
    }

    if (battleMenu === "captureComplete") {
        return ["Continue"];
    }

    return mainBattleOptions;
}

function chooseBattleOption() {
    // If a battle just ended, first Enter either shows the capture offer (if enemy died)
    // or simply ends the battle (if player lost)
    if (battleOver && !(battleMenu === "captureOffer" || battleMenu === "captureSwap" || battleMenu === "captureComplete")) {
        if (enemyDefeated) {
            if (enemyPokemon && enemyPokemon.name) {
                battleMenu = "captureOffer";
                selectedBattleOption = 0;
                battleMessage = "Add " + enemyPokemon.name + " to your team?";
            } else {
                endBattle();
            }
        } else {
            // player lost or other end; just exit
            endBattle();
        }
        return;
    }

    if (battleMenu === "main") {
        if (selectedBattleOption === 0) {
            battleMenu = "moves";
            selectedBattleOption = 0;
            battleMessage = "Choose an attack.";
        } else if (selectedBattleOption === 1) {
            battleMenu = "heal";
            selectedBattleOption = 0;
            battleMessage = "You have " + healingPotions + " potions.";
        } else if (selectedBattleOption === 2) {
            battleMenu = "switch";
            selectedBattleOption = 0;
            battleMessage = "Choose a Pokenot.";
        } else {
            endBattle();
        }
    } else if (battleMenu === "moves") {
        if (selectedBattleOption === attackOptions.length) {
            battleMenu = "main";
            selectedBattleOption = 0;
            battleMessage = "What will you do?";
        } else {
            playerAttack(selectedBattleOption);
        }
    } else if (battleMenu === "heal") {
        if (selectedBattleOption === 0) {
            usePotion();
        } else {
            battleMenu = "main";
            selectedBattleOption = 0;
            battleMessage = "What will you do?";
        }
    } else if (battleMenu === "switch") {
        if (selectedBattleOption === playerTeam.length) {
            battleMenu = "main";
            selectedBattleOption = 0;
            battleMessage = "What will you do?";
        } else {
            switchPokemon(selectedBattleOption);
        }
    } else if (battleMenu === "captureOffer") {
        if (selectedBattleOption === 0) { // Yes
            if (playerTeam.length < MAX_TEAM_SIZE) {
                addPokemonToPlayerTeam(structuredClone(enemyPokemon), { hp: 0 });
                battleMessage = enemyPokemon.name + " has been added to your team! (They're still fainted goe now.) Press Enter.";
                battleMenu = "captureComplete";
                return;
            } else {
                // team full - offer swap
                battleMenu = "captureSwap";
                selectedBattleOption = 0;
                battleMessage = "Team full. Choose a member to swap or Cancel.";
                return;
            }
        } else { // No
            endBattle();
            return;
        }
    } else if (battleMenu === "captureSwap") {
        if (selectedBattleOption === playerTeam.length) { // Cancel
            endBattle();
            return;
        } else {
            // swap selected team member with captured pokemon (at 0 HP)
            let swapIndex = selectedBattleOption;
            playerTeam[swapIndex] = structuredClone(enemyPokemon);
            playerTeam[swapIndex].hp = 0;
            battleMessage = "Swapped in " + enemyPokemon.name + " at 0 HP. Press Enter.";
            battleMenu = "captureComplete";
            return;
        }
    } else if (battleMenu === "captureComplete") {
        // any selection simply continues and ends the battle
        endBattle();
        return;
    }
}

function endBattle() {
    let myPokemon = document.getElementById("mypokemon");
    let enemyPokemonSprite = document.getElementById("encounterpokemon");

    myPokemon.style.visibility = "hidden";
    enemyPokemonSprite.style.visibility = "hidden";

    gameState = OVERWORLD;
    playMusic(currentMap.music);
}

function playerAttack(moveIndex) {
    let move = playerPokemon.moves[moveIndex];
    let damage = getDamage(playerPokemon, enemyPokemon, move);

    enemyPokemon.hp -= damage;
    enemyPokemon.hp = Math.max(enemyPokemon.hp, 0);

    battleMessage = playerPokemon.name + " used " + move.name + "!";

    if (enemyPokemon.hp <= 0) {
        battleMessage = "Enemy defeated! Press Enter.";
        playMusic("victory");
        battleOver = true;
        enemyDefeated = true;
    } else {
        enemyAttack();
    }

    battleMenu = "main";
    selectedBattleOption = 0;
}

function usePotion() {
    if (healingPotions <= 0) {
        battleMessage = "You have no potions left!";
        battleMenu = "main";
        selectedBattleOption = 0;
        return;
    }

    if (playerPokemon.hp >= playerPokemon.maxHp) {
        battleMessage = playerPokemon.name + " already has full HP!";
        battleMenu = "main";
        selectedBattleOption = 0;
        return;
    }

    let oldHp = playerPokemon.hp;

    playerPokemon.hp += potionHealAmount;

    // Prevents healing past max
    if (playerPokemon.hp > playerPokemon.maxHP) {
        playerPokemon.hp = playerPokemon.maxHP;
        battleMessage = playerPokemon.name + " healed to MAX HP!";
    } else {
        let healedAmount = playerPokemon.hp - oldHp;
        battleMessage = playerPokemon.name + " healed " + healedAmount + " HP!";
    }

    healingPotions--;
    enemyAttack();

    battleMenu = "main";
    selectedBattleOption = 0;
}

function switchPokemon(teamIndex) {
    if (teamIndex === selectedTeamIndex) {
        battleMessage = playerPokemon.name + " is already fighting!";
        battleMenu = "main";
        selectedBattleOption = 0;
        return;
    }

    // Prevent switching to fainted team members
    if (!playerTeam[teamIndex] || playerTeam[teamIndex].hp <= 0) {
        battleMessage = "You can't switch to a fainted Pokenot!";
        // stay in switch menu so player can choose another
        selectedBattleOption = 0;
        return;
    }

    selectedTeamIndex = teamIndex;
    playerPokemon = playerTeam[selectedTeamIndex];
    attackOptions = (playerPokemon.moves || []).map(function(move) {
        return move.name || 'Tackle';
    });

    let myPokemon = document.getElementById("mypokemon");
    myPokemon.src = `assets/pokemon_back_sprites/${playerPokemon.name}.gif`;

    battleMessage = "Go, " + playerPokemon.name + "!";

    enemyAttack();

    battleMenu = "main";
    selectedBattleOption = 0;
}

function enemyAttack() {
    let moveIndex = Math.floor(Math.random() * enemyPokemon.moves.length);
    let move = enemyPokemon.moves[moveIndex];
    let damage = getDamage(enemyPokemon, playerPokemon, move);

    playerPokemon.hp -= damage;
    playerPokemon.hp = Math.max(playerPokemon.hp, 0);

    battleMessage += " Enemy used " + move.name + "!";

    if (playerPokemon.hp <= 0) {
        // Try to auto-switch to the next non-fainted team member
        let nextIndex = -1;
        if (playerTeam && playerTeam.length > 0) {
            for (let i = 1; i < playerTeam.length; i++) {
                let idx = (selectedTeamIndex + i) % playerTeam.length;
                if (playerTeam[idx] && playerTeam[idx].hp > 0) {
                    nextIndex = idx;
                    break;
                }
            }
        }

        if (nextIndex !== -1) {
            selectedTeamIndex = nextIndex;
            playerPokemon = playerTeam[selectedTeamIndex];
            attackOptions = (playerPokemon.moves || []).map(function(move) { return move.name || 'Tackle'; });
            let myPokemon = document.getElementById("mypokemon");
            myPokemon.src = `assets/pokemon_back_sprites/${playerPokemon.name}.gif`;
            battleMessage = playerPokemon.name + " is sent out!";
            // Continue the battle; do not mark battleOver
        } else {
            battleMessage = "You lost! Press Enter.";
            // No non-fainted team members remain: respawn at the lab and heal party
            battleOver = true;
            enemyDefeated = false;
            // Heal the party and move player to lab spawn
            if (typeof healParty === 'function') {
                healParty();
            }
            if (typeof loadMap === 'function') {
                // use the lab spawn point 'door' defined in maps.js
                loadMap('lab', 'door');
            }
            // End the battle and return to overworld
            endBattle();
        }
    }
}

// TEMPORARY!!! basic damage formula, replace later with DB/stat/business rules
function getDamage(attacker, defender, move) {
    let randomBonus = Math.floor(Math.random() * 6);
    let damage = attacker.attack - defender.defense + randomBonus;

    if (damage < 1) {
        damage = 1;
    }

    return damage;
}

