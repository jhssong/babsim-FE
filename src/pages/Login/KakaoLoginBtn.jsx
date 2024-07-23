import { useEffect } from 'react';
// @ts-ignore
import KakaoLoginPNG from '../../assets/images/kakao_login_medium_narrow.png';
import { useNavigate } from 'react-router-dom';

const KakaoLoginBtn = ({ onHandleLoginSuccess }) => {
  const navigate = useNavigate();

  async function openKakaoLogin() {
    await fetch('http://localhost:8080/api/members/kakao/redirect', {
      headers: {
        'Content-Type': 'application/json',
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
      },
      body: JSON.stringify({
        code: code,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to login to kakao');
        }
        return response.json();
      })
      .then((data) => {
        onHandleLoginSuccess(data);
      });
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
