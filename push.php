<?php
use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;
use Minishlink\WebPush\VAPID;

error_reporting(0);
require "includes/database.php";
require 'web-push/vendor/autoload.php';

// var_dump(VAPID:: createVapidKeys());
// die;


$publicKey = "BEue9W6A1BnQAQlz_-ppP2Nq-awaNPK-s4qLK0cCJUGjMnSpL5EVbogQigiMvZHq-GFnxa_bgzGMMPU7mWvMFkw";
$privateKey = "MoAJ59IkMwmJZIXDMB1E-tzeCi4qq4gw5HmwpmtJHhU"; 

// Prepare the message payload
$message = json_encode([
    'title' => 'Push Message!',
    'body' => 'Yay it works.',
    'icon' => 'https://local.tt/videos/push-notification/images/icon.png',
    'badge' => 'https://local.tt/videos/push-notificationimages/badge.png',
    'extraData' => 'https://thintake.in?ref=push-message'
]);

$time = time();
$query = $con->query("SELECT * FROM `push_subscribers` WHERE `expirationTime` = 0 OR `expirationTime` > '{$time}'");

if ($query->num_rows > 0) {
    // Set VAPID authentication details
    $auth = [
        'VAPID' => [
            'subject' => 'https://thintake.in', 
            'publicKey' => $publicKey, 
            'privateKey' => $privateKey,
        ],
    ];

    $webPush = new WebPush($auth);

    while ($subscriber = $query->fetch_assoc()) {
        $subscription = Subscription::create([
            "endpoint" => $subscriber['endpoint'],
            "keys" => [
                'p256dh' => $subscriber['p256dh'],
                'auth' => $subscriber['authKey']
            ]
        ]);
        $webPush->queueNotification($subscription, $message);
    }

    foreach ($webPush->flush() as $report) {
        $endpoint = $report->getRequest()->getUri()->__toString();
        if ($report->isSuccess()) {
            echo "Message sent successfully for {$endpoint}.<br>";
        } else {
            $reason = $report->getReason();
            echo "Message failed to send for {$endpoint}: {$reason}.<br>";
            
            // Check if the subscription is expired (410 Gone error)
            if ($report->isSubscriptionExpired()) {
                // Remove the expired subscription from the database
                // Implement a function to delete the subscription using the endpoint URL
                deleteSubscriptionFromDatabase($endpoint);
                echo "Subscription has expired and was removed for {$endpoint}.<br>";
            }
        }
    }
    
    
} else {
    echo "No Subscribers";
}


function deleteSubscriptionFromDatabase($endpoint) {
    // Example using mysqli (modify according to your database setup)
    include "includes/database.php";
    
    // Prepare the SQL statement using placeholders for safety
    $stmt = $con->prepare("DELETE FROM `push_subscribers` WHERE `endpoint` = ?");
    
    // Bind the $endpoint value to the prepared statement
    $stmt->bind_param('s', $endpoint); // 's' means the parameter is a string
    
    // Execute the statement
    $stmt->execute();
    
    // Check for errors
    if ($stmt->error) {
        echo "Error deleting subscription: " . $stmt->error;
    } else {
        echo "Subscription deleted successfully.";
    }

    // Close the statement
    $stmt->close();
}
