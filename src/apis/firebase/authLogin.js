import { resetLoginStorage } from '../Login/localStorage';
import {
  auth,
  setPersistence,
  browserLocalPersistence,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from './firebase';

const provider = new GoogleAuthProvider();

export async function googleLoginWithPopup() {
  try {
    const persistence = await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const loginData = {
      id: 'google&' + user.uid,
      name: user.displayName,
      email: user.email,
      img: user.photoURL,
    };
    return loginData;
  } catch (error) {
    console.error('[Firebase/Auth] code: ' + error.code + ' msg: ' + error.message);
    return null;
  }
}

export async function googleLogout() {
  try {
    await signOut(auth);
    console.log('Google logged out');
    resetLoginStorage();
    return true;
  } catch (error) {
    console.error(error);
    console.log('Google logged out failed');
    return false;
  }
}
