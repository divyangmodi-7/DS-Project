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
  'UPDATE assignment SET
  game_id = ?,
  referee_id = ?,
  position = ?,
  current_status = ?
  WHERE assignment_id = ?'
);

$stmt->execute([
  $_POST['game_id'],
  $_POST['referee_id'],
  $_POST['position'],
  $_POST['current_status'],
  $_POST['assignment_id']
]);

// Step 4: Output
header('HTTP/1.1 303 See Other');
header('Location: ../assignment/?referee_id=' . $_POST['referee_id']);