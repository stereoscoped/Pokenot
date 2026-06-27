//canvas and drawing context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const background_image=new Image();
background_image.src='../assets/backgrounds/battle_backgrounds.png';
const background_extra=new Image();
background_extra.src='../assets/backgrounds/battle.png';
const gif = new Image();
gif.src='../assets/gifs/charizard-megax.gif';
//game state
const OVERWORLD = "overworld";
const BATTLE = "battle";
let gameState = OVERWORLD;
let bck_position=0;

//kb listeners
let keys = {};

document.addEventListener("keydown", function (event) {
    keys[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", function (event) {
    keys[event.key.toLowerCase()] = false;
});

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

const trainer = new Image();
trainer.src = "assets/people/trainer_sprite.png";

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

//towndata
const town = new Image();
town.src = "assets/backgrounds/town.jpg";

const walls =
    [
        { x: 160, y: 98, w: 160, h: 104 },
        { x: 480, y: 98, w: 160, h: 104 },
        { x: 400, y: 267, w: 240, h: 130 },
        { x: 160, y: 467, w: 160, h: 160 },

    ];

const grass =
    [
        { x: 400, y: 0, w: 80, h: 67 },
    ];

//tried but didnt work as intended-> use manual conversion for now
//x = x * 800 / 320
//y = y * 600 / 288
// function imgToCanvCoord(axis, len){
//     if (axis == "x")
//         return len * canvas.width / town.width;
//     if (axis == "y")
//         return len * canvas.height / town.height;
//     return 0;
// }

//collision check btwn objects
function collides(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

function updateOverworld() {
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
        checkGrass();
    }
    else {
        player.frame = 1;
    }
}

//grass encounter
function checkGrass() {
    let playerBox =
    {
        x: player.x,
        y: player.y,
        w: player.width,
        h: player.height
    };

    for (let patch of grass) {
        if (collides(playerBox, patch)) {
            if (Math.random() < 0.02) {
                startBattle();
            }
        }
    }
}

//battle stuff -- TODO
function startBattle() {
    gameState = BATTLE;
}

function updateBattle() {
    if (keys["1"]) {
        gameState = OVERWORLD;
        bck_position++;
    }
}


function drawOverworld() {
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    //town image
    ctx.drawImage(
        town,
        0,
        0,
        canvas.width,
        canvas.height
    );

    //debug collision boxes
    for (let wall of walls) {
        ctx.strokeStyle = "black";
        ctx.strokeRect(
            wall.x,
            wall.y,
            wall.w,
            wall.h
        );
    }

    //debug grass
    for (let gras of grass) {
        ctx.strokeStyle = "red";
        ctx.strokeRect(
            gras.x,
            gras.y,
            gras.w,
            gras.h
        );
    }

    drawPlayer();
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
function battle_bckgrnd(position){
    if(position===0){
        ctx.drawImage(background_image, 6, 6, 240, 112, 0, 0, canvas.width, canvas.height - 100);
    }else if(position===1){
        ctx.drawImage(background_image, 249, 6, 240, 112, 0, 0, canvas.width, canvas.height - 100);

    }else if(position===2) {
        ctx.drawImage(background_image, 492, 6, 240, 112, 0, 0, canvas.width, canvas.height - 100);

    }else if(position===3){
        ctx.drawImage(background_image, 6, 121, 240, 112, 0, 0, canvas.width, canvas.height - 100);

    }else if(position===4){
        ctx.drawImage(background_image, 249, 121, 240, 112, 0, 0, canvas.width, canvas.height - 100);

    }  else if(position===5){
        ctx.drawImage(background_image, 492, 121, 240, 112, 0, 0, canvas.width, canvas.height - 100);

    }
    else if(position===6){
        ctx.drawImage(background_image, 6, 235, 240, 112, 0, 0, canvas.width, canvas.height - 100);

    }
    else if(position===7){
        ctx.drawImage(background_image, 249, 235, 240, 112, 0, 0, canvas.width, canvas.height - 100);

    }
    else if(position===8){
        ctx.drawImage(background_image, 492, 235, 240, 112, 0, 0, canvas.width, canvas.height - 100);

    }
        else if(position===9){
        ctx.drawImage(background_image, 6, 349, 240, 112, 0, 0, canvas.width, canvas.height - 100);

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
    battle_bckgrnd(bck_position);
    if(bck_position > 9){
        bck_position=0;
    }
}
function update() {
    if (gameState === OVERWORLD) {
        updateOverworld();
    }
    else {
        updateBattle();
    }
}

function draw() {
    if (gameState === OVERWORLD) {
        drawOverworld();
    }
    else {
        drawBattle();
    }
}

function gameLoop() {
    update();
    draw();

    requestAnimationFrame(
        gameLoop
    );
}

trainer.onload = function () {
    gameLoop();
};