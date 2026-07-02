const INTRO = "intro";

const oak = new Image();
oak.src = "assets/trainers/oak.png";


const STARTER_NAMES = ["bulbasaur", "charmander", "squirtle"];

const starterSprites = {};

for (let name of STARTER_NAMES) {
    starterSprites[name] = new Image();
    starterSprites[name].src = "assets/pokemon_front_sprites/" + name + ".gif";
}


const introDialogue = [
    "Hello there! Welcome to the world of POKEMON!",
    "My name is OAK! People call me the POKEMON PROFESSOR!",
    "This world is inhabited by creatures called POKEMON!",
    "Your very own POKEMON legend is about to unfold!",
    "Now... it's time to choose your very first partner!"
];


let introPhase = "fadeOutTitle";
let introTimer = 0;
let introTicker = 0;
let introFade = 0;

let dialogueIndex = 0;
let selectedStarter = 1;
let chosenStarter = null;

const INTRO_FADE_TIME = 60; 

let introKeyLatch = {};

function introKeyPressed(k) {
    if (keys[k]) {
        if (!introKeyLatch[k]) {
            introKeyLatch[k] = true;
            return true;
        }
        return false;
    }

    introKeyLatch[k] = false;
    return false;
}

function introAdvancePressed() {
    let a = introKeyPressed(" ");
    let b = introKeyPressed("enter");
    return a || b;
}

function startIntro() {
    gameState = INTRO;

    introPhase = "fadeOutTitle";
    introTimer = 0;
    introFade = 0;

    dialogueIndex = 0;
    selectedStarter = 1;
    chosenStarter = null;

    introKeyLatch[" "] = true;
    introKeyLatch["enter"] = true;
}

function giveStarter(name) {
    playerTeam.length = 0;

    let starter = pokeDex.find(
        p => p.name && p.name.toLowerCase() === name
    );

    if (starter) {
        addPokemonToPlayerTeam(structuredClone(starter));
        console.log("starter chosen:", name, playerTeam);
    }
    else {
        console.error("starter '" + name + "' not found in pokeDex!");
    }
}

function updateIntro() {
    introTicker++;

    switch (introPhase) {
        case "fadeOutTitle":
            introTimer++;
            introFade = introTimer / INTRO_FADE_TIME;

            if (introTimer >= INTRO_FADE_TIME) {
                introPhase = "oakFadeIn";
                introTimer = 0;
                playMusic("labBGM");
            }
            break;

        case "oakFadeIn":
            introTimer++;
            introFade = 1 - introTimer / INTRO_FADE_TIME;

            if (introTimer >= INTRO_FADE_TIME) {
                introFade = 0;
                introPhase = "dialogue";
            }
            break;

        case "dialogue":
            if (introAdvancePressed()) {
                dialogueIndex++;

                if (dialogueIndex >= introDialogue.length) {
                    introPhase = "choose";
                }
            }
            break;

        case "choose":
            if (introKeyPressed("arrowleft") || introKeyPressed("a")) {
                selectedStarter--;

                if (selectedStarter < 0)
                    selectedStarter = STARTER_NAMES.length - 1;
            }

            if (introKeyPressed("arrowright") || introKeyPressed("d")) {
                selectedStarter++;
                selectedStarter %= STARTER_NAMES.length;
            }

            if (introAdvancePressed()) {
                chosenStarter = STARTER_NAMES[selectedStarter];
                giveStarter(chosenStarter);
                introPhase = "confirm";
            }
            break;

        case "confirm":
            if (introAdvancePressed()) {
                introPhase = "fadeToGame";
                introTimer = 0;
            }
            break;

        case "fadeToGame":
            introTimer++;
            introFade = introTimer / INTRO_FADE_TIME;

            if (introTimer >= INTRO_FADE_TIME) {
                gameState = OVERWORLD;
                playMusic(currentMap.music);
            }
            break;
    }
}

