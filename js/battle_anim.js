let playerBattle = {
    //canvas destination position (X is controlled by battleIntro.trainerX)
    canvasX: 900,
    canvasY: 250,

    srcXStart: 110, 
    srcY: 210,      

    width: 70,     
    height: 117,    

    drawWidth: 250, // size on canvas
    drawHeight: 400,

    frame: 0
};

// small helpers
function lerp(a, b, t) {
    return a + (b - a) * t;
}

function clamp(x, min, max) {
    return Math.max(min, Math.min(max, x));
}

function drawBattleTrainer() {

    if (!battleIntro.active)
        return;

    // Use playerBattle frame/dimensions for battle trainer drawing
    let srcX = playerBattle.srcXStart + playerBattle.frame * playerBattle.width;
    let srcY = playerBattle.srcY;

    let destX = Math.round(battleIntro.trainerX);
    let destY = playerBattle.canvasY;

    ctx.drawImage(
        trainer,
        srcX,
        srcY,
        playerBattle.width,
        playerBattle.height,
        destX,
        destY,
        playerBattle.drawWidth,
        playerBattle.drawHeight
    );

}

let battleIntro = {
    active: true,

    timer: 0,

    fade: 1,

    trainerX: 900,

    enemyX: -200,

    playerAlpha: 0,
    playerWhite: true
};

function startBattleIntro() {

    battleIntro.active = true;

    battleIntro.timer = 0;

    battleIntro.fade = 1;

    battleIntro.enemyX = -200;
    battleIntro.trainerX = 100;

    battleIntro.playerAlpha = 0;
    battleIntro.playerWhite = true;

    playerBattle.frame = 0;
}

function updateBattleIntro() {
    battleIntro.timer++;

    let t = battleIntro.timer;

    //bg fade in: 0-20 frames -> 20 frames duration
    battleIntro.fade = Math.min(Math.max(1 - t / 20, 0), 1);

    //wild enter 10-40 frames -> 30 frames duration
    let tWild = Math.min(Math.max((t - 10) / 30, 0), 1);
    battleIntro.enemyX = lerp(-200, 620, tWild);

    //trainer enter 25-55 frames -> 30 frames
    let tTrainerIn = Math.min(Math.max((t - 25) / 30, 0), 1);
    battleIntro.trainerX = lerp(900, 50, tTrainerIn);
    playerBattle.frame = 0;

    //trainer throw anim: 55-75 frames -> subdivide into frames
    if (t >= 55 && t < 62) {
        playerBattle.frame = 0;
    } else if (t >= 62 && t < 67) {
        playerBattle.frame = 1;
    } else if (t >= 67 && t < 75) {
        playerBattle.frame = 2;
    }

    //sprite alignment
    // if (t >= 55) {
    //     switch (Math.floor((t - 55) / 20) % 3) {
    //         case 0:
    //             playerBattle.frame = 0;
    //             break;

    //         case 1:
    //             playerBattle.frame = 1;
    //             break;

    //         case 2:
    //             playerBattle.frame = 2;
    //             break;
    //     }
    // }

    //trainer exit: 75-95 frames -> 20 frames duration
    let tTrainerOut = Math.min(Math.max((t - 75) / 20, 0), 1);
    if (t >= 75) {
        battleIntro.trainerX = lerp(50, -500, tTrainerOut);
    }

    //player pokedoo silhouette appears: 75-95 frames -> 20 frames duration
    if (t >= 75 && t < 95) {
        battleIntro.playerAlpha = 1;
        battleIntro.playerWhite = true;
    }

    //player fades: 95-110 frames -> 15 frames
    if (t >= 95) {
        battleIntro.playerWhite = false;
        battleIntro.playerAlpha = Math.min(Math.max((t - 95) / 15, 0), 1);
    }

    // End intro at frame 110
    if (t >= 110) {
        endBattleIntro();
    }

}

function endBattleIntro() {

    battleIntro.active = false;

    battleIntro.playerAlpha = 1;
    battleIntro.playerWhite = false;
    playerBattle.frame = 0;
} 
