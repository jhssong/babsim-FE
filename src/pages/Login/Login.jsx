// @ts-ignore
import AppLogoPNG from '../../assets/images/logo512.png';
import styled from '@emotion/styled';
import GoogleLoginBtn from './GoogleLoginBtn';
import KakaoLoginBtn from './KakaoLoginBtn';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { googleLoginWithPopup, googleLogout } from '../../utils/firebase/login';

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

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState(null);

  useEffect(() => {
    if (loginData != null) {
      console.log(loginData);
      setIsLoggedIn(true);
    }
  }, [loginData]);

  return isLoading ? (
    <LoadingWrapper>
      <CircularProgress />
    </LoadingWrapper>
  ) : (
    <Wrapper>
      {isLoggedIn ? 'hello world' : 'not logged in'}
      <img src={AppLogoPNG} width={256} height={256} />
      <GoogleLoginBtn setIsLoading={setIsLoading} setLoginData={setLoginData} />
      <KakaoLoginBtn />
    </Wrapper>
  );
};

export default Login;
