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
  'INSERT INTO referee (rname, age, referee_grade, referee_skill, relevant_position, report)
  VALUES (?, ?, ?, ?, ?, ?)'
);

$stmt->execute([        
  $_POST['rname'],
  $_POST['age'],
  $_POST['referee_grade'],
  $_POST['referee_skill'],
  $_POST['relevant_position'],
  $_POST['report']
]);


header('HTTP/1.1 303 See Other');
header("Location: ../books/");