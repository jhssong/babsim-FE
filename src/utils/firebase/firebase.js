import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

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

const provider = new GoogleAuthProvider();

const auth = getAuth();

async function googleLoginPopup() {
  await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      //   const token = credential.accessToken;
      const user = result.user;

      const loginData = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        img: user.photoURL,
      };
      console.log(loginData);
      return loginData;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // const email = error.customData.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.error('[Firebase/Auth] code: ' + errorCode + ' msg: ' + errorMessage);
      return {};
    });
}

export { googleLoginPopup };
