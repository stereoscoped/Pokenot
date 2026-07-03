// ===============================
// SIMPLE CUTSCENE SYSTEM
// ===============================

let cutscene = {
    active: false,
    index: 0,
    script: [],
    waitForInput: true
};

// -------------------------------
// START / END
// -------------------------------

function startCutscene(script) {
    cutscene.active = true;
    cutscene.script = script;
    cutscene.index = 0;

    gameState = CUTSCENE;

    player.canMove = false;
}

function endCutscene() {
    cutscene.active = false;
    cutscene.script = [];
    cutscene.index = 0;

    gameState = OVERWORLD;

    player.canMove = true;
}

// -------------------------------
// EVENT HELPERS
// -------------------------------

function sayLeft(name, portraitObj, expression, text) {
    return {
        type: "dialogue",
        side: "left",
        name,
        portraitObj,
        expression,
        text
    };
}

function sayRight(name, portraitObj, expression, text) {
    return {
        type: "dialogue",
        side: "right",
        name,
        portraitObj,
        expression,
        text
    };
}

function startBattleEvent(enemy) {
    return {
        type: "battle",
        enemy
    };
}

// optional pause
function wait(ms) {
    return {
        type: "wait",
        time: ms,
        startTime: null
    };
}

// -------------------------------
// INPUT HANDLING
// -------------------------------

function handleCutsceneInput() {
    if (!cutscene.active) return;

    if (keys["Enter"]) {
        keys["Enter"] = false;
        nextEvent();
    }
}

// -------------------------------
// EVENT FLOW
// -------------------------------

function nextEvent() {
    if (!cutscene.active) return;

    cutscene.index++;

    if (cutscene.index >= cutscene.script.length) {
        endCutscene();
        return;
    }

    let event = cutscene.script[cutscene.index];

    // auto-handle non-dialogue events
    if (event.type === "battle") {
        endCutscene();
        battleTransition(event.enemy);
        return;
    }

    if (event.type === "wait") {
        setTimeout(() => {
            nextEvent();
        }, event.time);
    }
}

// -------------------------------
// UPDATE LOOP HOOK
// -------------------------------

function updateCutscene() {
    if (!cutscene.active) return;

    let event = cutscene.script[cutscene.index];
    if (!event) return;
}

// -------------------------------
// DRAWING
// -------------------------------

function drawCutscene(ctx) {
    if (!cutscene.active) return;

    let event = cutscene.script[cutscene.index];
    if (!event || event.type !== "dialogue") return;

    drawDialogue(ctx, event);
}

function drawDialogue(ctx, event) {

    // -------------------
    // BOX
    // -------------------
    ctx.fillStyle = "rgba(0,0,0,0.75)";
    ctx.fillRect(20, 320, 760, 150);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 320, 760, 150);

    // -------------------
    // PORTRAITS
    // -------------------

    let leftEvent = cutsceneGetSide("left");
    let rightEvent = cutsceneGetSide("right");

    drawPortrait(ctx, leftEvent, 40, 60, event.side === "left");
    drawPortrait(ctx, rightEvent, 520, 60, event.side === "right");

    // -------------------
    // NAME
    // -------------------
    ctx.fillStyle = "yellow";
    ctx.font = "18px Arial";
    ctx.fillText(event.name, 40, 350);

    // -------------------
    // TEXT
    // -------------------
    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    wrapText(ctx, event.text, 40, 380, 720, 22);

    // continue arrow
    ctx.fillText("▼", 740, 455);
}

// -------------------------------
// PORTRAIT HELPERS
// -------------------------------

function cutsceneGetSide(side) {
    for (let i = cutscene.index; i >= 0; i--) {
        let e = cutscene.script[i];
        if (e.type === "dialogue" && e.side === side) {
            return e;
        }
    }
    return null;
}

function drawPortrait(ctx, event, x, y, isActive) {
    if (!event) return;

    let img = event.portraitObj[event.expression];

    ctx.save();

    // dim inactive speaker
    if (!isActive) {
        ctx.globalAlpha = 0.4;
    } else {
        ctx.globalAlpha = 1.0;
    }

    ctx.drawImage(img, x, y);

    ctx.restore();
}

// -------------------------------
// TEXT WRAPPING
// -------------------------------

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    let words = text.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + " ";
        let width = ctx.measureText(testLine).width;

        if (width > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + " ";
            y += lineHeight;
        } else {
            line = testLine;
        }
    }

    ctx.fillText(line, x, y);
}

// -------------------------------
// MAIN HOOKS (CALL THESE)
// -------------------------------

function updateCutsceneSystem() {
    handleCutsceneInput();
    updateCutscene();
}

function drawCutsceneSystem(ctx) {
    drawCutscene(ctx);
}