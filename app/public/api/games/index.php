<?php
require 'class/DbConnection.php';


// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM games';
$vars = [];

if(isset($_GET['game_id'])){
    //SQL Injection prevention
    $sql = 'SELECT * FROM games WHERE game_id = ?';
    $vars = [ $_GET['game_id'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$patients = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($patients, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;