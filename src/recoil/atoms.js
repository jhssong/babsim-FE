import { atom } from 'recoil';

export const loginState = atom({
  key: 'loginState',
  default: {
    isLoggedIn: false,
    user: null,
  },
});

export const userDataState = atom({
  key: 'userDataState',
  default: null,
});

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
});

export const isTryingToLoginState = atom({
  key: 'isTryingToLoginState',
  default: false,
});
