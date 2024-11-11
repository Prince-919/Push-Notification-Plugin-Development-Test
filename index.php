<?php
/**
 * Plugin Name: Simple Notification Plugin
 * Description: A minimal plugin to test activation.
 * Version: 1.0
 * Author: Your Name
 */

if (!defined('ABSPATH')) exit; // Exit if accessed directly

function test_plugin_activation() {
    error_log("Notification Plugin activated successfully.");
}
register_activation_hook(__FILE__, 'test_plugin_activation');

echo'

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Push Notification Demo</title>
</head>
<body>
    <h2>Hello</h2>
    <button class="js-push-btn" style="display: none;">
        Subscribe Push Messaging
    </button>

    <script src="main.js"></script>
</body>
</html>';
