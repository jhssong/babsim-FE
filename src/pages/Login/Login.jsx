import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import BeforeLogin from './BeforeLogin';
import UserInfoSetting from './UserInfoSetting';
import UserAllergySetting from './UserAllergySetting';

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
  const [loginLevel, setLoginLevel] = useState(0);
  const [loginData, setLoginData] = useState(null);
  const [body, setBody] = useState(<div></div>);

  useEffect(() => {
    switch (loginLevel) {
      case -1:
        setBody(
          <LoadingWrapper>
            <CircularProgress />
          </LoadingWrapper>
        );
        break;
      case 0:
        setBody(<BeforeLogin setLoginLevel={setLoginLevel} setLoginData={setLoginData} />);
        break;
      case 1:
        setBody(
          <UserInfoSetting
            loginData={loginData}
            setLoginData={setLoginData}
            setLoginLevel={setLoginLevel}
          />
        );
        break;
      case 2:
        setBody(<UserAllergySetting loginData={loginData} setLoginLevel={setLoginLevel} />);
        break;
      default:
        break;
    }
  }, [loginLevel]);

  return body;
};

export default Login;
