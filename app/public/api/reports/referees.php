<?php
// require 'common.php';
require 'class/DbConnection.php';


// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM referee';
$vars = [];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$patients = $stmt->fetchAll();

if (isset($_GET['format']) && $_GET['format'] == 'csv') {
    header('Content-Type: text/csv');

    echo "RefereeID,Name,Age,Grade,SkillLevel,Position\r\n";

    foreach ($patients as $o) {
        echo "\"" . $o['id'] . "\","
            . $o['rname'] . ','
            . $o['age'] . ','
            . $o['referee_grade'] . ','
            . $o['referee_skill'] . ','
            . $o['relevant_position'] . "\r\n";
    }
} else { // Step 3: Convert to JSON
    $json = json_encode($patients, JSON_PRETTY_PRINT);

    // Step 4: Output
    header('Content-Type: application/json');
    echo $json;
}