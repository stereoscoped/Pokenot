-- Insert Pokémon
INSERT INTO pokemon (name, hp, attack, defense, speed, image_url) VALUES
('Pikachu', 35, 55, 40, 90, 'images/pikachu.png'),
('Bulbasaur', 45, 49, 49, 45, 'images/bulbasaur.png'),
('Charmander', 39, 52, 43, 65, 'images/charmander.png'),
('Squirtle', 44, 48, 65, 43, 'images/squirtle.png'),

-- Insert Attacks
INSERT INTO attacks (name, damage, accuracy) VALUES
('Thunderbolt', 90, 100),
('Quick Attack', 40, 100),
('Vine Whip', 45, 100),
('Razor Leaf', 55, 95),
('Ember', 40, 100),
('Flamethrower', 90, 100),
('Water Gun', 40, 100),
('Hydro Pump', 110, 80),
('Close Combat', 120, 100),


-- Link Pokémon to their Attacks
INSERT INTO pokemon_attacks (pokemon_id, attack_id) VALUES
(1, 1), (1, 2),  -- Pikachu: Thunderbolt, Quick Attack
(2, 3), (2, 4),  -- Bulbasaur: Vine Whip, Razor Leaf
(3, 5), (3, 6),  -- Charmander: Ember, Flamethrower
(4, 7), (4, 8),  -- Squirtle: Water Gun, Hydro Pump