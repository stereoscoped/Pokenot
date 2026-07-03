USE pokemon_battle;

DELETE FROM pokemon;
DELETE FROM attacks;

-- Insert Pokemon
INSERT INTO pokemon (id, name, hp, attack, defense, speed, image_url) VALUES
(1, 'Bulbasaur',  45,  49,  49,  45, 'assets/pokemon_front_sprites/bulbasaur.png'),
(2, 'Ivysaur',    60,  62,  63,  60, 'assets/pokemon_front_sprites/ivysaur.png'),
(3, 'Venusaur',   80,  82,  83,  80, 'assets/pokemon_front_sprites/venusaur.png'),
(4, 'Charmander', 39,  52,  43,  65, 'assets/pokemon_front_sprites/charmander.png'),
(5, 'Charmeleon', 58,  64,  58,  80, 'assets/pokemon_front_sprites/charmeleon.png'),
(6, 'Charizard',  78,  84,  78, 100, 'assets/pokemon_front_sprites/charizard.png'),
(7, 'Squirtle',   44,  48,  65,  43, 'assets/pokemon_front_sprites/squirtle.png'),
(8, 'Wartortle',  59,  63,  80,  58, 'assets/pokemon_front_sprites/wartortle.png'),
(9, 'Blastoise',  79,  83, 100,  78, 'assets/pokemon_front_sprites/blastoise.png'),
(10, 'Caterpie',   45, 30, 35, 45, 'assets/pokemon_front_sprites/caterpie.png'),
(11, 'Metapod',    50, 20, 55, 30, 'assets/pokemon_front_sprites/metapod.png'),
(12, 'Butterfree', 60, 45, 50, 70, 'assets/pokemon_front_sprites/butterfree.png'),
(13, 'Weedle',     40, 35, 30, 50, 'assets/pokemon_front_sprites/weedle.png'),
(14, 'Kakuna',     45, 25, 50, 35, 'assets/pokemon_front_sprites/kakuna.png'),
(15, 'Beedrill',   65, 90, 40, 75, 'assets/pokemon_front_sprites/beedrill.png'),
(16, 'Pidgey',     40, 45, 40, 56, 'assets/pokemon_front_sprites/pidgey.png'),
(17, 'Pidgeotto',  63, 60, 55, 71, 'assets/pokemon_front_sprites/pidgeotto.png'),
(18, 'Pidgeot',    83, 80, 75, 101, 'assets/pokemon_front_sprites/pidgeot.png'),
(19, 'Rattata',    30, 56, 35, 72, 'assets/pokemon_front_sprites/rattata.png'),
(20, 'Raticate',   55, 81, 60, 97, 'assets/pokemon_front_sprites/raticate.png'),
(21, 'Spearow',    40, 60, 30, 70, 'assets/pokemon_front_sprites/spearow.png'),
(22, 'Fearow',     65, 90, 65, 100, 'assets/pokemon_front_sprites/fearow.png'),
(23, 'Ekans',      35, 60, 44, 55, 'assets/pokemon_front_sprites/ekans.png'),
(24, 'Arbok',      60, 95, 69, 80, 'assets/pokemon_front_sprites/arbok.png'),
(25, 'Pikachu',    35, 55, 40, 90, 'assets/pokemon_front_sprites/pikachu.png'),
(26, 'Raichu',     60, 90, 55, 110, 'assets/pokemon_front_sprites/raichu.png'),
(27, 'Sandshrew',  50, 75, 85, 40, 'assets/pokemon_front_sprites/sandshrew.png'),
(28, 'Sandslash',  75, 100, 110, 65, 'assets/pokemon_front_sprites/sandslash.png'),
(29, 'Nidoranf',   55, 47,  52,  41, 'assets/pokemon_front_sprites/nidoranf.png'),
(30, 'Nidorina',   70, 62,  67,  56, 'assets/pokemon_front_sprites/nidorina.png'),
(31, 'Nidoqueen',  90, 92,  87,  76, 'assets/pokemon_front_sprites/nidoqueen.png'),
(32, 'Nidoranm',   46, 57,  40,  50, 'assets/pokemon_front_sprites/nidoranm.png'),
(33, 'Nidorino',   61, 72,  57,  65, 'assets/pokemon_front_sprites/nidorino.png'),
(34, 'Nidoking',   81, 102, 77,  85, 'assets/pokemon_front_sprites/nidoking.png'),
(35, 'Clefairy',   70, 45,  48,  35, 'assets/pokemon_front_sprites/clefairy.png'),
(36, 'Clefable',  	95,	70,	73,	60,	'assets/pokemon_front_sprites/clefable.png'),
(37, 'Vulpix',     38, 41, 40, 65, 'assets/pokemon_front_sprites/vulpix.png'),
(38, 'Ninetales',  73, 76, 75, 100, 'assets/pokemon_front_sprites/ninetales.png'),
(39, 'Jigglypuff', 115, 45, 20, 20, 'assets/pokemon_front_sprites/jigglypuff.png'),
(40, 'Wigglytuff', 140, 70, 45, 45, 'assets/pokemon_front_sprites/wigglytuff.png'),
(41, 'Zubat',      40, 45, 35, 55, 'assets/pokemon_front_sprites/zubat.png'),
(42, 'Golbat',     75, 80, 70, 90, 'assets/pokemon_front_sprites/golbat.png'),
(43, 'Oddish',     45, 50, 55, 30, 'assets/pokemon_front_sprites/oddish.png'),
(44, 'Gloom',      60, 65, 70, 40, 'assets/pokemon_front_sprites/gloom.png'),
(45, 'Vileplume',  75, 80, 85, 50, 'assets/pokemon_front_sprites/vileplume.png'),
(46, 'Paras',      35, 70,	55,	25,	'assets/pokemon_front_sprites/paras.png'),
(47, 'Parasect',   60, 95, 80, 30, 'assets/pokemon_front_sprites/parasect.png'),
(48, 'Venonat',    60, 55, 50, 45, 'assets/pokemon_front_sprites/venonat.png'),
(49, 'Venomoth',   70, 65, 60, 90, 'assets/pokemon_front_sprites/venomoth.png'),
(50, 'Diglett',    10, 55, 25, 95, 'assets/pokemon_front_sprites/diglett.png'),
(51, 'Dugtrio',    35, 100, 50, 120, 'assets/pokemon_front_sprites/dugtrio.png'),
(52, 'Meowth',     40, 45, 35, 90, 'assets/pokemon_front_sprites/meowth.png'),
(53, 'Persian',    65, 70, 60, 115, 'assets/pokemon_front_sprites/persian.png'),
(54, 'Psyduck',    50, 52, 48, 55, 'assets/pokemon_front_sprites/psyduck.png'),
(55, 'Golduck',    80, 82, 78, 85, 'assets/pokemon_front_sprites/golduck.png'),
(56, 'Mankey',     40, 80, 35, 70, 'assets/pokemon_front_sprites/mankey.png'),
(57, 'Primeape',   65, 105, 60, 95, 'assets/pokemon_front_sprites/primeape.png'),
(58, 'Growlithe',  55, 70, 45, 60, 'assets/pokemon_front_sprites/growlithe.png'),
(59, 'Arcanine',   90, 110, 80, 95, 'assets/pokemon_front_sprites/arcanine.png'),
(60, 'Poliwag',    40, 50, 40, 90, 'assets/pokemon_front_sprites/poliwag.png'),
(61, 'Poliwhirl',  65, 65, 65, 90, 'assets/pokemon_front_sprites/poliwhirl.png'),
(62, 'Poliwrath',  90, 95, 95, 70, 'assets/pokemon_front_sprites/poliwrath.png'),
(63, 'Abra',       25, 20, 15, 90, 'assets/pokemon_front_sprites/abra.png'),
(64, 'Kadabra',    40, 35, 30, 105, 'assets/pokemon_front_sprites/kadabra.png'),
(65, 'Alakazam',   55, 50, 45, 120, 'assets/pokemon_front_sprites/alakazam.png'),
(66, 'Machop',     70, 80, 50, 35,  'assets/pokemon_front_sprites/machop.png'),
(67, 'Machoke',    80, 100, 70, 45, 'assets/pokemon_front_sprites/machoke.png'),
(68, 'Machamp',    90, 130, 80, 55, 'assets/pokemon_front_sprites/machamp.png'),
(69, 'Bellsprout', 50, 75, 35, 40,  'assets/pokemon_front_sprites/bellsprout.png'),
(70, 'Weepinbell', 65, 90, 50, 55,  'assets/pokemon_front_sprites/weepinbell.png'),
(71, 'Victreebel', 80, 105, 65, 70, 'assets/pokemon_front_sprites/victreebel.png'),
(72, 'Tentacool',  40, 40, 35, 70,  'assets/pokemon_front_sprites/tentacool.png'),
(73, 'Tentacruel', 80, 70, 65, 100, 'assets/pokemon_front_sprites/tentacruel.png'),
(74, 'Geodude',    40, 80, 100, 20, 'assets/pokemon_front_sprites/geodude.png'),
(75, 'Graveler',   55, 95, 115, 35, 'assets/pokemon_front_sprites/graveler.png'),
(76, 'Golem',      80, 120, 130, 45, 'assets/pokemon_front_sprites/golem.png'),
(77, 'Ponyta',     50, 85, 55, 90, 'assets/pokemon_front_sprites/ponyta.png'),
(78, 'Rapidash',   65, 100, 70, 105, 'assets/pokemon_front_sprites/rapidash.png'),
(79, 'Slowpoke',   90, 65, 65, 15, 'assets/pokemon_front_sprites/slowpoke.png'),
(80, 'Slowbro',    95, 75, 110, 30, 'assets/pokemon_front_sprites/slowbro.png'),
(81, 'Magnemite',  25, 35, 70, 45, 'assets/pokemon_front_sprites/magnemite.png'),
(82, 'Magneton',   50, 60, 95, 70, 'assets/pokemon_front_sprites/magneton.png'),
(83, 'Farfetchd', 52, 90, 55, 60, 'assets/pokemon_front_sprites/farfetchd.png'),
(84, 'Doduo',      35, 85, 45, 75, 'assets/pokemon_front_sprites/doduo.png'),
(85, 'Dodrio',     60, 110, 70, 110, 'assets/pokemon_front_sprites/dodrio.png'),
(86, 'Seel',       65, 45, 55, 45, 'assets/pokemon_front_sprites/seel.png'),
(87, 'Dewgong',    90, 70, 80, 70, 'assets/pokemon_front_sprites/dewgong.png'),
(88, 'Grimer',     80, 80, 50, 25, 'assets/pokemon_front_sprites/grimer.png'),
(89, 'Muk',        105, 105, 75, 50, 'assets/pokemon_front_sprites/muk.png'),
(90, 'Shellder',   30, 65, 100, 40, 'assets/pokemon_front_sprites/shellder.png'),
(91, 'Cloyster',   50, 95, 180, 70, 'assets/pokemon_front_sprites/cloyster.png'),
(92, 'Gastly',     30, 35, 30, 80, 'assets/pokemon_front_sprites/gastly.png'),
(93, 'Haunter',    45, 50, 45, 95, 'assets/pokemon_front_sprites/haunter.png'),
(94, 'Gengar',     60, 65, 60, 110, 'assets/pokemon_front_sprites/gengar.png'),
(95, 'Onix',       35, 45, 160, 70, 'assets/pokemon_front_sprites/onix.png'),
(96, 'Drowzee',    60, 48, 45, 42, 'assets/pokemon_front_sprites/drowzee.png'),
(97, 'Hypno',      85, 73, 70, 67, 'assets/pokemon_front_sprites/hypno.png'),
(98, 'Krabby',     30, 105, 90, 50, 'assets/pokemon_front_sprites/krabby.png'),
(99, 'Kingler',    55, 130, 115, 75,'assets/pokemon_front_sprites/kingler.png'),
(100, 'Voltorb',    40, 30, 50, 100, 'assets/pokemon_front_sprites/voltorb.png'),
(101, 'Electrode',  60, 50, 70, 150, 'assets/pokemon_front_sprites/electrode.png'),
(102, 'Exeggcute',  60, 40, 80, 40,  'assets/pokemon_front_sprites/exeggcute.png'),
(103, 'Exeggutor',  95, 95, 85, 55,  'assets/pokemon_front_sprites/exeggutor.png'),
(104, 'Cubone',     50, 50, 95, 35,  'assets/pokemon_front_sprites/cubone.png'),
(105, 'Marowak',    60, 80, 110, 45, 'assets/pokemon_front_sprites/marowak.png'),
(106, 'Hitmonlee',  50, 120, 53, 87, 'assets/pokemon_front_sprites/hitmonlee.png'),
(107, 'Hitmonchan', 50, 105, 79, 76, 'assets/pokemon_front_sprites/hitmonchan.png'),
(108, 'Lickitung',  90, 55, 75, 30,  'assets/pokemon_front_sprites/lickitung.png'),
(109, 'Koffing',    40, 65,  95,  35, 'assets/pokemon_front_sprites/koffing.png'),
(110, 'Weezing',    65, 90,  120, 60, 'assets/pokemon_front_sprites/weezing.png'),
(111, 'Rhyhorn',    80, 85,  95,  25, 'assets/pokemon_front_sprites/rhyhorn.png'),
(112, 'Rhydon',     105,130, 120, 40, 'assets/pokemon_front_sprites/rhydon.png'),
(113, 'Chansey',    250,5,   5,   50, 'assets/pokemon_front_sprites/chansey.png'),
(114, 'Tangela',    65, 55,  115, 60, 'assets/pokemon_front_sprites/tangela.png'),
(115, 'Kangaskhan', 105,95,  80,  90, 'assets/pokemon_front_sprites/kangaskhan.png'),
(116, 'Horsea',     30, 40,  70,  60, 'assets/pokemon_front_sprites/horsea.png'),
(117, 'Seadra',     55, 65,  95,  85, 'assets/pokemon_front_sprites/seadra.png'),
(118, 'Goldeen',    45, 67,  60,  63, 'assets/pokemon_front_sprites/goldeen.png'),
(119, 'Seaking',    80, 92,  65,  68, 'assets/pokemon_front_sprites/seaking.png'),
(120, 'Staryu',     30, 45,  55,  85, 'assets/pokemon_front_sprites/staryu.png'),
(121, 'Starmie',    60, 75,  85,  115, 'assets/pokemon_front_sprites/starmie.png'),
(122, 'MrMime',   40, 45,  65,  90, 'assets/pokemon_front_sprites/mr_mime.png'),
(123, 'Scyther',    70, 110, 80,  105, 'assets/pokemon_front_sprites/scyther.png'),
(124, 'Jynx',       65, 50,  35,  95, 'assets/pokemon_front_sprites/jynx.png'),
(125, 'Electabuzz', 65, 83,  57,  105, 'assets/pokemon_front_sprites/electabuzz.png'),
(126, 'Magmar',     65, 95,  57,  93, 'assets/pokemon_front_sprites/magmar.png'),
(127, 'Pinsir',     65, 125, 100, 85, 'assets/pokemon_front_sprites/pinsir.png'),
(128, 'Tauros',     75, 100, 95,  110, 'assets/pokemon_front_sprites/tauros.png'),
(129, 'Magikarp',   20, 10,  55,  80, 'assets/pokemon_front_sprites/magikarp.png'),
(130, 'Gyarados',   95, 125, 79,  81, 'assets/pokemon_front_sprites/gyarados.png'),
(131, 'Lapras',     130,85,  80,  60, 'assets/pokemon_front_sprites/lapras.png'),
(132, 'Ditto',      48, 48,  48,  48, 'assets/pokemon_front_sprites/ditto.png'),
(133, 'Eevee',      55, 55,  50,  55, 'assets/pokemon_front_sprites/eevee.png'),
(134, 'Vaporeon',   130,65,  60,  65, 'assets/pokemon_front_sprites/vaporeon.png'),
(135, 'Jolteon',    65, 65,  60,  130, 'assets/pokemon_front_sprites/jolteon.png'),
(136, 'Flareon',    65, 130, 60,  65,  'assets/pokemon_front_sprites/flareon.png'),
(137, 'Porygon',    65, 60,  70,  40,  'assets/pokemon_front_sprites/porygon.png'),
(138, 'Omanyte',    35, 40,  100, 35,  'assets/pokemon_front_sprites/omanyte.png'),
(139, 'Omastar',    70, 60,  125, 55,  'assets/pokemon_front_sprites/omastar.png'),
(140, 'Kabuto',     30, 80,  90,  55,  'assets/pokemon_front_sprites/kabuto.png'),
(141, 'Kabutops',   60, 115, 105, 80,  'assets/pokemon_front_sprites/kabutops.png'),
(142, 'Aerodactyl', 80, 105, 65,  130, 'assets/pokemon_front_sprites/aerodactyl.png'),
(143, 'Snorlax',    160,110, 65,  30,  'assets/pokemon_front_sprites/snorlax.png'),
(144, 'Articuno',   90, 85,  100, 85,  'assets/pokemon_front_sprites/articuno.png'),
(145, 'Zapdos',     90, 90,  85,  100, 'assets/pokemon_front_sprites/zapdos.png'),
(146, 'Moltres',    90, 100, 90,  90,  'assets/pokemon_front_sprites/moltres.png'),
(147, 'Dratini',    41, 64,  45,  50,  'assets/pokemon_front_sprites/dratini.png'),
(148, 'Dragonair',  61, 84,  65,  70,  'assets/pokemon_front_sprites/dragonair.png'),
(149, 'Dragonite',  91, 134, 95,  80,  'assets/pokemon_front_sprites/dragonite.png'),
(150, 'Mewtwo',     106,110, 90,  130, 'assets/pokemon_front_sprites/mewtwo.png'),
(151, 'Mew',        100,100, 100, 100, 'assets/pokemon_front_sprites/mew.png');


