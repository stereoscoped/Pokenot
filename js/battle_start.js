let transitionTimer = 0;

const SHAKE_TIME = 30;          //delay until battle music starts
let shakeX = 0;
let shakeY = 0;

const TRANSITION_TIME = 180;   // 180 frames -> 3s@60fps
let zoomScale = 1;

const CAMERA_FOCUS = 1;
//0 -> zoom center of screen
//1 -> exactly on player

let cameraX = 0;
let cameraY = 0;

let cameraXStart = 0;
let cameraYStart = 0;

let targetCameraX = 0;
let targetCameraY = 0;


function battleTransition() {
    gameState = BATTLE_START;
    playMusic("battle");

    transitionTimer = 0;
    zoomScale = 1;

    //capture the current overworld camera start (so zoom starts from current view)
    cameraXStart = camera.x;
    cameraYStart = camera.y;

    //default local cam values start at current camera so we interpolate from that view
    cameraX = cameraXStart;
    cameraY = cameraYStart;

    //zoom to player * camera focus (convert to screen pixels using MAP_SCALE and PLAYER_SCALE)
    let desiredX =
        (player.x + (player.width*PLAYER_SCALE) / 2) * MAP_SCALE - canvas.width / 2;

    let desiredY =
        (player.y + (player.height*PLAYER_SCALE) / 2) * MAP_SCALE - canvas.height / 2;

    // apply focus
    targetCameraX = desiredX * CAMERA_FOCUS;
    targetCameraY = desiredY * CAMERA_FOCUS;

    // clamp targets so we don't pan outside the map during zoom
    const maxCamX = Math.max(0, currentMap.width * MAP_SCALE - canvas.width);
    const maxCamY = Math.max(0, currentMap.height * MAP_SCALE - canvas.height);

    targetCameraX = Math.max(0, Math.min(targetCameraX, maxCamX));
    targetCameraY = Math.max(0, Math.min(targetCameraY, maxCamY));
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

        // zoom to target (interpolate from camera start to target)
        let t =
            (transitionTimer - SHAKE_TIME) /
            (TRANSITION_TIME - SHAKE_TIME);

        t = 1 - Math.pow(1 - t, 3);

        zoomScale = 1 + 2 * t;

        // interpolate from starting camera to the targetCamera values
        cameraX = cameraXStart + (targetCameraX - cameraXStart) * t;
        cameraY = cameraYStart + (targetCameraY - cameraYStart) * t;

        // Debug log values while transitioning (remove or guard later)
        console.log(`transition t=${t.toFixed(3)} cameraX=${cameraX.toFixed(1)} cameraY=${cameraY.toFixed(1)} targetX=${targetCameraX.toFixed(1)} targetY=${targetCameraY.toFixed(1)}`);
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

    // draw full map at origin — transforms already applied (includes cameraX/cameraY via translate)
    ctx.drawImage(
        currentMap.image,
        0,
        0,
        currentMap.width * MAP_SCALE,
        currentMap.height * MAP_SCALE
    );

    //draw map walls scaled and offset like overworld (transforms already include camera)
    for (let wall of currentMap.walls) {
        ctx.strokeRect(
            wall.x * MAP_SCALE,
            wall.y * MAP_SCALE,
            wall.w * MAP_SCALE,
            wall.h * MAP_SCALE
        );
    }

    // draw player — set global camera to 0 so drawPlayer uses world coords directly under transforms
    const _oldCamX = camera.x;
    const _oldCamY = camera.y;
    camera.x = 0;
    camera.y = 0;

    drawPlayer();

    camera.x = _oldCamX;
    camera.y = _oldCamY;

    // on-screen debug readout
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(8, 8, 260, 60);
    ctx.fillStyle = "white";
    ctx.font = "12px monospace";
    ctx.fillText(`t=${Math.min(1, (transitionTimer/TRANSITION_TIME)).toFixed(3)} z=${zoomScale.toFixed(2)}`, 16, 26);
    ctx.fillText(`camX=${cameraX.toFixed(1)} camY=${cameraY.toFixed(1)}`, 16, 44);
    ctx.fillText(`targetX=${targetCameraX.toFixed(1)} targetY=${targetCameraY.toFixed(1)}`, 16, 60);

    ctx.restore();
}