// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth, initializeAuth, getReactNativePersistence, signOut } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { decode } from "base-64";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
if (typeof atob === "undefined") {
  global.atob = decode;
}

const firebaseConfig = {
  apiKey: "AIzaSyBWbEfDxp7NyjZ9O0Nqr0WEcpVmSSq2_4A",
  authDomain: "react-native-first-65935.firebaseapp.com",
  projectId: "react-native-first-65935",
  storageBucket: "react-native-first-65935.appspot.com",
  messagingSenderId: "798326149906",
  appId: "1:798326149906:web:a700e4f6f4afd2695ad9cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const fireStore = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);