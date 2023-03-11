// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCm-8y-ADNfT8-lIvVhNCb-qwrQ0AnU1gs',
  authDomain: 'enhanced-chatgpt-817cb.firebaseapp.com',
  projectId: 'enhanced-chatgpt-817cb',
  storageBucket: 'enhanced-chatgpt-817cb.appspot.com',
  messagingSenderId: '660158656288',
  appId: '1:660158656288:web:febf6031969c409bfab145',
  measurementId: 'G-MNTQMQVQ4Z',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
