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

    speed: 2
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

// function getPlayerBox() {
//     return {
//         x: newX,
//         y: newY + player.height * .75,
//         w: player.width,
//         h: player.height / 4
//     };
// }


function updatePlayer() {
    let moving = false;

    let newX = player.x;
    let newY = player.y;

    //add better world / canvas collisions later
    if (keys["d"] || keys["arrowright"]) {
        player.direction = "right";
        newX += player.speed;
        moving = true;
    }

    if (keys["a"] || keys["arrowleft"]) {
        player.direction = "left";
        newX -= player.speed;
        moving = true;
    }

    if (keys["w"] || keys["arrowup"]) {
        player.direction = "up";
        newY -= player.speed;
        moving = true;
    }

    if (keys["s"] || keys["arrowdown"]) {
        player.direction = "down";
        newY += player.speed;
        moving = true;
    }

    playerBox =
        {
            x: newX + player.width * PLAYER_SCALE * .2,
            y: newY + player.height * PLAYER_SCALE * .75,
            w: player.width * PLAYER_SCALE * .6,
            h: (player.height / 4) * PLAYER_SCALE
        };

    let blocked = false;

    //if going to hit collision box, stop moving
    //causes sticky walls for now, should update later if we stick with this
    for (let wall of currentMap.walls) {
        if (collides(playerBox, wall)) {
            blocked = true;
            break;
        }
    }

    if (!blocked) {
        // Use map bounds (in map units) not canvas pixels — keep coordinates consistent with MAP_SCALE used when drawing
        if (newX > 0 && (newX + player.width * PLAYER_SCALE) < currentMap.width) {
            player.x = newX;
        }
        if (newY > 0 && (newY + player.height * PLAYER_SCALE) < currentMap.height) {
            player.y = newY;
        }
    }

    if (moving) {
        //advance anim sprite every "framesUntilUpdate" frames
        player.frameCounter++;

        if (player.frameCounter > player.framesUntilUpdate) {
            player.frame =
                (player.frame + 1) % animations[player.direction].frameTot;

            player.frameCounter = 0;
        }
        collideGrass();
        collideMapChange();
    }
    else {
        player.frame = 1;
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
        camera.y;

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
