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
            if (Math.random() < 0.02) {
                battleTransition();
            }
        }
    }
}

//line of sight of npc trainer?
//func collideAggro(){}
