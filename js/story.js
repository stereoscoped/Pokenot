
const npcSprites = {};

function loadNpcSprite(file) {
    if (!npcSprites[file]) {
        npcSprites[file] = new Image();
        npcSprites[file].src = "assets/trainers/" + file;
    }
    return npcSprites[file];
}

const npcs = [
    {
        id: "kid",
        name: "Town Kid",
        map: "town",
        x: 200, y: 45,
        sprite: "npc_kid.png",
        color: "#e6c84a",
        trigger: { x: 194, y: 39, w: 31, h: 35 },
        team: null,
        before: [
            "You're going north? My dad says the gym leader up there healed his whole team once... then vanished into the dark.",
            "Nobody in town has ever seen the gym leader's face. Not once. Not ever."
        ],
        after: null
    },
    {
        id: "ben1",
        name: "Ben",
        map: "route1",
        x: 160, y: 448,
        sprite: "npc_ben.png",
        color: "#4a90e6",
        trigger: { x: 130, y: 442, w: 76, h: 24 },
        team: "RIVAL1",
        before: [
            "Hey! You got a starter from the old man too?",
            "Then you know the rules -- trainers who lock eyes have to battle!"
        ],
        after: [
            "Ugh! Whatever.",
            "The old man said the gym leader fights like a professor... weird thing to say, right?"
        ]
    },
    {
        id: "nick",
        name: "Bug Catcher Nick",
        map: "route1",
        x: 215, y: 330,
        sprite: "npc_nick.png",
        color: "#7bc85a",
        trigger: { x: 207, y: 322, w: 35, h: 38 },
        team: ["caterpie", "weedle"],
        before: [
            "I like shorts! They're comfy and easy to wear!",
            "Also -- battle!"
        ],
        after: [
            "Aw man. Hey, listen -- my bug pokemon refuse to go near that cave.",
            "Something strong is sleeping down there."
        ]
    },
    {
        id: "joe",
        name: "Trainer Joe",
        map: "route1",
        x: 110, y: 180,
        sprite: "npc_joe.png",
        color: "#c85a5a",
        trigger: { x: 102, y: 172, w: 35, h: 38 },
        team: ["pidgey", "rattata"],
        before: [
            "A new trainer? Out here? You'll battle me or you'll turn around!"
        ],
        after: [
            "Hmph. You fight like someone taught you.",
            "Funny... the gym leader supposedly trains students too."
        ]
    },
    {
        id: "krishna",
        name: "Hiker Krishna",
        map: "caveEntr",
        x: 150, y: 460,
        sprite: "npc_krishna.png",
        color: "#b8865a",
        trigger: { x: 120, y: 452, w: 90, h: 30 },   //guards the corridor
        team: ["geodude", "onix"],
        before: [
            "Hold it! Nobody enters until they've beaten me. Gym leader's orders!"
        ],
        after: [
            "Fine, go on. But know this -- some nights the cave glows purple.",
            "And I swear I've heard an old man humming down there."
        ]
    },
    {
        id: "ben2",
        name: "Ben",
        map: "caveEntr",
        x: 150, y: 250,
        sprite: "npc_ben.png",
        color: "#4a90e6",
        trigger: { x: 136, y: 242, w: 46, h: 30 },   //blocks the corridor
        team: "RIVAL2",
        before: [
            "You again? I just got thrown out of the cave...",
            "The gym leader said, and I quote, 'you're not ready, young man.'",
            "Young man?! Who talks like that?!"
        ],
        after: [
            "Fine! Fine! Go lose to the gym leader yourself!",
            "...beat them for both of us, okay?"
        ]
    },
    {
        id: "matthew",
        name: "Channeler Matthew",
        map: "cave",
        x: 152, y: 330,
        sprite: "npc_matthew.png",
        color: "#9a6ac8",
        trigger: { x: 130, y: 322, w: 60, h: 30 }, 
        team: ["zubat", "gastly"],
        before: [
            "The spirits whisper of the one below... a mind older than the mountain...",
            "...and a man who visits it with groceries?? The spirits are confused.",
            "Battle me!"
        ],
        after: [
            "The spirits say the gym leader and the pokemon below are... friends.",
            "Old friends."
        ]
    },
    {
        id: "boss",
        name: "???",
        map: "cave",
        x: 150, y: 210,
        sprite: "npc_gymleader.png",
        color: "#3a3a4a",
        trigger: { x: 90, y: 200, w: 140, h: 26 },
        team: "BOSS",
        isBoss: true,
        before: [
            "So. You made it. Past Ben, past the others... just as I planned.",
            "Yes -- it's me, Oak! Surprised?",
            "There was never a hidden gym leader. There was only ever a test. My test.",
            "The starters nobody chose? I raised them myself.",
            "I gave you your partner. Now show me what you've become together!",
            "But be warned -- my research partner down here doesn't hold back. Mewtwo, your turn!"
        ],
        after: null
    }
];

