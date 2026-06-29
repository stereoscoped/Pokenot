//basically list game states here
const MENU = "menu";
const OVERWORLD = "overworld";
const BATTLE_START = "battle_start";
const BATTLE = "battle";
const GYM = "gym";
const WIN = "win";
const LOSE = "lose";

let gameState = OVERWORLD;
playMusic(currentMap.music);