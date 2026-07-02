//canvas and drawing context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


document.getElementById("mypokemon").style.visibility = "hidden";
document.getElementById("encounterpokemon").style.visibility = "hidden";



//load assets here to be used
const trainer = new Image();
trainer.src = "assets/trainers/trainer_sprite.png";

const town = new Image();
town.src = "assets/backgrounds/town.png";

const route = new Image();
route.src = "assets/backgrounds/rt1 long.png";

const cave_entr = new Image();
cave_entr.src = "assets/backgrounds/cave entr.png";

const cave = new Image();
cave.src = "assets/backgrounds/cave.png";

const cave_entr = new Image();
cave_entr.src = "assets/backgrounds/cave entr.png";

const cave = new Image();
cave.src = "assets/backgrounds/cave.png";

const start_image = new Image();
start_image.src = "assets/backgrounds/start.png";

const lab = new Image();
lab.src = "assets/backgrounds/lab.png";

//const battle_grass
const battle_background = new Image();
battle_background.src = "assets/backgrounds/route1_battle_1.png";


const stater_background = new Image();
stater_background.src = "assets/backgrounds/stater.png";

//audio//
const music = {
    townBGM: new Audio("assets/audio/Driftveil City.mp3"),
    routeBGM: new Audio("assets/audio/Route 1.mp3"),
    labBGM: new Audio("assets/audio/Lab Theme.mp3"),
    caveEntrBGM: new Audio("assets/audio/Cave Entr.mp3"),
    caveBGM: new Audio("assets/audio/Cave.mp3"),
    battleBGM: new Audio("assets/audio/Battle.mp3"),
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

const sounds = {
    teamHeal: new Audio("assets/audio/Team Healed.mp3"),

}

function playSound(soundName, volume = 1.0) {
    let sound = sounds[soundName];

    if (!sound)
        return;

    let s = sound.cloneNode();

    s.volume = volume;

    s.play();
}

const pokedex = {
    1: "bulbasaur",
    2: "ivysaur",
    3: "venusaur",
    4: "charmander",
    5: "charmeleon",
    6: "charizard",
    7: "squirtle",
    8: "wartortle",
    9: "blastoise",
    10: "caterpie",
    11: "metapod",
    12: "butterfree",
    13: "weedle",
    14: "kakuna",
    15: "beedrill",
    16: "pidgey",
    17: "pidgeotto",
    18: "pidgeot",
    19: "rattata",
    20: "raticate",
    21: "spearow",
    22: "fearow",
    23: "ekans",
    24: "arbok",
    25: "pikachu",
    26: "raichu",
    27: "sandshrew",
    28: "sandslash",
    29: "nidoranf",
    30: "nidorina",
    31: "nidoqueen",
    32: "nidoranm",
    33: "nidorino",
    34: "nidoking",
    35: "clefairy",
    36: "clefable",
    37: "vulpix",
    38: "ninetales",
    39: "jigglypuff",
    40: "wigglytuff",
    41: "zubat",
    42: "golbat",
    43: "oddish",
    44: "gloom",
    45: "vileplume",
    46: "paras",
    47: "parasect",
    48: "venonat",
    49: "venomoth",
    50: "diglett",
    51: "dugtrio",
    52: "meowth",
    53: "persian",
    54: "psyduck",
    55: "golduck",
    56: "mankey",
    57: "primeape",
    58: "growlithe",
    59: "arcanine",
    60: "poliwag",
    61: "poliwhirl",
    62: "poliwrath",
    63: "abra",
    64: "kadabra",
    65: "alakazam",
    66: "machop",
    67: "machoke",
    68: "machamp",
    69: "bellsprout",
    70: "weepinbell",
    71: "victreebel",
    72: "tentacool",
    73: "tentacruel",
    74: "geodude",
    75: "graveler",
    76: "golem",
    77: "ponyta",
    78: "rapidash",
    79: "slowpoke",
    80: "slowbro",
    81: "magnemite",
    82: "magneton",
    83: "farfetchd",
    84: "doduo",
    85: "dodrio",
    86: "seel",
    87: "dewgong",
    88: "grimer",
    89: "muk",
    90: "shellder",
    91: "cloyster",
    92: "gastly",
    93: "haunter",
    94: "gengar",
    95: "onix",
    96: "drowzee",
    97: "hypno",
    98: "krabby",
    99: "kingler",
    100: "voltorb",
    101: "electrode",
    102: "exeggcute",
    103: "exeggutor",
    104: "cubone",
    105: "marowak",
    106: "hitmonlee",
    107: "hitmonchan",
    108: "lickitung",
    109: "koffing",
    110: "weezing",
    111: "rhyhorn",
    112: "rhydon",
    113: "chansey",
    114: "tangela",
    115: "kangaskhan",
    116: "horsea",
    117: "seadra",
    118: "goldeen",
    119: "seaking",
    120: "staryu",
    121: "starmie",
    122: "mrmime",
    123: "scyther",
    124: "jynx",
    125: "electabuzz",
    126: "magmar",
    127: "pinsir",
    128: "tauros",
    129: "magikarp",
    130: "gyarados",
    131: "lapras",
    132: "ditto",
    133: "eevee",
    134: "vaporeon",
    135: "jolteon",
    136: "flareon",
    137: "porygon",
    138: "omanyte",
    139: "omastar",
    140: "kabuto",
    141: "kabutops",
    142: "aerodactyl",
    143: "snorlax",
    144: "articuno",
    145: "zapdos",
    146: "moltres",
    147: "dratini",
    148: "dragonair",
    149: "dragonite",
    150: "mewtwo",
    151: "mew"
};
