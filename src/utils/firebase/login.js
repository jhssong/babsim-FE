import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { auth } from './firebase';

const provider = new GoogleAuthProvider();

export async function googleLoginWithPopup() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const loginData = {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      img: user.photoURL,
    };
    return loginData;
  } catch (error) {
    console.error('[Firebase/Auth] code: ' + error.code + ' msg: ' + error.message);
    return {};
  }
}

// export async function googleLoginWithRedirect() {
//   try {
//     await signInWithRedirect(auth, provider);
//   } catch (error) {
//     console.error('[Firebase/Auth] code: ' + error.code + ' msg: ' + error.message);
//     return {};
//   }
// }

// export async function getRedirectResultData() {
//   try {
//     const result = await getRedirectResult(auth);
//     if (result) {
//       const user = result.user;
//       const loginData = {
//         id: user.uid,
//         name: user.displayName,
//         email: user.email,
//         img: user.photoURL,
//       };
//       console.log(loginData);
//       return loginData;
//     } else {
//       console.log('No redirect result available.');
//       return null;
//     }
//   } catch (error) {
//     console.error('[Firebase/Auth] code: ' + error.code + ' msg: ' + error.message);
//     return null;
//   }
// }

export async function googleLogout() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
