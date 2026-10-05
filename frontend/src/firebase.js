import { initializeApp } from 'firebase/app';
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from 'firebase/messaging';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBys0v7DClekPb1WB7Xn-Hw7MzfbjVAM24',
  authDomain: 'lucky-moon-22350.firebaseapp.com',
  databaseURL: 'https://lucky-moon-22350-default-rtdb.firebaseio.com',
  projectId: 'lucky-moon-22350',
  storageBucket: 'lucky-moon-22350.appspot.com',
  messagingSenderId: '798670297748',
  appId: '1:798670297748:web:80637ae5ded34f52113281',
  measurementId: 'G-SG7FVYXRQC',
};
// const FIREBASE_CONFIG = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

const firebaseApp = initializeApp(FIREBASE_CONFIG);

function requestPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification Enabled');
    }
  });
}

const messaging = (async () => {
  requestPermission();
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    } else {
      requestPermission();
    }
    console.log('Firebase not supported this browser');
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
})();

// const messaging = getMessaging(firebaseApp)

export default messaging;

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      alert(payload)
      resolve(payload);
    });
  });

export const fetchToken = () => {
  const new_messaging = getMessaging(firebaseApp);
  return getToken(new_messaging, {
    vapidKey:
      'BFJkUBRTDmw9VIZT43C5xuwkMTnq0gK9C06b_pZ_h5Ea6pmCIQpzaIjOSLishQgNWVHH31gnPqNCzsnaeP_q4-Q',
  });
};
