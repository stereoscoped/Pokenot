let grassParticles = [];
const MAX_GRASS_PARTICLES = 100;

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

//grass encounter
function collideGrass() {
    let playerBox =
    {
        x: player.x,
        y: player.y,
        w: player.width,
        h: player.height
    };

    for (let patch of grass) {
        if (collides(playerBox, patch)) {
            if (Math.random() < 0.2) {
                spawnGrassParticles();
            }
            if (Math.random() < 0.005) {
                battleTransition();
            }
        }
    }
}

function spawnGrassParticles() {

    if (grassParticles.length > MAX_GRASS_PARTICLES) {
        return;
    }

    for (let i = 0; i < 4; i++) {

        let particle =
        {
            x: player.x + player.width / 2,
            y: player.y + player.height,

            vx: (Math.random() - 0.5) * 1.5,
            vy: -1 - Math.random(),

            life: 20,
            size: 4 + Math.random() * 3,

            //rand rotation
            angle: (Math.random() - 0.5) * 0.8,       // Initial angle (≈ ±45°)
            rotationSpeed: (Math.random() - 0.5) * 0.15
        };

        //throw grass depending on player movement?
        switch (player.direction) {

            // case "up":
            //     particle.vy = 1 + Math.random();
            //     break;

            // case "down":
            //     particle.vy = -1 - Math.random();
            //     break;

            // case "left":
            //     particle.vx = 1 + Math.random();
            //     break;

            // case "right":
            //     particle.vx = -1 - Math.random();
            //     break;
        }

        grassParticles.push(particle);
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

function drawGrassParticles() {

    ctx.strokeStyle = "#3f8f3f";
    ctx.lineWidth = 2;

    for (let p of grassParticles) {

    ctx.save();

    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);

    ctx.beginPath();

    ctx.moveTo(-2, 0);
    ctx.lineTo(0, -p.size);
    ctx.lineTo(2, 0);

    ctx.stroke();

    ctx.restore();
    }

    ctx.lineWidth = 1;
}

//line of sight of npc trainer?
//func collideAggro(){}
