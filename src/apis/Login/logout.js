import { googleLogout } from '../firebase/authLogin';
import { getLoggedInPlatform, resetLoginStorage } from './localStorage';

async function kakaoLogout() {
  resetLoginStorage();
  return true;
}

export default async function logout() {
  let status;
  try {
    const platform = getLoggedInPlatform();
    if (platform == 'google') status = await googleLogout();
    else if (platform == 'kakao') status = await kakaoLogout();
    return status;
  } catch (error) {
    console.error(error);
    return false;
  }
}
