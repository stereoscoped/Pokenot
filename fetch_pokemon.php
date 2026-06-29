<?php
// fetch_pokemon.php
header('Content-Type: application/json');

//  XAMPP settings
$host = 'localhost';
$db   = 'pokemon_battle'; 
$user = 'root'; 
$pass = ''; 

try {
    // Connect to the database
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Query to fetch your Pokemon along with their attacks aggregated as a string
    $query = "
        SELECT p.*, GROUP_CONCAT(a.name, ':', a.damage, ':', a.accuracy) AS moves
        FROM pokemon p
        LEFT JOIN pokemon_attacks pa ON p.id = pa.pokemon_id
        LEFT JOIN attacks a ON pa.attack_id = a.id
        GROUP BY p.id
    ";
    
    $stmt = $pdo->query($query);
    $pokemon_list = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Parse the aggregated moves string into an actual nested sub-array for JavaScript
    foreach ($pokemon_list as &$pokemon) {
        if (!empty($pokemon['moves'])) {
            $moves_raw = explode(',', $pokemon['moves']);
            $pokemon['moves'] = [];
            foreach ($moves_raw as $move) {
                list($name, $damage, $accuracy) = explode(':', $move);
                $pokemon['moves'][] = [
                    'name' => $name,
                    'damage' => (int)$damage,
                    'accuracy' => (int)$accuracy
                ];
            }
        } else {
            $pokemon['moves'] = [];
        }
    }

    // Send it to JavaScript file as clean JSON data
    echo json_encode(array_values($pokemon_list));

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>