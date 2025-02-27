// Import Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Your Firebase config from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyDY2meYSamcK384GprIFJI89UTtJWy688o",
    authDomain: "art-circle-drama.firebaseapp.com",
    projectId: "art-circle-drama",
    storageBucket: "art-circle-drama.firebasestorage.app",
    messagingSenderId: "441181143245",
    appId: "1:441181143245:web:d47f42acc62f6e54db2984"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

console.log("Firebase initialized:", app.name);

