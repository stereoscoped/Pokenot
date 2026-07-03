//battle stuff -- TODO

function start_Game() {
    ctx.drawImage(start_image, 0, 0, canvas.width, canvas.height);

}

function update_start() {
    //run
    if (keys[" "]) {
        startIntro();
    }
}