function drawIntro() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (introPhase === "fadeOutTitle") {
        ctx.drawImage(start_image, 0, 0, canvas.width, canvas.height);
        drawIntroFade();
        return;
    }

    ctx.drawImage(lab, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (introPhase === "oakFadeIn" || introPhase === "dialogue") {
        drawOak();

        let line = introDialogue[
            Math.min(dialogueIndex, introDialogue.length - 1)
        ];

        drawIntroTextBox(line, introPhase === "dialogue");
    }
    else if (introPhase === "choose") {
        drawStarterChoices();
        drawIntroTextBox("Choose your first POKEMON!", false);
    }
    else if (introPhase === "confirm" || introPhase === "fadeToGame") {
        drawStarterChoices();
        drawIntroTextBox(
            chosenStarter.toUpperCase() +
            "! A fine choice! Take good care of it!",
            introPhase === "confirm"
        );
    }

    drawIntroFade();
}

function drawIntroFade() {
    if (introFade <= 0)
        return;

    ctx.fillStyle = "rgba(0,0,0," + Math.min(introFade, 1) + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawOak() {
    let w = 190;
    let h = 250;
    let x = canvas.width / 2 - w / 2;
    let y = 150;

    if (oak.complete && oak.naturalWidth > 0) {
        w = h * (oak.naturalWidth / oak.naturalHeight);
        x = canvas.width / 2 - w / 2;

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(oak, x, y, w, h);
    }
    else {
        ctx.fillStyle = "#e8e8e8";
        ctx.fillRect(x, y, w, h);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, w, h);

        ctx.fillStyle = "black";
        ctx.font = "14px 'Press Start 2P'";
        ctx.fillText("PROF. OAK", x + 20, y + h / 2);
    }
}

function drawStarterChoices() {
    let cardW = 190;
    let cardH = 230;
    let gap = 40;

    let totalW = STARTER_NAMES.length * cardW + (STARTER_NAMES.length - 1) * gap;
    let startX = (canvas.width - totalW) / 2;
    let y = 120;

    ctx.font = "14px 'Press Start 2P'";

    for (let i = 0; i < STARTER_NAMES.length; i++) {
        let name = STARTER_NAMES[i];
        let x = startX + i * (cardW + gap);

        let isSelected =
            (introPhase === "choose" && i === selectedStarter) ||
            (introPhase !== "choose" && name === chosenStarter);

        let bounce = isSelected
            ? Math.sin(introTicker * 0.15) * 5
            : 0;

        ctx.fillStyle = isSelected ? "#FEFCE1" : "rgba(255,255,255,0.75)";
        ctx.strokeStyle = isSelected ? "gold" : "black";
        ctx.lineWidth = isSelected ? 6 : 3;

        ctx.beginPath();
        ctx.roundRect(x, y + bounce, cardW, cardH, 16);
        ctx.fill();
        ctx.stroke();

        let img = starterSprites[name];

        if (img && img.complete && img.naturalWidth > 0) {
            ctx.imageSmoothingEnabled = false;

            let size = 130;
            ctx.drawImage(
                img,
                x + cardW / 2 - size / 2,
                y + bounce + 25,
                size,
                size
            );
        }
        else {
            ctx.fillStyle = "#cccccc";
            ctx.fillRect(x + 30, y + bounce + 25, cardW - 60, 130);
        }


        ctx.fillStyle = "black";
        let label = name.toUpperCase();
        let labelW = ctx.measureText(label).width;
        ctx.fillText(label, x + cardW / 2 - labelW / 2, y + bounce + cardH - 25);

        if (isSelected && introPhase === "choose") {
            ctx.fillStyle = "gold";
            ctx.beginPath();
            ctx.moveTo(x + cardW / 2, y + bounce - 12);
            ctx.lineTo(x + cardW / 2 - 12, y + bounce - 32);
            ctx.lineTo(x + cardW / 2 + 12, y + bounce - 32);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
    }
}

function drawIntroTextBox(text, showArrow) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 450, canvas.width, 150);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 450, canvas.width, 150);

    ctx.fillStyle = "#19345A";
    ctx.fillRect(10, 460, canvas.width - 20, 130);

    ctx.fillStyle = "white";
    ctx.font = "18px 'Press Start 2P'";
    drawWrappedBattleMessage(text, 45, 500, canvas.width - 120, 28);

    if (showArrow && Math.floor(introTicker / 30) % 2 === 0) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.moveTo(canvas.width - 55, 560);
        ctx.lineTo(canvas.width - 35, 560);
        ctx.lineTo(canvas.width - 45, 575);
        ctx.closePath();
        ctx.fill();
    }
}