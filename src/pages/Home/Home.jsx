import styled from '@emotion/styled';

import { AppBarWithLogo } from '../../components/AppBar';
import NavBar from '../../components/NavBar';
import WeeklyRecipe from './WeeklyRecipe';
import RecommendedProduct from './RecommendedProduct';
import RecommendedRecipe from './RecommendedRecipe';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '../../recoil/atoms';

const Container = styled.div`
  display: flex;
  padding: 1rem 0rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  flex: 1 0 0;
  align-self: stretch;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 7rem);
`;

const Home = () => {
  const isLoggined = useRecoilValue(isLoggedInState);

  function apiTest() {
    console.log('hello world');
  }

  return (
    <>
      <AppBarWithLogo />
      <div
        onClick={apiTest}
        style={{
          backgroundColor: '#50C878',
          margin: '1rem',
          padding: '1rem',
          borderRadius: '0.5rem',
        }}>
        CLICK TO TEST API CONNECTION
      </div>
      <Container>
        <WeeklyRecipe />
        <RecommendedProduct />
        {isLoggined && <RecommendedRecipe />}
      </Container>

      <NavBar page="home" />
    </>
  );
};

export default Home;