const RANDOM_TRAINER_CHANCE = 0.15;

const randomTrainerPools = {
    route1: [
        { name: "Youngster", line: "My rattata is in the top percentage of rattata!", team: ["rattata"] },
        { name: "Picnicker", line: "I lost my sandwich in that cave and I'm not going back.", team: ["oddish"] }
    ],
    caveEntr: [
        { name: "Super Nerd", line: "My magnemite is drawn to whatever is down there. Battle first!", team: ["magnemite"] },
        { name: "Fisherman", line: "I got lost looking for water. Battle me while I cry.", team: ["magikarp"] }
    ],
    cave: [
        { name: "Super Nerd", line: "My magnemite is drawn to whatever is down there. Battle first!", team: ["magnemite"] },
        { name: "Fisherman", line: "I got lost looking for water. Battle me while I cry.", team: ["magikarp"] }
    ]
};


let dlgPages = [];
let dlgIndex = 0;
let dlgSpeaker = "";
let dlgAfterAction = null;

let activeTrainer = null;
let trainerTeam = [];
let trainerTeamIndex = 0;

const WIN_LINES = [
    "Oak smiles wider than you've ever seen.",
    "'A new champion. I knew it the day you walked into my lab.'",
    "The end?",
    "",
    "press space to play again"
];

const LOSE_LINES = [
    "Oak catches your pokemon before it hits the ground.",
    "'Not yet. But soon.'",
    "",
    "press space to wake up in the lab"
];

function pokeByName(name) {
    let p = pokedex.find(
        entry => entry.name && entry.name.toLowerCase() === name
    );

    if (!p) {
        console.error("story.js: '" + name + "' not found in pokedex!");
        return null;
    }

    return structuredClone(p);
}


const rivalCounter = {
    bulbasaur: "charmander",
    charmander: "squirtle",
    squirtle: "bulbasaur"
};

const finalEvo = {
    bulbasaur: "venusaur",
    charmander: "charizard",
    squirtle: "blastoise"
};

function buildTrainerTeam(teamSpec) {
    let names = [];

    if (teamSpec === "RIVAL1") {
        names = [rivalCounter[chosenStarter]];
    }
    else if (teamSpec === "RIVAL2") {
        names = [rivalCounter[chosenStarter], "pidgeotto"];
    }
    else if (teamSpec === "BOSS") {
        for (let starter of STARTER_NAMES) {
            if (starter !== chosenStarter)
                names.push(finalEvo[starter]);
        }
        names.push("mewtwo");
    }
    else {
        names = teamSpec;
    }

    return names.map(pokeByName).filter(p => p !== null);
}

function startDialogue(speaker, pages, afterAction) {
    gameState = DIALOGUE;

    dlgSpeaker = speaker;
    dlgPages = pages;
    dlgIndex = 0;
    dlgAfterAction = afterAction || null;

    introKeyLatch[" "] = true;
    introKeyLatch["enter"] = true;
}

function updateDialogue() {
    introTicker++;

    if (introAdvancePressed()) {
        dlgIndex++;

        if (dlgIndex >= dlgPages.length) {
            let action = dlgAfterAction;
            dlgAfterAction = null;

            if (action) {
                action();
            }
            else {
                gameState = OVERWORLD;
            }
        }
    }
}

function drawDialogue() {
    drawOverworld();

    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (dlgSpeaker) {
        ctx.fillStyle = "#FEFCE1";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(10, 410, 260, 40, [12, 12, 0, 0]);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.font = "14px 'Press Start 2P'";
        ctx.fillText(dlgSpeaker, 25, 436);
    }

    drawIntroTextBox(
        dlgPages[Math.min(dlgIndex, dlgPages.length - 1)],
        true
    );
}

function updateNpcs() {
    for (let npc of npcs) {
        if (npc.map !== currentMap.name.toLowerCase() &&
            npc.map !== currentMap.name)
            continue;

        let touching =
            playerBox &&
            typeof playerBox.x !== "undefined" &&
            collides(playerBox, npc.trigger);

        if (touching && !npc.wasTouching) {
            npc.wasTouching = true;
            touchNpc(npc);
            return;
        }

        npc.wasTouching = touching;
    }
}

function touchNpc(npc) {
    if (npc.defeated) {
        startDialogue(npc.name, ["..."], null);
        return;
    }

    if (!npc.team) {
        startDialogue(npc.name, npc.before, null);
        return;
    }

    startDialogue(npc.name, npc.before, function () {
        startTrainerBattle(npc);
    });
}


