
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  projectId: "civiq-voting-assistant-v2",
  appId: "1:250448331299:web:347cb5e2c50f9adcb92796",
  storageBucket: "civiq-voting-assistant-v2.firebasestorage.app",
  apiKey: "AIzaSyA5mt6lD99eCPbgk2lBPJRBo5wbY2YorNE",
  authDomain: "civiq-voting-assistant-v2.firebaseapp.com",
  messagingSenderId: "250448331299"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
