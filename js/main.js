function update() {
    switch (gameState) {
        case OVERWORLD:
            updateOverworld();
            break;

        case BATTLE:
            updateBattle();
            break;
    }
}

function draw() {
    switch (gameState) {
        case OVERWORLD:
            drawOverworld();
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