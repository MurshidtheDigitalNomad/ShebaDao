import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAVWzGb7Qq9tHRgNeP7FRJIliju-Utq5A",
  authDomain: "shebadao-89e01.firebaseapp.com",
  projectId: "shebadao-89e01",
  storageBucket: "shebadao-89e01.firebasestorage.app",
  messagingSenderId: "363479168619",
  appId: "1:363479168619:web:1850cf2e8057cd8d1a232e",
  measurementId: "G-X41KTQVSG4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, analytics };
