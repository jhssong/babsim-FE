import { useEffect } from 'react';

import KakaoLoginPNG from '../../assets/images/kakao_login_medium_narrow.png';
import { useNavigate } from 'react-router-dom';
import { saveLoggedInPlatform, saveLoginToken } from '../../apis/Login/localStorage';

const KakaoLoginBtn = ({ onHandleLoginSuccess }) => {
  const navigate = useNavigate();

  async function openKakaoLogin() {
    const response = await fetch('http://localhost:8080/api/members/kakao/redirect', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Failed to create periodical donation');
    const responseData = await response.json();
    if (responseData.url) window.location.href = responseData.url;
  }

  async function loginToKakao(code) {
    const response = await fetch('http://localhost:8080/api/members/kakao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: code,
      }),
    });

    if (!response.ok) throw new Error('Failed to create periodical donation');
    const userData = await response.json();
    saveLoggedInPlatform('kakao');
    saveLoginToken(userData.id);
    onHandleLoginSuccess(userData);
  }

  function hasSpecificParam() {
    const params = new URLSearchParams(window.location.search);
    return params.has('code');
  }

  useEffect(() => {
    if (hasSpecificParam()) {
      const code = new URL(document.location.toString()).searchParams.get('code');
      navigate('/login', { replace: true });
      loginToKakao(code);
    }
  }, []);

  return <img src={KakaoLoginPNG} onClick={openKakaoLogin} />;
};

export default KakaoLoginBtn;
