// @ts-ignore
import { useEffect } from 'react';
// @ts-ignore
import KakaoLoginPNG from '../../assets/images/kakao_login_medium_narrow.png';

const KakaoLoginBtn = ({ setIsLoading, setLoginData, setIsLoggedIn }) => {
  async function openKakaoLogin() {
    setIsLoading(true);
    await fetch('http://localhost:8080/api/members/kakao/redirect', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.url) {
          window.location.href = data.url;
        }
      });
  }

  async function loginToKakao(code) {
    await fetch('http://localhost:8080/api/members/kakao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        code: code,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoginData(data);
        setIsLoading(false);
        setIsLoggedIn(true);
      });
  }

  function hasSpecificParam() {
    const params = new URLSearchParams(window.location.search);
    return params.has('code');
  }

  useEffect(() => {
    if (hasSpecificParam()) {
      const code = new URL(document.location.toString()).searchParams.get('code');
      loginToKakao(code);
    }
  }, []);

  return <img src={KakaoLoginPNG} onClick={openKakaoLogin} />;
};

export default KakaoLoginBtn;
