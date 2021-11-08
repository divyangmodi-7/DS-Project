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
// Note the use of parameterized statements to avoid injection

$stmt = $db->prepare(
  'INSERT INTO games (field_num, start_date, start_time, game_level, num_of_refs, game_name)
  VALUES (?, ?, ?, ?, ?, ?)'
);

$stmt->execute([
  $_POST['field_num'],
  $_POST['start_date'],
  $_POST['start_time'],
  $_POST['game_level'],
  $_POST['num_of_refs'],
  $_POST['game_name']
]);


header('HTTP/1.1 303 See Other');
header('Location: ../games/');