const loggedInPlatformKey = 'loggedInPlatformKey';
const loginTokenKey = 'loginTokenKey';

export function saveLoggedInPlatform(platform) {
  localStorage.setItem(loggedInPlatformKey, platform);
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

export function resetLoginStorage() {
  localStorage.clear(loggedInPlatformKey);
  localStorage.clear(loginTokenKey);
}
