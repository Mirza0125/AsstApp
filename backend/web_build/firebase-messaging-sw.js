importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js',
);

const firebaseConfig = {
  apiKey: 'AIzaSyBys0v7DClekPb1WB7Xn-Hw7MzfbjVAM24',
  authDomain: 'lucky-moon-22350.firebaseapp.com',
  databaseURL: 'https://lucky-moon-22350-default-rtdb.firebaseio.com',
  projectId: 'lucky-moon-22350',
  storageBucket: 'lucky-moon-22350.appspot.com',
  messagingSenderId: '798670297748',
  appId: '1:798670297748:web:80637ae5ded34f52113281',
  measurementId: 'G-SG7FVYXRQC',
};
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
