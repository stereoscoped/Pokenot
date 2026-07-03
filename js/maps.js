const labMap = {
    name: "lab",

    image: lab,

    music: "labBGM",

    width: 320,
    height: 277,
    walls: [
        //back wall
        { x: 0, y: 0, w: 1000, h: 35 },
        { x: 0, y: 0, w: 100, h: 55 },
        { x: 125, y: 0, w: 65, h: 65 },
        { x: 193, y: 0, w: 10, h: 53 },
        { x: 235, y: 0, w: 1000, h: 55 },

        //left wall
        { x: 15, y: 90, w: 75, h: 60 },
        { x: 0, y: 125, w: 20, h: 25 },
        { x: 90, y: 130, w: 15, h: 15 },
        { x: 0, y: 175, w: 90, h: 55 },
        { x: 0, y: 175, w: 20, h: 550 },

        //close wall
        { x: 0, y: 255, w: 120, h: 55 },
        { x: 115, y: 225, w: 15, h: 55 },
        { x: 188, y: 225, w: 15, h: 55 },
        { x: 200, y: 255, w: 100, h: 55 },

        //right
        { x: 220, y: 206, w: 100, h: 55 },
        { x: 215, y: 140, w: 85, h: 55 },
        { x: 300, y: 125, w: 65, h: 30 },
        { x: 202, y: 160, w: 15, h: 15 },
    ],

    ledges: [],

    grass: [],

    healZones: [
        { x: 240, y: 50, w: 50, h: 25 },
    ],
    battle: [],

    exits: [
        {
            x: 137,
            y: 275,
            w: 50,
            h: 30,

            destination: "town",
            entrance: "lab"
        },
    ],

    spawnPoints: {
        door:
            {
                x: 150,
                y: 250,

                direction: "up"
            }
    }
};

const townMap = {
    name: "Town",

    image: town,

    music: "townBGM",

    width: 320,
    height: 280,

    walls: [
        // =========================
        // HOUSES - keep these
        // =========================
        // top-left house
        { x: 65, y: 50, w: 65, h: 40 },

        // top-right house
        { x: 195, y: 50, w: 65, h: 40 },

        // big building / gym / lab
        { x: 162, y: 119, w: 98, h: 63 },

        // =========================
        // OUTER STONE BOUNDS
        // tight to the stone edges
        // =========================

        // left stone border
        { x: 0, y: 0, w: 16, h: 280 },

        // right stone border
        { x: 310, y: 0, w: 16, h: 280 },

        // top-left stone row, leaves exit open
        { x: 0, y: 0, w: 150, h: 30 },

        // top-right stone row, leaves exit open
        { x: 198, y: 0, w: 122, h: 30 },

        // bottom stone row
        { x: 132, y: 257, w: 172, h: 23 },

        // bottom-left stones
        { x: 0, y: 255, w: 40, h: 25 },


        // =========================
        // SIGNS
        // small boxes only
        // =========================

        // sign beside left house
        { x: 50, y: 78, w: 13, h: 12 },

        // sign beside right house
        { x: 179, y: 78, w: 13, h: 12 },


        // =========================
        // FENCES / LEDGES
        // flowers below remain walkable
        // =========================

        // left flower garden fence + sign
        { x: 68, y: 136, w: 60, h: 13 },

        // right flower garden fence + sign
        { x: 162, y: 198, w: 96, h: 13 },


        // =========================
        // WATER / POND
        // includes wooden edge
        // =========================
        { x: 63, y: 210, w: 67, h: 70 },
    ],

    ledges: [],

    grass: [],

    healZones: [],
    battle: [],

    exits: [
        {
            x: 155,
            y: 0,
            w: 40,
            h: 20,

            destination: "route1",
            entrance: "south"
        },
        {
            x: 197,
            y: 175,
            w: 13,
            h: 10,

            destination: "lab",
            entrance: "door"
        }
    ],

    spawnPoints: {
        north:
            {
                x: 175,
                y: 30,

                direction: "down"
            },
        lab:
            {
                x: 195,
                y: 175,

                direction: "down"
            }
    }
};


