//add map change functionality
    //if map == town ->s
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

function updateOverworld(){
    updatePlayer();
    updateGrassParticles();
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
    drawGrassParticles();
}