-- Insert Attacks
INSERT INTO attacks (id, name, damage, accuracy) VALUES
(1, 'Tackle',        40,  100),
(2, 'Growl',         0,   100),
(3, 'Scratch',       40,  100),
(4, 'Pound',         40,  100),
(5, 'Quick Attack',  40,  100),
(6, 'Double Slap',   15,  85),
(7, 'Body Slam',     85,  100),
(8, 'Hyper Beam',    150, 90),
(9, 'Slash',         70,  100),

-- Grass-Type Moves
(10, 'Vine Whip',     45,  100),
(11, 'Razor Leaf',    55,  95),
(12, 'Mega Drain',    40,  100),
(13, 'Solar Beam',    120, 100),

-- Fire-Type Moves
(14, 'Ember',         40,  100),
(15, 'Fire Punch',    75,  100),
(16, 'Flamethrower',  90,  100),
(17, 'Fire Blast',    110, 85),

-- Water-Type Moves
(18, 'Water Gun',     40,  100),
(19, 'Bubble Beam',   65,  100),
(20, 'Surf',          90,  100),
(21, 'Hydro Pump',    110, 80),

-- Electric-Type Moves
(22, 'Thunder Shock', 40,  100),
(23, 'Thunder Punch', 75,  100),
(24, 'Thunderbolt',   90,  100),
(25, 'Thunder',       110, 70),

