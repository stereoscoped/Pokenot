//battle stuff -- TODO
function startBattle() {
    gameState = BATTLE;
    playMusic("battle");
}

function updateBattle() {
    //run
    if (keys["1"]) {
        gameState = OVERWORLD;
        playMusic("town");
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