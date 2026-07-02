// battle stuff -- TODO

let selectedBattleOption = 0;
let battleMenu = "main";
let battleMessage = "A wild Pokenot appeared!";
let battleOver = false;

// TEMPORARY!!! replace with player's selected Pokenot from DB
let playerPokemon;

// TEMPORARY!!! replace with enemy/wild Pokenot from DB or encounter table
let enemyPokemon;

let mainBattleOptions = ["Fight", "Run"];

// TEMPORARY!!! replace with moves loaded from DB
let attackOptions = [];

function startBattle() {
    gameState = BATTLE;

    let myPokemon = document.getElementById("mypokemon");
    let enemyPokemonSprite = document.getElementById("encounterpokemon");

    // TEMPORARY!!! currently random pokemon sprites will appear
    let randomNum = Math.floor(Math.random() * 151) + 1;
    let randomNum2 = Math.floor(Math.random() * 151) + 1;
    //Player's first pokemon is always the first in the pokedex for now, enemy is random
    let pokemonName = playerTeam[0].name;
    let pokemonName2 = pokeDex[randomNum2].name;

    myPokemon.src = `assets/pokemon_back_sprites/${pokemonName}.gif`;
    enemyPokemonSprite.src = `assets/pokemon_front_sprites/${pokemonName2}.gif`;

    myPokemon.style.visibility = "visible";
    enemyPokemonSprite.style.visibility = "visible";

    playerPokemon = playerTeam[0]; // First Pokemon of the player's team

    enemyPokemon = pokeDex[randomNum2]; // Random Pokenot

    attackOptions = playerPokemon.moves.map(function(move) {
        return move.name;
    });

    selectedBattleOption = 0;
    battleMenu = "main";
    battleOver = false;
    battleMessage = "A wild " + enemyPokemon.name + " appeared!";

    playMusic("battleBGM");
}

function makePokemon(name, hp, attack, defense, speed, moves) {
    return {
        name: name,
        hp: hp,
        maxHP: hp,
        attack: attack,
        defense: defense,
        speed: speed,
        moves: moves
    };
}

function updateBattle() {
    let options = getBattleOptions();

    if (keys["arrowup"]) {
        selectedBattleOption--;

        if (selectedBattleOption < 0) {
            selectedBattleOption = options.length - 1;
        }

        keys["arrowup"] = false;
    }

    if (keys["arrowdown"]) {
        selectedBattleOption++;

        if (selectedBattleOption >= options.length) {
            selectedBattleOption = 0;
        }

        keys["arrowdown"] = false;
    }

    if (keys["enter"]) {
        chooseBattleOption();
        keys["enter"] = false;
    }

    if (keys["escape"] || keys["backspace"]) {
        battleMenu = "main";
        selectedBattleOption = 0;

        keys["escape"] = false;
        keys["backspace"] = false;
    }

    // old quick run option
    if (keys["1"]) {
        endBattle();
        keys["1"] = false;
    }
}

function getBattleOptions() {
    if (battleMenu === "moves") {
        return attackOptions;
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
        } else {
            endBattle();
        }
    } else if (battleMenu === "moves") {
        playerAttack(selectedBattleOption);
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
    let damage = attacker.attack - defender.defense + randomBonus;

    if (damage < 1) {
        damage = 1;
    }

    return damage;
}

function drawBattle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBattleBackground();
    drawPokemonInfo();
    drawBattleTextBox();
    drawBattleMenu();
}

function drawBattleBackground() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
        battle_background,
        0,
        0,
        canvas.width,
        canvas.height - 150
    );
}

function drawPokemonInfo() {
    ctx.fillStyle = "black";

    drawHealthText(enemyPokemon, 50, 60);
    drawHealthText(playerPokemon, 50, 180);
}

function drawHealthText(pokemon, x, y) {
    ctx.fillText(pokemon.name, x, y);

    ctx.fillText(
        "HP: " + pokemon.hp + "/" + pokemon.maxHP,
        x,
        y + 25
    );
}

function drawBattleTextBox() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 450, canvas.width, 150);

    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 450, canvas.width, 150);

    ctx.fillStyle = "black";
    ctx.fillText(battleMessage, 30, 490);
}

function drawBattleMenu() {
    let options = getBattleOptions();

    ctx.fillStyle = "black";

    for (let i = 0; i < options.length; i++) {
        let optionText = options[i];

        if (i === selectedBattleOption) {
            optionText = "> " + optionText;
        }

        ctx.fillText(optionText, 520, 490 + i * 25);
    }
}