-- Psychic / Ghost Moves
(26, 'Confusion',     50,  100),
(27, 'Psybeam',       65,  100),
(28, 'Psychic',       90,  100),
(29, 'Night Shade',   60,  100),
(30, 'Dream Eater',   100, 100),

-- Ice / Flying / Rock Moves
(31, 'Ice Punch',     75,  100),
(32, 'Ice Beam',      90,  100),
(33, 'Blizzard',      110, 70),
(34, 'Gust',          40,  100),
(35, 'Fly',           90,  95),
(36, 'Rock Throw',    50,  90),
(37, 'Earthquake',    100, 100),

-- Fighting / Poison / Special Legendary Moves
(38, 'Double Kick',   30,  100),
(39, 'Sludge',        65,  100),
(40, 'Ancient Power', 60,  100),

(41, 'String Shot',  0, 95),
(42, 'Bug Bite',    60, 100),
(43, 'Harden',       0, 100),
(44, 'Poison Sting', 15, 100),
(45, 'Twineedle',   25, 100),
(46, 'Wing Attack', 60, 100),

(47, 'Hyper Fang',   80, 90),
(48, 'Peck',         35, 100),
(49, 'Drill Peck',   80, 100),
(50, 'Acid',         40, 100),
(51, 'Gunk Shot',    120, 85),
(52, 'Dig',          80, 100),

