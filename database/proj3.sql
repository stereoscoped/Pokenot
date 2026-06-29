-- Create the database
CREATE DATABASE IF NOT EXISTS pokemon_battle;
USE pokemon_battle;

-- table to store Pokémon details
CREATE TABLE pokemon (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    hp INT NOT NULL,                  -- attribute 1
    attack INT NOT NULL,              -- attribute 2
    defense INT NOT NULL,             -- attribute 3
    speed INT NOT NULL,               -- attribute 4
    image_url VARCHAR(255)            -- Image
);

-- store attacks
CREATE TABLE attacks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    damage INT NOT NULL,
    accuracy INT DEFAULT 100          
);

-- Junction table linking Pokémon to their Attacks
CREATE TABLE pokemon_attacks (
    pokemon_id INT,
    attack_id INT,
    PRIMARY KEY (pokemon_id, attack_id),
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id) ON DELETE CASCADE,
    FOREIGN KEY (attack_id) REFERENCES attacks(id) ON DELETE CASCADE  
);