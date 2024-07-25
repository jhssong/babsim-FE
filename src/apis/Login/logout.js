import { auth, signOut } from '../firebase/authLogin';
import { getLoggedInPlatform, resetLoginStorage } from './localStorage';

async function googleLogout() {
  signOut(auth)
    .then(() => {
      console.log('Google logged out');
      resetLoginStorage();
      return true;
    })
    .catch(function () {
      console.log('Google logged out failed');
      return false;
    });
}

async function kakaoLogout() {
  Kakao.Auth.logout()
    .then(function () {
      console.log('Kakao logged out');
      resetLoginStorage();
      return true;
    })
    .catch(function () {
      console.log('Kakao logged out failed');
      return false;
    });
}

export default async function logout(navigate, setIsTryingToLogin) {
  setIsTryingToLogin(true);
  try {
    const platform = getLoggedInPlatform();
    let status;
    if (platform == 'google') status = await googleLogout();
    else if (platform == 'kakao') status = await kakaoLogout();
    if (status) {
      alert('로그아웃되었습니다.');
      navigate('/');
    }
  } catch (error) {
    alert('로그아웃에 실패했습니다.');
    console.error(error);
  }
  setIsTryingToLogin(false);
}