(53, 'Poison Sting', 15, 100),
(54, 'Sludge Bomb',  90, 100),
(55, 'Earth Power',  90, 100),
(56, 'Mega Punch',   80, 85),

(57, 'Quick Attack', 40, 100),
(58, 'Air Cutter',   60, 95),
(59, 'Bite',         60, 100),
(60, 'Acid',         40, 100),
(61, 'Petal Blizzard', 90, 100),

(62, 'X-Scissor',    80, 100),
(63, 'Leech Life',   80, 100),
(64, 'Pay Day',      40, 100),
(65, 'Night Slash',  70, 100),
(66, 'Water Pulse',  60, 100),

(67, 'Karate Chop',  50, 100),
(68, 'Cross Chop',   100, 80),
(69, 'Flame Wheel',  60, 100),
(70, 'Bubble',       40, 100),
(71, 'Dynamic Punch',100, 50),

(72, 'Psybeam',      65, 100),
(73, 'Seismic Toss', 0,   100),
(74, 'Submission',   80,  80),
(75, 'Poison Powder',0,   75),
(76, 'Leaf Blade',   90,  100),
(77, 'Constrict',    10,  100),

(78, 'Rock Slide',   75, 90),
(79, 'Fire Spin',    35, 85),
(80, 'Stomp',        65, 100),
(81, 'Water Pulse',  60, 100),

