//playerdata
const PLAYER_SCALE = 0.75; // additional scale applied to player sprite and hitbox

let player = {
    x: 110,
    y: 167,

    width: 25,
    height: 30,

    direction: "down",

    frame: 0,
    frameCounter: 0,
    framesUntilUpdate: 8,

    speed: 1.5,
    jumpOffset: 0,
};

let playerBox = [];

const animations = {
    down:
    {
        startX: 280,
        startY: 50,
        frameWidth: 23,
        frameTot: 4
    },

    up:
    {
        startX: 280,
        startY: 154,
        frameWidth: 23,
        frameTot: 4
    },

    right:
    {
        startX: 275,
        startY: 85,
        frameWidth: 25,
        frameTot: 4
    },

    left:
    {
        startX: 275,
        startY: 118,
        frameWidth: 25,
        frameTot: 4
    }
};

let jumpTimer = 0;
const JUMP_TIME = 18;

let jumping = false;
let jumpStartY = 0;
let jumpEndY = 0;

let downHeld = 0;
const DOWN_HOLD_TIME = 18;

function getPlayerBox(x = player.x, y = player.y) {
    return {
        x: x + player.width * PLAYER_SCALE * 0.2,
        y: y + player.height * PLAYER_SCALE * 0.75,
        w: player.width * PLAYER_SCALE * 0.6,
        h: player.height * PLAYER_SCALE / 4
    };
}

function startJump(ledge) {
    jumping = true;
    jumpTimer = 0;
    jumpStartY = player.y;
    jumpEndY = ledge.y + 16;
}

function updateJump() {
    jumpTimer++;
    let t = jumpTimer / JUMP_TIME;

    if (t > 1)
        t = 1;

    player.y =
        jumpStartY +
        (jumpEndY - jumpStartY) * t;


    player.jumpOffset =
        -Math.sin(t * Math.PI) * 12;

    if (t >= 1) {
        jumping = false;
        player.jumpOffset = 0;
    }
}

function movePlayerX(dx) {
    if (dx === 0)
        return;

    let newX = player.x + dx;

    let box = getPlayerBox(newX, player.y);

    let blocked = false;

    for (let wall of currentMap.walls) {
        if (collides(box, wall)) {
            blocked = true;
            break;
        }
    }

    if (!blocked) {
        player.x = newX;
    }
}

function movePlayerY(dy) {
    if (dy === 0)
        return;

    let newY = player.y + dy;

    let box = getPlayerBox(player.x, newY);

    let blocked = false;

    for (let wall of currentMap.walls) {
        if (collides(box, wall)) {
            blocked = true;
            break;
        }
    }

    if (!blocked) {
        playerBox = box;
        blocked = collideLedges();
    }

    if (!blocked) {
        player.y = newY;
    }
}

function updatePlayer() {
    if (jumping) {
        updateJump();
        return;
    }

    let dx = 0;
    let dy = 0;

    if (keys["d"] || keys["arrowright"])
        dx++;

    if (keys["a"] || keys["arrowleft"])
        dx--;

    if (keys["w"] || keys["arrowup"])
        dy--;

    if (keys["s"] || keys["arrowdown"])
        dy++;

    //update look dir -> prioritize horizontal
    if (dx > 0)
        player.direction = "right";
    else if (dx < 0)
        player.direction = "left";
    else if (dy > 0)
        player.direction = "down";
    else if (dy < 0)
        player.direction = "up";

    //normalize diagonal speed
    let moving = (dx !== 0 || dy !== 0);

    if (moving) {
        let length = Math.sqrt(dx * dx + dy * dy);

        dx /= length;
        dy /= length;

        dx *= player.speed;
        dy *= player.speed;
    }

    movePlayerX(dx);
    movePlayerY(dy);

    player.x = Math.max(
        0,
        Math.min(
            player.x,
            currentMap.width - player.width * PLAYER_SCALE
        )
    );

    player.y = Math.max(
        0,
        Math.min(
            player.y,
            currentMap.height - player.height * PLAYER_SCALE
        )
    );

    //update hitbox
    playerBox = getPlayerBox();

    //collision checks that dont affect movement
    if (moving) {
        collideGrass();
        collideMapChange();
    }

    if (moving) {
        player.frameCounter++;

        if (player.frameCounter > player.framesUntilUpdate) {
            player.frame++;
            player.frame %= animations[player.direction].frameTot;
            player.frameCounter = 0;
        }
    }
    else {
        player.frame = 1;
        player.frameCounter = 0;
    }
}

function drawPlayer() {
    //select anim set based on direction
    let anim =
        animations[player.direction];

    //get coords of current frame in sprite sheet
    let sourceX =
        anim.startX +
        player.frame * anim.frameWidth;

    let sourceY =
        anim.startY;

    let drawX =
        player.x * MAP_SCALE -
        camera.x;

    let drawY =
        player.y * MAP_SCALE -
        camera.y +
        player.jumpOffset;

    ctx.fillStyle = "rgba(0,0,0,0.25)";

    ctx.beginPath();

    ctx.ellipse(
        drawX + player.width * MAP_SCALE * PLAYER_SCALE / 2,
        player.y * MAP_SCALE - camera.y + player.height * MAP_SCALE * PLAYER_SCALE,

        10,
        4,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();
    ctx.drawImage(
        trainer,

        sourceX,
        sourceY,

        anim.frameWidth,
        player.height,

        drawX,
        drawY,

        player.width * MAP_SCALE * PLAYER_SCALE,
        player.height * MAP_SCALE * PLAYER_SCALE
    );
}

function drawPlayerTransition() {

    let anim = animations[player.direction];

    let sourceX =
        anim.startX +
        player.frame * anim.frameWidth;

    let sourceY = anim.startY;

    ctx.drawImage(
        trainer,

        sourceX,
        sourceY,

        anim.frameWidth,
        player.height,

        player.x * MAP_SCALE,
        player.y * MAP_SCALE,

        player.width * MAP_SCALE * PLAYER_SCALE,
        player.height * MAP_SCALE * PLAYER_SCALE
    );
}