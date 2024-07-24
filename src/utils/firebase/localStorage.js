const loggedInPlatformKey = 'loggedInPlatformKey';
const loginTokenKey = 'loginTokenKey';

export function loggedInWithGoogle() {
  localStorage.setItem(loggedInPlatformKey, 'google');
}

export function loggedInWithKakao() {
  localStorage.setItem(loggedInPlatformKey, 'kakao');
}

export function getLoggedInPlatform() {
  return localStorage.getItem(loggedInPlatformKey);
}

export function saveLoginToken(key) {
  localStorage.setItem(loginTokenKey, key);
}

export function getLoginToken() {
  return localStorage.getItem(loginTokenKey);
}