(82, 'Tri Attack',   80, 100),
(83, 'Pluck',        60, 100),
(84, 'Sludge',       65, 100),
(85, 'Gunk Shot',    120, 85),
(86, 'Ice Shard',    40, 100),
(87, 'Clamp',        35, 85),

(88, 'Shadow Ball',  80, 100),
(89, 'Rock Tomb',    60, 95),
(90, 'Headbutt',     70, 100),
(91, 'Crabhammer',   100, 90),

(92, 'Self-Destruct', 130, 100),
(93, 'Seed Bomb',     80,  100),
(94, 'Bonemerang',    50,  90), -- Hits twice
(95, 'High Jump Kick',130, 90),
(96, 'Stomp',         65,  100),

(97, 'Sludge Bomb',  90,  100),
(98, 'Rock Blast',   25,  90), -- Hits multiple times
(99, 'Egg Bomb',     100, 75),
(100, 'Giga Drain',  75,  100),
(101, 'Dizzy Punch', 70,  100),

(102, 'Horn Attack',  65,  100),
(103, 'Waterfall',    80,  100),
(104, 'Air Slash',    75,  95),
(105, 'Draining Kiss',50,  100),

(106, 'Vise Grip',   55,  100),
(107, 'Splash',      0,   100),
(108, 'Transform',   0,   100),
(109, 'Bite',        60,  100),

(110, 'Ancient Power', 60,  100),
(111, 'Giga Impact',   150, 90),
(112, 'Blizzard',      110, 70),
(113, 'Crunch',        80,  100),

(114, 'Thunderbolt', 90,  100),
(115, 'Sky Attack',  140, 90),
(116, 'Outrage',     120, 100),
(117, 'Psystrike',   100, 100);


-- Link together with IDs
INSERT INTO pokemon_attacks (pokemon_id, attack_id) VALUES
-- Bulbasaur (Tackle, Growl, Vine Whip, Razor Leaf)
(1, 1), (1, 2), (1, 10), (1, 11),
-- Ivysaur (Tackle, Vine Whip, Razor Leaf)
(2, 1), (2, 10), (2, 11),
-- Venusaur (Tackle, Razor Leaf, Solar Beam)
(3, 1), (3, 11), (3, 13),

-- Charmander (Scratch, Growl, Ember, Flamethrower)
(4, 3), (4, 2), (4, 14), (4, 16),
-- Charmeleon (Scratch, Ember, Flamethrower)
(5, 3), (5, 14), (5, 16),
-- Charizard (Scratch, Flamethrower, Fire Blast)
(6, 3), (6, 16), (6, 17),

-- Squirtle (Tackle, Growl, Water Gun, Bite)
(7, 1), (7, 2), (7, 18), (7, 59),
-- Wartortle (Tackle, Water Gun, Bite, Hydro Pump)
(8, 1), (8, 18), (8, 59), (8, 21),
-- Blastoise (Water Gun, Bite, Hydro Pump, Body Slam)
(9, 18), (9, 59), (9, 21), (9, 7),

-- Caterpie (Tackle, String Shot, Bug Bite)
(10, 1), (10, 41), (10, 42),
-- Metapod (Harden)
(11, 43),
-- Butterfree (Tackle, Confusion, Psybeam, Gust)
(12, 1), (12, 26), (12, 27), (12, 34),

-- Weedle (Poison Sting, String Shot, Bug Bite)
(13, 44), (13, 41), (13, 42),
-- Kakuna (Harden)
(14, 43),
-- Beedrill (Twineedle, Poison Sting, Bug Bite, Tackle)
(15, 45), (15, 44), (15, 42), (15, 1),

-- Pidgey (Tackle, Growl, Gust, Quick Attack)
(16, 1), (16, 2), (16, 34), (16, 5),
-- Pidgeotto (Tackle, Gust, Quick Attack, Wing Attack)
(17, 1), (17, 34), (17, 5), (17, 46),
-- Pidgeot (Quick Attack, Gust, Wing Attack, Fly)
(18, 5), (18, 34), (18, 46), (18, 35),

-- Rattata (Tackle, Quick Attack, Bite)
(19, 1), (19, 5), (19, 59),
-- Raticate (Quick Attack, Bite, Hyper Fang, Body Slam)
(20, 5), (20, 59), (20, 47), (20, 7),

-- Spearow (Peck, Growl, Tackle, Gust)
(21, 48), (21, 2), (21, 1), (21, 34),
-- Fearow (Peck, Drill Peck, Fly, Body Slam)
(22, 48), (22, 49), (22, 35), (22, 7),

-- Ekans (Tackle, Poison Sting, Acid)
(23, 1), (23, 44), (23, 50),
-- Arbok (Bite, Poison Sting, Acid, Gunk Shot)
(24, 59), (24, 44), (24, 50), (24, 51),

-- Pikachu (Thunder Shock, Growl, Quick Attack, Thunderbolt)
(25, 22), (25, 2), (25, 5), (25, 24),
-- Raichu (Quick Attack, Thunderbolt, Thunder, Body Slam)
(26, 5), (26, 24), (26, 25), (26, 7),

-- Sandshrew (Scratch, Growl, Slash, Dig)
(27, 3), (27, 2), (27, 9), (27, 52),
-- Sandslash (Scratch, Slash, Dig, Earthquake)
(28, 3), (28, 9), (28, 52), (28, 37),

