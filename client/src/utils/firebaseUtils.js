import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDPmG1LWFQOzLynVmZbkFw_lPAOW-lxh68",
  authDomain: "push-notification-system-96025.firebaseapp.com",
  projectId: "push-notification-system-96025",
  storageBucket: "push-notification-system-96025.firebasestorage.app",
  messagingSenderId: "126426490396",
  appId: "1:126426490396:web:c563a50deb01f9756ca1d9",
  measurementId: "G-71KL4G368F",
};

const vapidKey =
  "BDqimURILSEYqilFyv9E-Zc1feht2I_QrndNDOP1PhBd__xOfnZw3YOiHR1gIWDRWj7tLeyXxr9k8_IevwL_q8Y";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestFCMToken = async () => {
  return Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        return getToken(messaging, { vapidKey });
      } else {
        throw new Error("Notification not granted");
      }
    })
    .catch((err) => {
      console.error("Error requesting token: ", err);
      throw err;
    });
};

export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
};
