//battle stuff -- TODO
function startBattle() {
    gameState = BATTLE;
    let myPokemon = document.getElementById("mypokemon");
    let enemyPokemon = document.getElementById("encounterpokemon");

    // currently random pokemon will appear
    let randomNum = Math.floor(Math.random() * 151) + 1;
    let randomNum2 = Math.floor(Math.random() * 151) + 1;

    let pokemonName = pokedex[randomNum];
    let pokemonName2 = pokedex[randomNum2];

    myPokemon.src=`assets/pokemon_back_sprites/${pokemonName}.gif`
    enemyPokemon.src=`assets/pokemon_front_sprites/${pokemonName2}.gif`


    myPokemon.style.visibility = "visible";
    enemyPokemon.style.visibility = "visible";

    // YOUR Pokémon: lower-left patch

    playMusic("battle");
}

function updateBattle() {
    //run
    if (keys["1"]) {
        gameState = OVERWORLD;
        playMusic(currentMap.music);
    }
}

function drawBattle() {
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    //battle background
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
    ctx.drawImage(battle_background, 0, 0, canvas.width, canvas.height-150);

    ctx.fillStyle = "black";
    ctx.fillText(
        "//fight goes here",
        20,
        50
    );

    //action menu skel
    ctx.fillStyle = "white";
    ctx.fillRect(
        0,
        450,
        canvas.width,
        150
    );

    ctx.fillStyle = "black";
    ctx.fillText(
        "1 - run",
        20,
        500
    );
}
