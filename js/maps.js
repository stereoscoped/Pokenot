const townMap = {
    name: "Town",

    image: town,

    music: "town",

    width: 320,
    height: 280,
  
    walls: [
        { x: 65, y: 45, w: 60, h: 45 },
        { x: 195, y: 45, w: 60, h: 45 },
        { x: 160, y:125, w: 95, h: 60 },
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
        // { x: 160, y: 98, w: 160, h: 104 },
        // { x: 480, y: 98, w: 160, h: 104 },
        // { x: 400, y: 267, w: 240, h: 130 },
        // { x: 160, y: 467, w: 160, h: 160 }
    ],

    grass: [
        { x: 160, y: 95, w: 200, h: 65 },
        { x: 225, y: 190, w: 200, h: 65 },
        { x: 192, y: 350, w: 63, h: 65 },
        { x: 64, y: 450, w: 96, h: 260 },
        { x: 192, y: 450, w: 96, h: 260 }
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