-- Nidoran (Tackle, Growl, Poison Sting, Bite)
(29, 1), (29, 2), (29, 53), (29, 59),
-- Nidorina (Tackle, Poison Sting, Bite, Slash)
(30, 1), (30, 53), (30, 59), (30, 9),
-- Nidoqueen (Bite, Sludge Bomb, Earth Power, Earthquake)
(31, 59), (31, 54), (31, 55), (31, 37),

-- Nidoran♂ (Tackle, Growl, Poison Sting, Double Kick)
(32, 1), (32, 2), (32, 53), (32, 38),
-- Nidorino (Tackle, Poison Sting, Double Kick, Slash)
(33, 1), (33, 53), (33, 38), (33, 9),
-- Nidoking (Double Kick, Sludge Bomb, Earth Power, Earthquake)
(34, 38), (34, 54), (34, 55), (34, 37),

-- Clefairy (Pound, Growl, Double Slap, Psychic)
(35, 4), (35, 2), (35, 6), (35, 28),
-- Clefable (Pound, Double Slap, Mega Punch, Psychic)
(36, 4), (36, 6), (36, 56), (36, 28),

-- Vulpix (Ember, Quick Attack, Flamethrower)
(37, 14), (37, 5), (37, 16),
-- Ninetales (Quick Attack, Flamethrower, Fire Blast)
(38, 5), (38, 16), (38, 17),

-- Jigglypuff (Pound, Growl, Double Slap, Body Slam)
(39, 4), (39, 2), (39, 6), (39, 7),
-- Wigglytuff (Double Slap, Body Slam, Hyper Beam, Mega Punch)
(40, 6), (40, 7), (40, 8), (40, 56),

-- Zubat (Tackle, Air Cutter, Bite)
(41, 1), (41, 58), (41, 59),
-- Golbat (Air Cutter, Bite, Wing Attack)
(42, 58), (42, 59), (42, 46),

-- Oddish (Tackle, Acid, Mega Drain)
(43, 1), (43, 50), (43, 12),
-- Gloom (Acid, Mega Drain, Razor Leaf)
(44, 50), (44, 12), (44, 11),
-- Vileplume (Mega Drain, Petal Blizzard, Solar Beam)
(45, 12), (45, 61), (45, 13),

-- Paras (Scratch, Mega Drain, X-Scissor)
(46, 3), (46, 12), (46, 62),
-- Parasect (Scratch, Mega Drain, X-Scissor, Slash)
(47, 3), (47, 12), (47, 62), (47, 9),

-- Venonat (Tackle, Confusion, Psybeam, Leech Life)
(48, 1), (48, 26), (48, 27), (48, 63),
-- Venomoth (Confusion, Psybeam, Gust, Leech Life)
(49, 26), (49, 27), (49, 34), (49, 63),

-- Diglett (Scratch, Growl, Dig, Slash)
(50, 3), (50, 2), (50, 52), (50, 9),
-- Dugtrio (Scratch, Dig, Slash, Earthquake)
(51, 3), (51, 52), (51, 9), (51, 37),

-- Meowth (Scratch, Growl, Bite, Pay Day)
(52, 3), (52, 2), (52, 59), (52, 64),
-- Persian (Scratch, Bite, Pay Day, Night Slash)
(53, 3), (53, 59), (53, 64), (53, 65),

-- Psyduck (Scratch, Water Gun, Confusion, Water Pulse)
(54, 3), (54, 18), (54, 26), (54, 66),
-- Golduck (Scratch, Water Gun, Confusion, Hydro Pump)
(55, 3), (55, 18), (55, 26), (55, 21),

-- Mankey (Scratch, Tackle, Karate Chop)
(56, 3), (56, 1), (56, 67),
-- Primeape (Scratch, Karate Chop, Cross Chop, Body Slam)
(57, 3), (57, 67), (57, 68), (57, 7),

-- Growlithe (Bite, Growl, Ember, Flame Wheel)
(58, 59), (58, 2), (58, 14), (58, 69),
-- Arcanine (Bite, Ember, Flamethrower, Body Slam)
(59, 59), (59, 14), (59, 16), (59, 7),

-- Poliwag (Bubble, Water Gun, Body Slam)
(60, 70), (60, 18), (60, 7),
-- Poliwhirl (Bubble, Water Gun, Bubble Beam, Body Slam)
(61, 70), (61, 18), (61, 19), (61, 7),
-- Poliwrath (Bubble Beam, Double Kick, Hydro Pump, Dynamic Punch)
(62, 19), (62, 38), (62, 21), (62, 71),

-- Abra (Pound, Confusion)
(63, 4), (63, 26),

-- Kadabra (Confusion, Psybeam, Psychic)
(64, 26), (64, 27), (64, 28),
-- Alakazam (Confusion, Psybeam, Psychic, Hyper Beam)
(65, 26), (65, 27), (65, 28), (65, 8),

-- Machop (Tackle, Karate Chop, Seismic Toss)
(66, 1), (66, 67), (66, 73),
-- Machoke (Karate Chop, Seismic Toss, Submission)
(67, 67), (67, 73), (67, 74),
-- Machamp (Karate Chop, Submission, Cross Chop, Dynamic Punch)
(68, 67), (68, 74), (68, 68), (68, 71),

-- Bellsprout (Vine Whip, Growl, Acid)
(69, 10), (69, 2), (69, 50),
-- Weepinbell (Vine Whip, Acid, Razor Leaf)
(70, 10), (70, 50), (70, 11),
-- Victreebel (Razor Leaf, Sludge Bomb, Leaf Blade, Solar Beam)
(71, 11), (71, 54), (71, 76), (71, 13),

