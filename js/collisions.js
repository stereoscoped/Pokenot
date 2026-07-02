let grassParticles = [];
const MAX_GRASS_PARTICLES = 500;

let touchingLedge = false;
let ledgeHoldTimer = 0;

//collision check btwn objects
function collides(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

//func collideWall(){}

function collideLedges() {
    let onLedge = false;

    for (let ledge of currentMap.ledges) {
        if (!collides(playerBox, ledge))
            continue;

        onLedge = true;

        let fromTop =
            player.y + player.height < ledge.y + 8;

        if (!fromTop)
            return true;

        if (keys["s"] || keys["arrowdown"]) {
            ledgeHoldTimer++;

            if (ledgeHoldTimer >= DOWN_HOLD_TIME) {
                startJump(ledge);
                ledgeHoldTimer = 0;
                return false;
            }
        }
        else {
            ledgeHoldTimer = 0;
        }
        return true;
    }

    // Not touching any ledge anymore
    if (!onLedge) {
        ledgeHoldTimer = 0;
    }

    return false;
}

function collideMapChange() {
    // console.log("calling collide map change func");
    for (let exit of currentMap.exits) {
        if (collides(playerBox, exit)) {
            console.log("loading " + exit.destination + ": " + exit.entrance);
            loadMap(
                exit.destination,
                exit.entrance
            );
        }
    }
}

function collideHealZone() {
    if (canHeal) {
        for (let zone of currentMap.healZones) {
            if (collides(playerBox, zone)) {
                startHeal();
                return;
            }
        }
    }
}

//grass encounter
function collideGrass() {
    for (let patch of currentMap.grass) {
        if (collides(playerBox, patch)) {
            if (Math.random() < 0.3) {
                spawnGrassParticles();
            }
            if (Math.random() < 0.005) {
                battleTransition();
            }
        }
    }
}

function spawnGrassParticles(battle = false) {

    if (grassParticles.length > MAX_GRASS_PARTICLES) {
        return;
    }
    if (battle) {
        for (let i = 0; i < 10; i++) {
            let particle =
            {
                x: player.x + player.width / 2
                    + (Math.random() - 0.5) * 24,
                y: player.y + player.height
                    + (Math.random() - 0.5) * 12,

                vx: (Math.random() - 0.5) * 2,
                vy: -1 - Math.random() * 2,

                life: 20,
                size: 5 + Math.random() * 5,

                //rand rotation
                angle: (Math.random() - 0.5) * 0.8,
                rotationSpeed: (Math.random() - 0.5) * 0.5
            };
            grassParticles.push(particle);
        }
    } else {
        for (let i = 0; i < 4; i++) {
            let particle =
            {
                x: player.x + player.width / 2,
                y: player.y + player.height,

                vx: (Math.random() - 0.5) * 1.5,
                vy: -1 - Math.random(),

                life: 20,
                size: 4 + Math.random() * 4,

                //rand rotation
                angle: (Math.random() - 0.5) * 0.8,
                rotationSpeed: (Math.random() - 0.5) * 0.15
            };
            grassParticles.push(particle);
        }
    }
}

function updateGrassParticles() {

    for (let i = grassParticles.length - 1; i >= 0; i--) {

        let p = grassParticles[i];

        p.x += p.vx;
        p.y += p.vy;

        //bit of gravity
        p.vy += 0.15;

        p.angle += p.rotationSpeed;

        p.life--;

        if (p.life <= 0) {
            grassParticles.splice(i, 1);
        }
    }
}

function drawGrassParticles(useCamera = true) {

    ctx.strokeStyle = "#35a535";
    ctx.lineWidth = 2;

    for (let p of grassParticles) {

        ctx.save();

        let sx = p.x * MAP_SCALE;
        let sy = p.y * MAP_SCALE;

        if (useCamera) {
            sx -= camera.x;
            sy -= camera.y;
        }

        let ssize = p.size * MAP_SCALE * 0.5;

        ctx.translate(sx, sy);
        ctx.rotate(p.angle);

        ctx.beginPath();
        ctx.moveTo(-2 * MAP_SCALE, 0);
        ctx.lineTo(0, -ssize);
        ctx.lineTo(2 * MAP_SCALE, 0);

        ctx.stroke();

        ctx.restore();
    }

    ctx.lineWidth = 1;
}

//line of sight of npc trainer?
//func collideAggro(){}
