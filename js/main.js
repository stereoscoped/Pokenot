function update() {
    switch (gameState) {
        case MENU:
            update_start();
            break;

        case OVERWORLD:
            updateOverworld();
            break;

        case HEAL:
            updateHeal();
            break;

        case BATTLE_START:
            updateTransition();
            break;

        case BATTLE:
            updateBattle();
            break;
        case STARTER:
            update_starter();
            break;

    }
}

function draw() {
    switch (gameState) {
        case MENU:
            document.getElementById("btn_stater_1").style.visibility = "hidden";
            document.getElementById("btn_stater_2").style.visibility = "hidden";
            document.getElementById("btn_stater_3").style.visibility = "hidden";
            start_Game();
            break;

        case OVERWORLD:
            drawOverworld();
            document.getElementById("mypokemon").style.visibility = "hidden";
            document.getElementById("encounterpokemon").style.visibility = "hidden";
            document.getElementById("btn_stater_1").style.visibility = "hidden";
            document.getElementById("btn_stater_2").style.visibility = "hidden";
            document.getElementById("btn_stater_3").style.visibility = "hidden";


            break;
        
        case HEAL:
            drawHeal();
            break;

        case BATTLE_START:

            drawTransition();
            break;

        case BATTLE:

            drawBattle();
            break;
        case STARTER:
            drawStater();
            document.getElementById("btn_stater_1").style.visibility = "visible";
            document.getElementById("btn_stater_2").style.visibility = "visible";
            document.getElementById("btn_stater_3").style.visibility = "visible";
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}


trainer.onload = async function() {
    await loadPokemonDatabase();
    //Plays intro and adds starter 

    //temp just a pikachu for now
    addPokemonToPlayerTeam(structuredClone(pokeDex[24])); // Pikachu as starter
    addPokemonToPlayerTeam(structuredClone(pokeDex[0])); // Ivysaur as starter
    addPokemonToPlayerTeam(structuredClone(pokeDex[3])); // charmander as starter
    addPokemonToPlayerTeam(structuredClone(pokeDex[6])); // squirtle as starter
    console.log("player team test", playerTeam);
    
    
    gameLoop();
};
