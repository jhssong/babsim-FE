import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBeuNC7ZXPQ-SZNA70D8wp3tvpPfTxBOss',
  authDomain: 'babsim-82a16.firebaseapp.com',
  projectId: 'babsim-82a16',
  storageBucket: 'babsim-82a16.appspot.com',
  messagingSenderId: '811147853821',
  appId: '1:811147853821:web:39bb3a0a148c2bfa676394',
  measurementId: 'G-FJZB273F1B',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();

export {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
};

export { ref, getDownloadURL, uploadBytes };
