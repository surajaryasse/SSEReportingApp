/* SSE Reporting App V48: Firebase background push handler.
   Firebase Console config values must match index.html. */
importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js');
firebase.initializeApp({
  apiKey: 'AIzaSyC2zProdMT3dY3DX3UW3a8N9bMHO0BEAnE',
  authDomain: 'ssereportingapp-1-54141.firebaseapp.com',
  projectId: 'ssereportingapp-1-54141',
  storageBucket: 'ssereportingapp-1-54141.firebasestorage.app',
  messagingSenderId: '338762287938',
  appId: '1:338762287938:web:3c9abd7bdc0b1a29b556db'
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage(payload => {
  const title = payload?.notification?.title || 'SSE Reporting App';
  const options = { body: payload?.notification?.body || 'आपके लिए नया अपडेट आया है।', data: { url: '/' }, tag: payload?.data?.eventId || 'sse-update' };
  self.registration.showNotification(title, options);
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const client of list) { if ('focus' in client) return client.focus(); }
    if (clients.openWindow) return clients.openWindow('/');
  }));
});
