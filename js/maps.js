const townMap = {
    name: "Town",

    image: town,

    music: "town",

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
        { x: 50, y: 78, w: 13, h: 14 },

        // sign beside right house
        { x: 178, y: 78, w: 13, h: 14 },


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

    grass: [
        // { x: 400, y: 0, w: 80, h: 67 }
    ],

    exits: [
        {
            x: 155,
            y: 0,
            w: 40,
            h: 20,

            destination: "route1",
            entrance: "south"
        }
    ],

    spawnPoints: {
        north:
        {
            x: 175,
            y: 30,

            direction: "down"
        }
    }
};


const route1Map = {
    name: "Route1",

    image: route,

    music: "route",

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


        // =========================
        // TREE / BUSH HITBOXES
        // small body/trunk area only
        // =========================

        // vertical tree line beside top grass
        // ends before x = 160 so it does NOT block your grass patch
        { x: 148, y: 65, w: 12, h: 92 },

        // left pair of bushes/trees
        { x: 78, y: 200, w: 28, h: 22 },

        // center pair of bushes/trees
        { x: 162, y: 200, w: 30, h: 20 },

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

    grass: [
         { x: 160, y: 95, w: 200, h: 65 },
        { x: 225, y: 190, w: 200, h: 65 },
        { x: 192, y: 350, w: 63, h: 65 },
        { x: 64, y: 450, w: 250, h: 250 },
    ],

    exits: [
        {
            x: 155,
            y: 560,
            w: 40,
            h: 30,

            destination: "town",
            entrance: "north"
        }
    ],

    spawnPoints: {
        south:
        {
            x: 170,
            y: 520,

            direction: "up"
        }
    }
};


const maps = {
    town: townMap,
    route1: route1Map,
    // gym: gymMap
};

let currentMap = townMap;
