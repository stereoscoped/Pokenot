// battle stuff -- TODO

let selectedBattleOption = 0;
let battleMenu = "main";
let battleMessage = "A wild Pokenot appeared!";
let battleOver = false;

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
let potionHealAmount = 4;

// TEMPORARY!!! replace with player's team from DB
let selectedTeamIndex = 0;

function startBattle() {
    gameState = BATTLE;

    let myPokemon = document.getElementById("mypokemon");
    let enemyPokemonSprite = document.getElementById("encounterpokemon");

    // TEMPORARY!!! currently random pokemon sprites will appear
    let randomNum = Math.floor(Math.random() * 151) + 1;
    let randomNum2 = Math.floor(Math.random() * 151) + 1;

    let pokemonName = pokedex[randomNum];
    let pokemonName2 = pokedex[randomNum2];

    myPokemon.src = `assets/pokemon_back_sprites/${pokemonName}.gif`;
    enemyPokemonSprite.src = `assets/pokemon_front_sprites/${pokemonName2}.gif`;

    //start hidden
    myPokemon.style.visibility = "hidden";
    enemyPokemonSprite.style.visibility = "hidden";

    // position enemy off-screen to match intro start
    enemyPokemonSprite.style.left = (typeof battleIntro.enemyX !== 'undefined') ? battleIntro.enemyX + 'px' : '-200px';
    // ensure player sprite fully transparent until its phase
    myPokemon.style.opacity = '0';

    // TEMPORARY!!! replace with player's selected Pokenot from DB
    playerTeam = [
        makePokemon(
            pokemonName,
            100,
            15,
            5,
            10,
            [
                { name: "Tackle", power: 12 },
                { name: "Fire Blast", power: 22 }
            ]
        ),
        makePokemon(
            "pikachu",
            80,
            18,
            4,
            14,
            [
                { name: "Quick Attack", power: 10 },
                { name: "Thunder Shock", power: 20 }
            ]
        )
    ];

    selectedTeamIndex = 0;
    playerPokemon = playerTeam[selectedTeamIndex];

    // TEMPORARY!!! replace with enemy/wild Pokenot from DB or encounter table
    enemyPokemon = makePokemon(
        pokemonName2,
        100,
        12,
        4,
        8,
        [
            { name: "Scratch", power: 10 },
            { name: "Bite", power: 16 }
        ]
    );

    attackOptions = playerPokemon.moves.map(function(move) {
        return move.name;
    });

    selectedBattleOption = 0;
    battleMenu = "main";
    battleOver = false;
    let enemypokemon=enemyPokemon.name;
    battleMessage = "A wild " + enemypokemon.toUpperCase() + " appeared!";

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
            return pokemon.name;
        });

        return switchOptions.concat(["Back"]);
    }


    return mainBattleOptions;
}

function chooseBattleOption() {
    if (battleOver) {
        endBattle();
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
        battleOver = true;
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

    if (playerPokemon.hp > playerPokemon.maxHp) {
        playerPokemon.hp = playerPokemon.maxHp;
    }

    healingPotions--;

    let healedAmount = playerPokemon.hp - oldHp;

    battleMessage = playerPokemon.name + " healed " + healedAmount + " HP!";

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

    selectedTeamIndex = teamIndex;
    playerPokemon = playerTeam[selectedTeamIndex];
    attackOptions = playerPokemon.moves.map(function(move) {
        return move.name;
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
        battleMessage = "You lost! Press Enter.";
        battleOver = true;
    }
}

// TEMPORARY!!! basic damage formula, replace later with DB/stat/business rules
function getDamage(attacker, defender, move) {
    let randomBonus = Math.floor(Math.random() * 6);
    let damage = move.power + attacker.attack - defender.defense + randomBonus;

    if (damage < 1) {
        damage = 1;
    }

    return damage;
}

