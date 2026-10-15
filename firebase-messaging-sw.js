/* SSE Reporting App V48: Firebase background push handler.
   Firebase Console config values must match index.html. */
importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js');
firebase.initializeApp({
  apiKey: 'AIzaSyApenAy7aZvJHqhBNgfU3rmeyMR9QJsrvo',
  authDomain: 'sse-reporting-app.firebaseapp.com',
  projectId: 'sse-reporting-app',
  storageBucket: 'sse-reporting-app.firebasestorage.app',
  messagingSenderId: '287733224796',
  appId: '1:287733224796:web:e54f3162198158f7861d99'
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
