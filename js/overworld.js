const MAP_SCALE = 2.5;

let camera = {
    x: 0,
    y: 0
};

function loadMap(mapName, entrance) {
    currentMap = maps[mapName];

    player.x = currentMap.spawnPoints[entrance].x;
    player.y = currentMap.spawnPoints[entrance].y;
    player.direction = currentMap.spawnPoints[entrance].direction;

    camera.x = 0;
    camera.y = 0;

    canHeal = true;
    playMusic(currentMap.music);
}

function updateOverworld() {
    updatePlayer();
    updateCamera();
    updateGrassParticles();
}

function updateCamera() {

    // Keep player centered
    camera.x =
        player.x * MAP_SCALE -
        canvas.width / 2;

    camera.y =
        player.y * MAP_SCALE -
        canvas.height / 2;

    // Prevent seeing past the left/top edges
    camera.x = Math.max(0, camera.x);
    camera.y = Math.max(0, camera.y);

    // Prevent seeing past the right/bottom edges
    camera.x = Math.min(
        camera.x,
        currentMap.width * MAP_SCALE - canvas.width
    );

    camera.y = Math.min(
        camera.y,
        currentMap.height * MAP_SCALE - canvas.height
    );
}

function drawOverworld() {
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // //town image
    // ctx.drawImage(
    //     currentMap.image,
    //     0,
    //     0,
    //     canvas.width,
    //     canvas.height
    // );

    ctx.drawImage(
        currentMap.image,

        -camera.x,
        -camera.y,

        currentMap.width * MAP_SCALE,
        currentMap.height * MAP_SCALE
    );

    //debug collision boxes
    for (let wall of currentMap.walls) {
        ctx.strokeStyle = "black";
        ctx.strokeRect(
            wall.x * MAP_SCALE - camera.x,
            wall.y * MAP_SCALE - camera.y,

            wall.w * MAP_SCALE,
            wall.h * MAP_SCALE
        );
    }




    //debug collision boxes
    for (let ledge of currentMap.ledges) {
        ctx.strokeStyle = "white";
        ctx.strokeRect(
            ledge.x * MAP_SCALE - camera.x,
            ledge.y * MAP_SCALE - camera.y,

            ledge.w * MAP_SCALE,
            ledge.h * MAP_SCALE
        );
    }

    //debug heal zone
    for (let zone of currentMap.healZones) {
        ctx.strokeStyle = "green";
        ctx.strokeRect(
            zone.x * MAP_SCALE - camera.x,
            zone.y * MAP_SCALE - camera.y,

            zone.w * MAP_SCALE,
            zone.h * MAP_SCALE
        );
    }

    //debug grass
    for (let gras of currentMap.grass) {
        ctx.strokeStyle = "red";
        ctx.strokeRect(
            gras.x * MAP_SCALE - camera.x,
            gras.y * MAP_SCALE - camera.y,
            gras.w * MAP_SCALE,
            gras.h * MAP_SCALE
        );
    }
    for (let bat of currentMap.battle) {
        ctx.strokeStyle = "gold";
        ctx.strokeRect(
            bat.x * MAP_SCALE - camera.x,
            bat.y * MAP_SCALE - camera.y,
            bat.w * MAP_SCALE,
            bat.h * MAP_SCALE
        );
    }

    //debug exit
    for (let exit of currentMap.exits) {
        ctx.strokeStyle = "blue";
        ctx.strokeRect(
            exit.x * MAP_SCALE - camera.x,
            exit.y * MAP_SCALE - camera.y,
            exit.w * MAP_SCALE,
            exit.h * MAP_SCALE
        );
    }

    //debug player collision box
    if (playerBox && typeof playerBox.x !== 'undefined') {
        ctx.strokeStyle = "black";
        ctx.strokeRect(
            playerBox.x * MAP_SCALE - camera.x,
            playerBox.y * MAP_SCALE - camera.y,
            playerBox.w * MAP_SCALE,
            playerBox.h * MAP_SCALE
        );
    }

    drawPlayer();
    drawGrassParticles();
}
