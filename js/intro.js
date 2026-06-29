// intro scenes
const TITLE = "title";
const PROFESSOR = "professor";
const NAME_ENTRY = "name_entry";
const STARTER = "starter";

let introScene = TITLE;

// title fade
let titleAlpha = 0;
const FADE_IN_SPEED = 0.008;
let titleDone = false;

function updateIntro() {
    switch (introScene) {
        case TITLE:
            updateTitle();
            break;
    }
}

function drawIntro() {
    switch (introScene) {
        case TITLE:
            drawTitle();
            break;
    }
}

function updateTitle() {
    if (!titleDone) {
        titleAlpha += FADE_IN_SPEED;
        if (titleAlpha >= 1) {
            titleAlpha = 1;
            titleDone = true;
        }
    }

    // press enter to continue once faded in
    if (titleDone && keys["enter"]) {
        introScene = PROFESSOR;
    }
}

function drawTitle() {
    // black background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // title text
    ctx.globalAlpha = titleAlpha;
    ctx.fillStyle = "white";
    ctx.font = "bold 64px serif";
    ctx.textAlign = "center";
    ctx.fillText("Pokenot", canvas.width / 2, canvas.height / 2);

    // prompt
    if (titleDone) {
        ctx.font = "18px serif";
        ctx.fillText("Press Enter to continue", canvas.width / 2, canvas.height / 2 + 60);
    }

    ctx.globalAlpha = 1;
    ctx.textAlign = "left";
}