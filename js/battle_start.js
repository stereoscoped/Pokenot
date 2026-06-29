let transitionTimer = 0;

const SHAKE_TIME = 30;          //delay until battle music starts
let shakeX = 0;
let shakeY = 0;

const TRANSITION_TIME = 180;   // 180 frames -> 3s@60fps
let zoomScale = 1;

const CAMERA_FOCUS = 0.75;
//0 -> zoom center of screen
//1 -> exactly on player

let cameraX = 0;
let cameraY = 0;

let targetCameraX = 0;
let targetCameraY = 0;


function battleTransition() {
    gameState = BATTLE_START;
    playMusic("battle");

    transitionTimer = 0;
    zoomScale = 1;

    //default cam
    cameraX = 0;
    cameraY = 0;

    //zoom to player * camera focus
    let desiredX =
        player.x + player.width / 2 - canvas.width / 2;

    let desiredY =
        player.y + player.height / 2 - canvas.height / 2;

    targetCameraX = desiredX * CAMERA_FOCUS;
    targetCameraY = desiredY * CAMERA_FOCUS;
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

        t = 1 - Math.pow(1 - t, 3);

        zoomScale = 1 + 2 * t;

        cameraX = targetCameraX * t;
        cameraY = targetCameraY * t;
    }

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
    ctx.translate(
        -canvas.width / 2 - cameraX,
        -canvas.height / 2 - cameraY
    );

    ctx.drawImage(
        town,
        0,
        0,
        canvas.width,
        canvas.height
    );

    for (let wall of walls) {
        ctx.strokeRect(
            wall.x,
            wall.y,
            wall.w,
            wall.h
        );
    }

    drawPlayer();
    ctx.restore();
}
