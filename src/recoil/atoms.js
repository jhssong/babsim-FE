import { atom } from 'recoil';

export const loginState = atom({
  key: 'loginState',
  default: {
    isLoggedIn: true,
    user: {
      id: 1,
      name: '아이유',
      img: 'https://img.khan.co.kr/news/2023/05/12/news-p.v1.20230512.e5fffd99806f4dcabd8426d52788f51a_P1.png',
      age: '32',
      email: 'IU@naver.com',
      job: '가수',
      allergy: ['fish'],
    },
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
