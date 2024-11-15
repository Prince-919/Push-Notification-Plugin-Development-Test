const NotificationService = require("../services/notification-service");

const sendFirebaseNotification = async (req, res) => {
  const { title, body, deviceToken } = req.body;
  try {
    await NotificationService.sendNotification(deviceToken, title, body);
    res
      .status(200)
      .json({ message: "Notification send successfully.", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending notification.", success: false });
  }
};
const sendMultipleFirebaseNotification = async (req, res) => {
  const { title, body, deviceTokens } = req.body;
  try {
    await NotificationService.sendMultipleNotification(
      deviceTokens,
      title,
      body
    );
    res
      .status(200)
      .json({ message: "Notification send successfully.", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending notification.", success: false });
  }
};

const sendEveryMinuteNotification = async () => {
  const title = "Every minute notification";
  const body = "This is a test notification sent every minute.";
  const deviceToken =
    "ehgEiFJR4dCPVzLLPOurWD:APA91bHHlKM-QmKPQGZ9wB1eU4sUhQwul9e3kz5pBm1YvLx2ie2VMl0X2BBtIXbj-Z7hBNFYTLwRYgx6Q9rViMq2G_ZmQ454g9QhhD0eDaA3uuZTpm5NYnQ";
  await NotificationService.sendNotification(deviceToken, title, body);
};

module.exports = {
  sendFirebaseNotification,
  sendEveryMinuteNotification,
  sendMultipleFirebaseNotification,
};
