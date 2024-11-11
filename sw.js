self.addEventListener('install', function(event) {
    // Ensures that the service worker activates immediately after installation
    self.skipWaiting();
});

self.addEventListener('push', function(event) {
    // Check if notifications are supported and permission is granted
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    // Parsing the push data from the event
    var pushData = event.data.json();

    // Prepare notification options
    const options = {
        body: pushData.body || '',  // Default to empty if body is not provided
        icon: pushData.icon || '',  // Default to empty if icon is not provided
        badge: pushData.badge || '',  // Default to empty if badge is not provided
        data: pushData.extraData || {}  // Default to empty object if extraData is not provided
    };

    // Show the notification with the title and options
    event.waitUntil(self.registration.showNotification(pushData.title, options));
});

self.addEventListener('notificationclick', function(event) {
    // Close the notification when clicked
    event.notification.close();

    // Open the link specified in the notification data
    event.waitUntil(
        // Ensure we only open a window if a valid URL is present
        clients.openWindow(event.notification.data ? event.notification.data : '/')
    );
});