function drawNpcs() {
    for (let npc of npcs) {
        if (npc.map !== currentMap.name.toLowerCase() &&
            npc.map !== currentMap.name)
            continue;

        let w = 25 * PLAYER_SCALE * MAP_SCALE;
        let h = 30 * PLAYER_SCALE * MAP_SCALE;

        let drawX = npc.x * MAP_SCALE - camera.x - w / 2;
        let drawY = npc.y * MAP_SCALE - camera.y - h;

        ctx.fillStyle = "rgba(0,0,0,0.25)";
        ctx.beginPath();
        ctx.ellipse(
            drawX + w / 2,
            drawY + h,
            10, 4, 0, 0, Math.PI * 2
        );
        ctx.fill();

        let img = loadNpcSprite(npc.sprite);

        if (img.complete && img.naturalWidth > 0) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img, drawX, drawY, w, h);
        }
        else {

            ctx.fillStyle = npc.color;
            ctx.fillRect(drawX, drawY, w, h);

            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.strokeRect(drawX, drawY, w, h);

            ctx.fillStyle = "black";
            ctx.font = "12px 'Press Start 2P'";
            ctx.fillText(npc.name.charAt(0), drawX + w / 3, drawY + h / 1.6);
        }
    }
}


function startTrainerBattle(npc) {
    activeTrainer = npc;
    trainerTeam = buildTrainerTeam(npc.team);
    trainerTeamIndex = 0;

    if (trainerTeam.length === 0) {
        //database missing the pokemon 
        console.error("story.js: trainer team empty, skipping battle");
        activeTrainer = null;
        gameState = OVERWORLD;
        return;
    }

    battleTransition();
}


function storyGrassBattle() {
    let pool = randomTrainerPools[currentMap.name.toLowerCase()] ||
        randomTrainerPools[currentMap.name];

    if (pool && Math.random() < RANDOM_TRAINER_CHANCE) {
        let pick = pool[Math.floor(Math.random() * pool.length)];

        let trainer = {
            name: pick.name,
            team: pick.team,
            after: null,
            random: true
        };

        startDialogue(pick.name, [pick.line], function () {
            startTrainerBattle(trainer);
        });
        return;
    }

    battleTransition();
}

function storySetupBattle() {
    if (!activeTrainer)
        return false;

    enemyPokemon = trainerTeam[trainerTeamIndex];

    let enemySprite = document.getElementById("encounterpokemon");
    enemySprite.src = "assets/pokemon_front_sprites/" + enemyPokemon.name + ".gif";

    battleMessage = activeTrainer.name + " sent out " + introCapitalize(enemyPokemon.name) + "!";

    return true;
}


function storyEnemyFainted() {
    if (!activeTrainer)
        return false;

    trainerTeamIndex++;

    if (trainerTeamIndex >= trainerTeam.length)
        return false;

    enemyPokemon = trainerTeam[trainerTeamIndex];

    let enemySprite = document.getElementById("encounterpokemon");
    enemySprite.src = "assets/pokemon_front_sprites/" + enemyPokemon.name + ".gif";

    battleMessage = activeTrainer.name + " sent out " + introCapitalize(enemyPokemon.name) + "!";

    return true;
}

function storyHandleBattleEnd() {
    if (!activeTrainer)
        return false;

    let playerLost = playerPokemon.hp <= 0;
    let trainerBeaten = trainerTeamIndex >= trainerTeam.length;

    if (!playerLost && !trainerBeaten) {
        battleMessage = "No! There's no running from a trainer battle!";
        battleMenu = "main";
        selectedBattleOption = 0;
        return true;
    }

    let trainer = activeTrainer;
    activeTrainer = null;

    document.getElementById("mypokemon").style.visibility = "hidden";
    document.getElementById("encounterpokemon").style.visibility = "hidden";

    if (trainer.isBoss) {
        if (playerLost) {
            gameState = LOSE;
        }
        else {
            trainer.defeated = true;
            gameState = WIN;
        }

        if (currentSong)
            currentSong.pause();

        introKeyLatch[" "] = true;
        return true;
    }

    if (playerLost) {
        startDialogue("", [
            "You blacked out!",
            "...",
            "You wake up back at the lab, your team fully healed."
        ], function () {
            healParty();
            loadMap("lab", "door");
            gameState = OVERWORLD;
        });
        return true;
    }

    trainer.defeated = true;
    playMusic(currentMap.music);

    if (trainer.after) {
        startDialogue(trainer.name, trainer.after, null);
    }
    else {
        gameState = OVERWORLD;
    }

    return true;
}

function updateEnding() {
    introTicker++;

    if (introKeyPressed(" ")) {
        if (gameState === WIN) {
            window.location.reload();
        }
        else {
            healParty();
            loadMap("lab", "door");
            gameState = OVERWORLD;
        }
    }
}

function drawEnding(lines) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "16px 'Press Start 2P'";

    let y = 200;

    for (let line of lines) {
        let w = ctx.measureText(line).width;
        ctx.fillText(line, canvas.width / 2 - w / 2, y);
        y += 44;
    }
}