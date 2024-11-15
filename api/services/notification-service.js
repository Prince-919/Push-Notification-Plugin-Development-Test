const admin = require("../utils/firebase");

class NotificationService {
  static async sendNotification(deviceToken, title, body) {
    const message = {
      notification: {
        title,
        body,
      },
      token: deviceToken,
    };
    try {
      const res = await admin.messaging().send(message);
      return res;
    } catch (error) {
      throw error;
    }
  }
  static async sendMultipleNotification(deviceTokens, title, body) {
    const messages = deviceTokens.map((token) => ({
      notification: {
        title,
        body,
      },
      token: token,
    }));
    try {
      const res = await admin.messaging().sendEach(messages);
      return res;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = NotificationService;