-- Tentacool (Poison Sting, Constrict, Acid, Water Gun)
(72, 44), (72, 77), (72, 50), (72, 18),
-- Tentacruel (Acid, Water Gun, Bubble Beam, Hydro Pump)
(73, 50), (73, 18), (73, 19), (73, 21),

-- Geodude (Tackle, Rock Throw, Rock Slide)
(74, 1), (74, 36), (74, 78),
-- Graveler (Tackle, Rock Throw, Rock Slide, Dig)
(75, 1), (75, 36), (75, 78), (75, 52),
-- Golem (Rock Throw, Rock Slide, Earthquake, Body Slam)
(76, 36), (76, 78), (76, 37), (76, 7),

-- Ponyta (Tackle, Ember, Fire Spin, Stomp)
(77, 1), (77, 14), (77, 79), (77, 80),
-- Rapidash (Ember, Stomp, Flamethrower, Fire Blast)
(78, 14), (78, 80), (78, 16), (78, 17),

-- Slowpoke (Tackle, Water Gun, Confusion, Water Pulse)
(79, 1), (79, 18), (79, 26), (79, 66),
-- Slowbro (Water Gun, Confusion, Surf, Psychic)
(80, 18), (80, 26), (80, 20), (80, 28),

-- Magnemite (Tackle, Thunder Shock, Thunderbolt)
(81, 1), (81, 22), (81, 24),
-- Magneton (Thunder Shock, Thunderbolt, Thunder, Tri Attack)
(82, 22), (82, 24), (82, 25), (82, 82),

-- Farfetch'd (Peck, Slash, Air Cutter, Fly)
(83, 48), (83, 9), (83, 58), (83, 35),

-- Doduo (Peck, Quick Attack, Pluck)
(84, 48), (84, 5), (84, 83),
-- Dodrio (Peck, Quick Attack, Pluck, Drill Peck)
(85, 48), (85, 5), (85, 83), (85, 49),

-- Seel (Tackle, Water Gun, Ice Shard, Surf)
(86, 1), (86, 18), (86, 86), (86, 20),
-- Dewgong (Water Gun, Ice Shard, Surf, Ice Beam)
(87, 18), (87, 86), (87, 20), (87, 32),

-- Grimer (Pound, Sludge, Dig)
(88, 4), (88, 39), (88, 52),
-- Muk (Pound, Sludge, Sludge Bomb, Gunk Shot)
(89, 4), (89, 39), (89, 54), (89, 51),

-- Shellder (Tackle, Water Gun, Clamp, Ice Beam)
(90, 1), (90, 18), (90, 87), (90, 32),
-- Cloyster (Clamp, Ice Beam, Tri Attack, Hydro Pump)
(91, 87), (91, 32), (91, 82), (91, 21),

-- Gastly (Pound, Night Shade, Psybeam)
(92, 4), (92, 29), (92, 27),
-- Haunter (Night Shade, Shadow Ball, Dream Eater)
(93, 29), (93, 88), (93, 30),
-- Gengar (Shadow Ball, Dream Eater, Psychic, Sludge Bomb)
(94, 88), (94, 30), (94, 28), (94, 54),

-- Onix (Tackle, Rock Throw, Rock Tomb, Earthquake)
(95, 1), (95, 36), (95, 89), (95, 37),

-- Drowzee (Pound, Confusion, Headbutt)
(96, 4), (96, 26), (96, 90),
-- Hypno (Confusion, Headbutt, Psychic, Dream Eater)
(97, 26), (97, 90), (97, 28), (97, 30),

-- Krabby (Tackle, Dig, Bubble Beam)
(98, 1), (98, 52), (98, 19),
-- Kingler (Bubble Beam, Crabhammer, Body Slam, Hyper Beam)
(99, 19), (99, 91), (99, 7), (99, 8),

-- Voltorb (Tackle, Thunder Shock, Thunderbolt)
(100, 1), (100, 22), (100, 24),
-- Electrode (Thunder Shock, Thunderbolt, Thunder, Self-Destruct)
(101, 22), (101, 24), (101, 25), (101, 92),

-- Exeggcute (Confusion, Mega Drain, Seed Bomb)
(102, 26), (102, 12), (102, 93),
-- Exeggutor (Confusion, Seed Bomb, Psychic, Solar Beam)
(103, 26), (103, 93), (103, 28), (103, 13),

-- Cubone (Tackle, Headbutt, Bonemerang)
(104, 1), (104, 90), (104, 94),
-- Marowak (Headbutt, Bonemerang, Body Slam, Earthquake)
(105, 90), (105, 94), (105, 7), (105, 37),

-- Hitmonlee (Double Kick, Mega Punch, High Jump Kick)
(106, 38), (106, 56), (106, 95),
-- Hitmonchan (Fire Punch, Ice Punch, Thunder Punch, Mega Punch)
(107, 15), (107, 31), (107, 23), (107, 56),

-- Lickitung (Pound, Stomp, Body Slam)
(108, 4), (108, 80), (108, 7),

-- Koffing (Tackle, Sludge, Sludge Bomb, Self-Destruct)
(109, 1), (109, 39), (109, 54), (109, 92),
-- Weezing (Sludge, Sludge Bomb, Self-Destruct, Fire Blast)
(110, 39), (110, 54), (110, 92), (110, 17),

