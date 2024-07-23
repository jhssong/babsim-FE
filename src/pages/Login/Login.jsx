import AppLogoPNG from '../../assets/images/logo512.png';
import styled from '@emotion/styled';
import GoogleLoginBtn from './GoogleLoginBtn';
import KakaoLoginBtn from './KakaoLoginBtn';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginState } from '../../recoil/atoms';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const LoadingWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Divider16 = styled.div`
  height: 1rem;
`;
const BeforeLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useRecoilState(loginState);
  const navigate = useNavigate();

  function onHandleLoginSuccess(data) {
    const newLoginData = { ...loginData };

    newLoginData.user = data;
    newLoginData.isLoggedIn = false;
    setLoginData(newLoginData);
    navigate('/login/infoSetting');
  }
  return (
    <>
      {isLoading ? (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      ) : (
        <Wrapper>
          <img src={AppLogoPNG} width={256} height={256} />
          <GoogleLoginBtn onHandleLoginSuccess={onHandleLoginSuccess} setIsLoading={setIsLoading} />
          <Divider16 />
          <KakaoLoginBtn onHandleLoginSuccess={onHandleLoginSuccess} />
          <Divider16 />
        </Wrapper>
      )}
    </>
  );
};

export default BeforeLogin;
