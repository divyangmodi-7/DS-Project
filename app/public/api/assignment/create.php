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
$stmt = $db->prepare(
  'INSERT INTO assignment (game_id, id, position, current_status)
  VALUES (?, ?, ?, ?)'
);

$stmt->execute([
  $_POST['game_id'],
  $_POST['id'],
  $_POST['position'],
  $_POST['current_status']
]);

// Step 4: Output
header('HTTP/1.1 303 See Other');
header('Location: ../assignment/?id=' . $_POST['id']);