-- Rhyhorn (Tackle, Rock Throw, Stomp, Dig)
(111, 1), (111, 36), (111, 80), (111, 52),
-- Rhydon (Rock Throw, Rock Blast, Earthquake, Surf)
(112, 36), (112, 98), (112, 37), (112, 20),

-- Chansey (Pound, Double Slap, Egg Bomb, Hyper Beam)
(113, 4), (113, 6), (113, 99), (113, 8),

-- Tangela (Vine Whip, Mega Drain, Giga Drain, Ancient Power)
(114, 10), (114, 12), (114, 100), (114, 40),

-- Kangaskhan (Pound, Bite, Dizzy Punch, Body Slam)
(115, 4), (115, 59), (115, 101), (115, 7),

-- Horsea (Bubble, Water Gun, Bubble Beam)
(116, 70), (116, 18), (116, 19),
-- Seadra (Water Gun, Bubble Beam, Surf, Hydro Pump)
(117, 18), (117, 19), (117, 20), (117, 21),

-- Goldeen (Peck, Water Gun, Horn Attack)
(118, 48), (118, 18), (118, 102),
-- Seaking (Water Gun, Horn Attack, Waterfall, Body Slam)
(119, 18), (119, 102), (119, 103), (119, 7),

-- Staryu (Tackle, Water Gun, Bubble Beam)
(120, 1), (120, 18), (120, 19),
-- Starmie (Water Gun, Bubble Beam, Surf, Psychic)
(121, 18), (121, 19), (121, 20), (121, 28),

-- Mr. Mime (Confusion, Psybeam, Psychic, Double Slap)
(122, 26), (122, 27), (122, 28), (122, 6),

-- Scyther (Quick Attack, Wing Attack, Slash, Air Slash)
(123, 5), (123, 46), (123, 9), (123, 104),

-- Jynx (Pound, Confusion, Draining Kiss, Ice Beam)
(124, 4), (124, 26), (124, 105), (124, 32),

-- Electabuzz (Quick Attack, Thunder Shock, Thunder Punch, Thunderbolt)
(125, 5), (125, 22), (125, 23), (125, 24),

-- Magmar (Ember, Fire Punch, Flamethrower, Fire Blast)
(126, 14), (126, 15), (126, 16), (126, 17),

-- Pinsir (Vise Grip, Tackle, Slash, X-Scissor)
(127, 106), (127, 1), (127, 9), (127, 62),

-- Tauros (Tackle, Horn Attack, Stomp, Body Slam)
(128, 1), (128, 102), (128, 80), (128, 7),

-- Magikarp (Splash, Tackle)
(129, 107), (129, 1),

-- Gyarados (Bite, Night Shade, Surf, Hydro Pump)
(130, 59), (130, 29), (130, 20), (130, 21),

-- Lapras (Water Gun, Body Slam, Ice Beam, Hydro Pump)
(131, 18), (131, 7), (131, 32), (131, 21),

-- Ditto (Transform)
(132, 108),

-- Eevee (Tackle, Growl, Quick Attack, Bite)
(133, 1), (133, 2), (133, 5), (133, 59),

-- Vaporeon (Tackle, Quick Attack, Water Gun, Hydro Pump)
(134, 1), (134, 5), (134, 18), (134, 21),

-- Jolteon (Tackle, Quick Attack, Thunder Shock, Thunderbolt)
(135, 1), (135, 5), (135, 22), (135, 24),

-- Flareon (Tackle, Quick Attack, Ember, Flamethrower)
(136, 1), (136, 5), (136, 14), (136, 16),

-- Porygon (Tackle, Psybeam, Tri Attack, Thunderbolt)
(137, 1), (137, 27), (137, 82), (137, 24),

-- Omanyte (Water Gun, Rock Throw, Ancient Power)
(138, 18), (138, 36), (138, 40),
-- Omastar (Water Gun, Ancient Power, Surf, Hydro Pump)
(139, 18), (139, 40), (139, 20), (139, 21),

-- Kabuto (Scratch, Mega Drain, Ancient Power)
(140, 3), (140, 12), (140, 40),
-- Kabutops (Scratch, Ancient Power, Slash, Waterfall)
(141, 3), (141, 40), (141, 9), (141, 103),

-- Aerodactyl (Wing Attack, Ancient Power, Crunch, Fly)
(142, 46), (142, 40), (142, 113), (142, 35),

-- Snorlax (Tackle, Headbutt, Body Slam, Giga Impact)
(143, 1), (143, 90), (143, 7), (143, 111),

-- Articuno (Gust, Ice Shard, Ice Beam, Blizzard)
(144, 34), (144, 86), (144, 32), (144, 33),

-- Zapdos (Gust, Thunder Shock, Thunderbolt, Thunder)
(145, 34), (145, 22), (145, 24), (145, 25),

-- Moltres (Gust, Ember, Flamethrower, Sky Attack)
(146, 34), (146, 14), (146, 16), (146, 115),

-- Dratini (Tackle, Thunder Shock, Night Shade)
(147, 1), (147, 22), (147, 29),
-- Dragonair (Tackle, Night Shade, Body Slam, Surf)
(148, 1), (148, 29), (148, 7), (148, 20),
-- Dragonite (Wing Attack, Night Shade, Outrage, Hyper Beam)
(149, 46), (149, 29), (149, 116), (149, 8),

-- Mewtwo (Confusion, Psybeam, Psychic, Psystrike)
(150, 26), (150, 27), (150, 28), (150, 117),

-- Mew (Pound, Psychic, Ancient Power, Transform)
(151, 4), (151, 28), (151, 40), (151, 108);