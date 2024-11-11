<?php
require "includes/database.php";
header("Content-type: application/json");

$data = json_decode(file_get_contents('php://input'), true);

if(is_array($data) && isset($data['endpoint'])){
    $endpoint = $data['endpoint'];
    
    if(isset($_GET['subscribe'])){
        // subscribe
        $expirationTime = floor($data['expirationTime'] / 1000); // Convert to seconds
        $p256dh = $data['keys']['p256dh'];
        $authKey = $data['keys']['auth'];

        $selectId = $con->query("SELECT `id` FROM `push_subscribers` WHERE `endpoint` = '{$endpoint}'");
        
        if ($selectId->num_rows == 0) {
            $query = $con->query("INSERT INTO `push_subscribers` (`endpoint`, `expirationTime`, `p256dh`, `authKey`) 
            VALUES ('{$endpoint}', '{$expirationTime}', '{$p256dh}', '{$authKey}')");

            if ($query) {
                echo json_encode(['status' => 'ok', 'message' => 'Subscribed']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Try Again']);
            }
        } else {
            echo json_encode(['status' => 'ok', 'message' => 'Already Subscribed']);
        }
    } elseif(isset($_GET['unsubscribe'])){
        // unsubscribe
        $con->query("DELETE FROM `push_subscribers` WHERE `endpoint` = '{$endpoint}'");
        echo json_encode(['status' => 'ok', 'message' => 'Unsubscribed']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
}
?>
