// @ts-ignore
import AppLogoPNG from '../../assets/images/logo512.png';
import styled from '@emotion/styled';
import GoogleLoginBtn from './GoogleLoginBtn';
import KakaoLoginBtn from './KakaoLoginBtn';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const Divider16 = styled.div`
  height: 1rem;
`;
const BeforeLogin = ({ setLoginLevel, setLoginData }) => {
  return (
    <Wrapper>
      <img src={AppLogoPNG} width={256} height={256} />
      <GoogleLoginBtn setLoginData={setLoginData} setLoginLevel={setLoginLevel} />
      <Divider16 />
      <KakaoLoginBtn setLoginData={setLoginData} setLoginLevel={setLoginLevel} />
      <Divider16 />
    </Wrapper>
  );
};

export default BeforeLogin;
