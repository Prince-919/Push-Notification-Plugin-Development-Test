/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDPmG1LWFQOzLynVmZbkFw_lPAOW-lxh68",
  authDomain: "push-notification-system-96025.firebaseapp.com",
  projectId: "push-notification-system-96025",
  storageBucket: "push-notification-system-96025.firebasestorage.app",
  messagingSenderId: "126426490396",
  appId: "1:126426490396:web:c563a50deb01f9756ca1d9",
  measurementId: "G-71KL4G368F",
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("receive background message", payload);
});
