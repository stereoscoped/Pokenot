const portraits = {

    scientist: {
        angry: scientistAngry,
        smug: scientistSmug
    },

    trainer: {
        angry: trainerAngry,
        smug: trainerSmug
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