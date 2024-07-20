import AppLogoPNG from '../../assets/images/logo512.png';
import styled from '@emotion/styled';
import GoogleLoginBtn from './GoogleLoginBtn';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';

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
  const [loginData, setLoginData] = useState({});

  function handleClickBtn() {
    setIsLoading(true);
  }

  function handleLogin(data) {
    setLoginData(data);
    setIsLoading(false);
  }

  return isLoading ? (
    <LoadingWrapper>
      <CircularProgress />
    </LoadingWrapper>
  ) : (
    <Wrapper>
      <img src={AppLogoPNG} width={256} height={256} />
      <GoogleLoginBtn handleClick={handleClickBtn} handleLogin={handleLogin} />
    </Wrapper>
  );
};

export default Login;
