<?php

// require 'common.php';

require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class

$db = DbConnection::getConnection();

// Step 2: Create & run the query

$sql = 'SELECT * FROM assignment';

$vars = [];

if (isset($_GET['game_id'])) {

    // This is an example of a parameterized query

    $sql = 'SELECT * FROM assignment

    JOIN referee

    ON assignment.id = referee.id 
    
    JOIN games

    ON assignment.game_id = games.game_id
    
    WHERE assignment.game_id = ?';

    $vars = [$_GET['game_id']];

}

$stmt = $db->prepare($sql);

$stmt->execute($vars);

$patients = $stmt->fetchAll();

// Step 3: Convert to JSON

$json = json_encode($patients, JSON_PRETTY_PRINT);

// Step 4: Output

header('Content-Type: application/json');

echo $json;