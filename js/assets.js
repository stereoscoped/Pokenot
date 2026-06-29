//canvas and drawing context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//load assets here to be used
const trainer = new Image();
trainer.src = "assets/trainers/trainer_sprite.png";

const town = new Image();
town.src = "assets/backgrounds/town.jpg";

const route = new Image();
route.src = "assets/backgrounds/rt1 long.jpg";

//const gym

//const battle_grass



//audio//
const music = {
    town: new Audio("assets/audio/Driftveil City.mp3"),
    route: new Audio("assets/audio/Route 1.mp3"),
    battle: new Audio("assets/audio/Battle.mp3"),
    // victory: new Audio("assets/audio/victory.mp3")
}

for (let song in music) {
    music[song].loop = true;
}

let currentSong = null;

function playMusic(song) {
    if (currentSong === music[song])
        return;

    if (currentSong)
        currentSong.pause();

    currentSong = music[song];

    currentSong.currentTime = 0;
    currentSong.play();
}