const route1Map = {
    name: "Route1",

    image: route,

    music: "routeBGM",

    width: 320,
    height: 576,
    walls: [
        // DO NOT CHANGE THESE
        // left wall
        { x: 0, y: 0, w: 70, h: 600 },

        // right wall
        { x: 285, y: 0, w: 70, h: 600 },


        // =========================
        // TOP STONE ROWS
        // =========================
        { x: 76, y: 22, w: 82, h: 12 },
        { x: 198, y: 22, w: 78, h: 12 },


        // =========================
        // TREE / BUSH HITBOXES
        // small body/trunk area only
        // =========================

        // vertical tree line beside top grass
        // ends before x = 160 so it does NOT block your grass patch
        { x: 148, y: 65, w: 12, h: 92 },

        // left pair of bushes/trees
        { x: 75, y: 205, w: 28, h: 18 },

        // center pair of bushes/trees
        { x: 162, y: 205, w: 30, h: 18 },

        // lower horizontal tree row
        // ends before x = 192 so it does NOT block your lower-right grass
        { x: 76, y: 365, w: 114, h: 10 },


        // =========================
        // BOTTOM STONE ROWS
        // leave the middle exit open
        // =========================
        { x: 75, y: 544, w: 82, h: 12 },
        { x: 198, y: 544, w: 78, h: 12 },

        // stones on sides of bottom exit
        { x: 146, y: 545, w: 13, h: 32 },
        { x: 195, y: 545, w: 13, h: 32 },
    ],

    ledges: [
        // =========================
        // LOG FENCES
        // only block the logs, not the grass/path
        // =========================

        // upper-left log fence
        { x: 75, y: 85, w: 70, h: 8 },

        // upper-right small log fence
        { x: 256, y: 85, w: 27, h: 8 },

        // second-left log fence
        { x: 75, y: 150, w: 48, h: 8 },

        // middle log near two trees
        { x: 107, y: 210, w: 55, h: 8 },

        // small left log
        { x: 70, y: 310, w: 35, h: 8 },

        // long right log
        { x: 160, y: 310, w: 118, h: 8 },

        // lower-left log, placed above grass so it does not block encounter grass
        { x: 75, y: 442, w: 55, h: 8 },

        // lower-right log, placed above grass so it does not block encounter grass
        { x: 206, y: 442, w: 74, h: 8 },
    ],

    grass: [
        { x: 160, y: 95, w: 200, h: 65 },
        { x: 225, y: 190, w: 200, h: 65 },
        { x: 192, y: 350, w: 63, h: 65 },
        { x: 64, y: 460, w: 250, h: 250 },
    ],

    healZones: [],
    battle: [],

    exits: [
        {
            x: 155,
            y: 560,
            w: 40,
            h: 30,

            destination: "town",
            entrance: "north"
        },
        {
            x: 155,
            y: 0,
            w: 40,
            h: 20,

            destination: "caveEntr",
            entrance: "south"
        }
    ],

    spawnPoints: {
        south:
            {
                x: 170,
                y: 520,

                direction: "up"
            },
        north:
            {
                x: 175,
                y: 30,

                direction: "down"
            }
    }
};

const caveEntrMap = {
    name: "caveEntr",

    image: cave_entr,

    music: "caveEntrBGM",

    width: 320,
    height: 568,
    walls: [
        // left wall
        { x: 0, y: 0, w: 136, h: 440 },
        { x: 0, y: 0, w: 70, h: 4400 },
        { x: 0, y: 545, w: 95, h: 400 },


        // // right wall
        { x: 182, y: 0, w: 136, h: 440 },
        { x: 250, y: 0, w: 70, h: 4400 },
        { x: 225, y: 545, w: 70, h: 4400 },

    ],

    ledges: [],

    grass: [],

    healZones: [],
    battle: [],
    exits: [
        {
            x: 95,
            y: 560,
            w: 130,
            h: 30,

            destination: "route1",
            entrance: "north"
        },
        {
            x: 140,
            y: 70,
            w: 40,
            h: 10,

            destination: "cave",
            entrance: "south"
        }
    ],

    spawnPoints: {
        south:
            {
                x: 150,
                y: 530,

                direction: "up"
            },
        north:
            {
                x: 150,
                y: 80,

                direction: "down"
            }
    }
};

const caveMap = {
    name: "cave",

    image: cave,

    music: "caveBGM",

    width: 320,
    height: 480,
    walls: [
        { x: 0, y: 0, w: 1000, h: 166 },
        { x: 0, y: 420, w: 1000, h: 166 },


        { x: 0, y: 0, w: 90, h: 1000 },
        { x: 0, y: 275, w: 145, h: 15 },
        { x: 0, y: 280, w: 130, h: 4400 },

        { x: 230, y: 0, w: 90, h: 1000 },
        { x: 175, y: 275, w: 145, h: 15 },
        { x: 190, y: 280, w: 130, h: 4400 },

    ],

    ledges: [],

    grass: []
    ,

    healZones: [],
    battle: [ { x: 100, y:160 , w: 130, h: 130 },
    ],

    exits: [
        {
            x: 144,
            y: 415,
            w: 30,
            h: 30,

            destination: "caveEntr",
            entrance: "north"
        },
    ],

    spawnPoints: {
        south:
            {
                x: 150,
                y: 390,

                direction: "up"
            },
        north:
            {
                x: 175,
                y: 30,

                direction: "down"
            }
    }

};


const maps = {
    town: townMap,
    route1: route1Map,
    caveEntr: caveEntrMap,
    cave: caveMap,
    lab: labMap
};

let currentMap = labMap;
