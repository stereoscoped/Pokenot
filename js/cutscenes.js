const portraits = {

    scientist: {

        angry: {
            sheet: portraitSheet,
            x: 290,
            y: 30,
            w: 290,
            h: 440
        },

        smug: {
            sheet: portraitSheet,
            x: 720,
            y: 30,
            w: 290,
            h: 440
        }
    },

    trainer: {

        angry: {
            sheet: portraitSheet,
            x: 290,
            y: 545,
            w: 290,
            h: 420
        },

        smug: {
            sheet: portraitSheet,
            x: 720,
            y: 545,
            w: 290,
            h: 420
        }
    }

};

const bossBattle = [

    sayLeft(
        "Scientist",
        portraits.scientist,
        "smug",
        "So you finally made it through my lab..."
    ),

    sayRight(
        "Trainer",
        portraits.trainer,
        "angry",
        "I’m shutting your experiments down."
    ),

    sayLeft(
        "Scientist",
        portraits.scientist,
        "smug",
        "Heh... heroic words. I expected that."
    ),

    sayLeft(
        "Scientist",
        portraits.scientist,
        "angry",
        "But you're standing in something far above your understanding."
    ),

    sayRight(
        "Trainer",
        portraits.trainer,
        "smug",
        "Then I guess I’ll just have to learn fast."
    ),

    sayLeft(
        "Scientist",
        portraits.scientist,
        "angry",
        "Tch… confidence without data is still ignorance."
    ),

    startBattleEvent(scientistBoss)

];