/* eslint-disable react-hooks/exhaustive-deps */
import AppLogoPNG from '../../assets/images/logo512.png';
import styled from '@emotion/styled';
import GoogleLoginBtn from './GoogleLoginBtn';
import KakaoLoginBtn from './KakaoLoginBtn';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoggedInState, isTryingToLoginState, userDataState } from '../../recoil/atoms';

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
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const setUserData = useSetRecoilState(userDataState);
  const setIsTryingToLogin = useSetRecoilState(isTryingToLoginState);
  const navigate = useNavigate();

  function onHandleLoginSuccess(data) {
    setUserData(data);
    setIsTryingToLogin(true);
    navigate('/login/infoSetting');
  }

  useEffect(() => {
    if (isLoggedIn) {
      alert('이미 로그인되었습니다.');
      navigate('/');
    }
  }, []);

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
          <p onClick={() => navigate('/')}>로그인 없이 계속하기</p>
        </Wrapper>
      )}
    </>
  );
};

export default BeforeLogin;
