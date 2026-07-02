let transitionTimer = 0;

const SHAKE_TIME = 30;          //delay until battle music starts
let shakeX = 0;
let shakeY = 0;

const TRANSITION_TIME = 180;   // 180 frames -> 3s@60fps
let zoomScale = 1;

const CAMERA_FOCUS = 0.75;
//0 -> zoom center of screen
//1 -> exactly on player

let focusX = 0;
let focusY = 0;

let startFocusX = 0;
let startFocusY = 0;

let targetFocusX = 0;
let targetFocusY = 0;


function battleTransition() {
    gameState = BATTLE_START;
    playMusic("battleBGM");

    transitionTimer = 0;
    zoomScale = 1;

    //current screen in world coords
    startFocusX =
        camera.x + canvas.width / 2;

    startFocusY =
        camera.y + canvas.height / 2;

    //player in world coords
    let playerCenterX =
        player.x * MAP_SCALE +
        (player.width * PLAYER_SCALE * MAP_SCALE) / 2;

    let playerCenterY =
        player.y * MAP_SCALE +
        (player.height * PLAYER_SCALE * MAP_SCALE) / 2;

    //start from center
    focusX = startFocusX;
    focusY = startFocusY;

    //zoom toward player based on camera_focus
    targetFocusX =
        startFocusX +
        (playerCenterX - startFocusX) * CAMERA_FOCUS;

    targetFocusY =
        startFocusY +
        (playerCenterY - startFocusY) * CAMERA_FOCUS;
}

function updateTransition() {

    transitionTimer++;

    if (transitionTimer < SHAKE_TIME) {
        // random shake
        shakeX = (Math.random() - 0.5) * 10;
        shakeY = (Math.random() - 0.5) * 10;

        zoomScale = 1;
    }
    else {
        // stop shaking
        shakeX = 0;
        shakeY = 0;

        // zoom to target
        let t =
            (transitionTimer - SHAKE_TIME) /
            (TRANSITION_TIME - SHAKE_TIME);

        t = Math.min(t, 1);
        t = 1 - Math.pow(1 - t, 3);

        zoomScale = 1 + 2 * t;

        focusX =
            startFocusX +
            (targetFocusX - startFocusX) * t;

        focusY =
            startFocusY +
            (targetFocusY - startFocusY) * t;
    }

    if (Math.random() < (transitionTimer / TRANSITION_TIME)) {
        spawnGrassParticles(true);
    }

    updateGrassParticles();

    if (transitionTimer >= TRANSITION_TIME) {
        zoomScale = 1;
        startBattle();
    }
}

function drawTransition() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    ctx.translate(
        canvas.width / 2 + shakeX,
        canvas.height / 2 + shakeY
    );

    ctx.scale(zoomScale, zoomScale);

    //move focus point to screen center
    ctx.translate(
        -focusX,
        -focusY
    );

    //draw map
    ctx.drawImage(
        currentMap.image,
        0,
        0,
        currentMap.width * MAP_SCALE,
        currentMap.height * MAP_SCALE
    );

    drawPlayerTransition();
    drawGrassParticles(false);

    ctx.restore();
}
