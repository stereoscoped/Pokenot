USE pokemon_battle;


DELETE FROM pokemon;
DELETE FROM attacks;

-- Insert Pokemon with fixed IDs
INSERT INTO pokemon (id, name, hp, attack, defense, speed, image_url) VALUES
(1, 'Pikachu', 35, 55, 40, 90, 'images/pikachu.png'),
(2, 'Bulbasaur', 45, 49, 49, 45, 'images/bulbasaur.png'),
(3, 'Charmander', 39, 52, 43, 65, 'images/charmander.png'),
(4, 'Squirtle', 44, 48, 65, 43, 'images/squirtle.png');

-- Insert Attacks with fixed, explicit IDs
INSERT INTO attacks (id, name, damage, accuracy) VALUES
(1, 'Thunderbolt', 90, 100),
(2, 'Quick Attack', 40, 100),
(3, 'Vine Whip', 45, 100),
(4, 'Razor Leaf', 55, 95),
(5, 'Ember', 40, 100),
(6, 'Flamethrower', 90, 100),
(7, 'Water Gun', 40, 100),
(8, 'Hydro Pump', 110, 80),
(9, 'Close Combat', 120, 100);

-- Link everything together using IDs
INSERT INTO pokemon_attacks (pokemon_id, attack_id) VALUES
(1, 1), (1, 2),  -- Pikachu: Thunderbolt, Quick Attack
(2, 3), (2, 4),  -- Bulbasaur: Vine Whip, Razor Leaf
(3, 5), (3, 6),  -- Charmander: Ember, Flamethrower
(4, 7), (4, 8);  -- Squirtle: Water Gun, Hydro Pump