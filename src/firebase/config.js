// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth, initializeAuth, getReactNativePersistence, signOut } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCKDIrv6zHPUsxw2oCBIedkYA0HIzq8Kaw",
  authDomain: "first-react-native-da1b0.firebaseapp.com",
  databaseURL: "https://first-react-native-da1b0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "first-react-native-da1b0",
  storageBucket: "first-react-native-da1b0.appspot.com",
  messagingSenderId: "752846044176",
  appId: "1:752846044176:web:175d93e95f04fe5b165e95",
  measurementId: "G-K9107QRKCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);