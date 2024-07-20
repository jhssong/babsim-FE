import styled from '@emotion/styled';

import { AppBarWithLogo } from '../../components/AppBar';
import NavBar from '../../components/NavBar';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../recoil/atoms';

const Container = styled.div`
  display: flex;
  padding: 1rem 0rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  flex: 1 0 0;
  align-self: stretch;
  overflow-y: auto;
  height: calc(100vh - 7rem);
`;

const Market = () => {
  const isLoggined = useRecoilValue(loginState).isLoggedIn;

  return (
    <>
      <AppBarWithLogo />
      <Container></Container>

      <NavBar page="market" />
    </>
  );
};

export default Market;
