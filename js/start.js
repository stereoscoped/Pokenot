function start_Game() {
    ctx.drawImage(start_image, 0, 0, canvas.width, canvas.height);
}

function update_start() {
    //run
    if (keys[" "]) {
        gameState = OVERWORLD;
        // gameLoop();  //the source of the game running too fast it seems?
        playMusic(currentMap.music);
    }
}
