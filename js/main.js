function update() {
    switch (gameState) {
        case OVERWORLD:
            updateOverworld();
            break;
        case MENU:
            update_start();
            break;
        case BATTLE_START:
            updateTransition();
            break;
        case BATTLE:
            updateBattle();
            break;
    }
}

function draw() {
    switch (gameState) {
        case MENU:
            start_Game();
             break;
        case OVERWORLD:
            drawOverworld();
            // hides the gif
           document.getElementById("mypokemon").style.visibility = "hidden";
           document.getElementById("encounterpokemon").style.visibility = "hidden";

            break;
        case BATTLE_START:
            drawTransition();
            break;
        case BATTLE:
            drawBattle();

            break;
    }
}

function gameLoop() {

    update();
    draw();
    requestAnimationFrame(gameLoop);
}


trainer.onload = function () {
    gameLoop();
};
