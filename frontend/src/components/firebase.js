import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDA-0gs4I_vcXvcOWj8t5L702ga0g1Nrq8",
    authDomain: "bloguser-a5493.firebaseapp.com",
    projectId: "bloguser-a5493",
    storageBucket: "bloguser-a5493.firebasestorage.app",
    messagingSenderId: "512147835719",
    appId: "1:512147835719:web:272beb084b5a8808491a62",
    measurementId: "G-42NZJ4WJZS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
