//playerdata
let player = {
    x: 360,
    y: 417,

    width: 25,
    height: 30,

    direction: "down",

    frame: 0,
    frameCounter: 0,
    framesUntilUpdate: 8,

    speed: 2
};

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

    let playerBox =
    {
        x: newX,
        y: newY,
        w: player.width,
        h: player.height
    };

    let blocked = false;

    //if going to hit collision box, stop moving
    //causes sticky walls for now, should update later if we stick with this
    for (let wall of walls) {
        if (collides(playerBox, wall)) {
            blocked = true;
            break;
        }
    }

    if (!blocked) {
        if (newX > 0 && (newX + player.width) < canvas.width) {
            player.x = newX;
        }
        if (newY > 0 && (newY + player.height) < canvas.height) {
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

    //shift strafe anims to be a bit more centered
    //not needed for this one
    // let drawX = player.x;
    // if (
    //     player.direction === "left" || player.direction === "right"
    // ) {
    //     drawX += 30;
    // }

    ctx.drawImage(
        trainer,

        sourceX,
        sourceY,

        anim.frameWidth,
        player.height,

        // drawX,
        player.x,
        player.y,

        anim.frameWidth,
        player.height
    );
}