<?php

try {
    $_POST = json_decode(
                file_get_contents('php://input'), 
                true,
                2,
                JSON_THROW_ON_ERROR
            );
} catch (Exception $e) {
    header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");
    exit;
}


require("class/DbConnection.php");

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
// Parameterized statements to avoid SQL injection

$stmt = $db->prepare(
  'UPDATE games SET
  field_num = ?,
  start_date = ?,
  start_time = ?,
  game_level = ?,
  num_of_refs = ?,
  game_name = ?
  WHERE game_id = ?'
);

$stmt->execute([
  $_POST['field_num'],
  $_POST['start_date'],
  $_POST['start_time'],
  $_POST['game_level'],
  $_POST['num_of_refs'],
  $_POST['game_name'],
  $_POST['game_id']
]);

// Step 4: Output
header('HTTP/1.1 303 See Other');
header('Location: ../games');