import styled from '@emotion/styled';
import { AppBarWithLogo } from '../../components/AppBar';
import NavBar from '../../components/NavBar';
import WeeklyRecipe from './WeeklyRecipe';
import RecommendedProduct from './RecommendedProduct';
import RecommendedRecipe from './RecommendedRecipe';
import { useRecoilValue } from 'recoil';
import { isLoggedInState, userDataState } from '../../recoil/atoms';

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

/*
레시피 조회 API
{path} : recipeId
@memberID (nullable) (String)
*/
async function getRecipeInfo(recipeId, memberId) {
  let url = 'http://localhost:8080/api/recipes/' + recipeId;
  // // Query Parameter를 추가 (memberID가 있는 경우에만)
  if (memberId) {
    const queryParams = new URLSearchParams({ memberId });
    url += '?' + queryParams.toString();
  }

  console.log(`${url} and working`);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get recipe info');
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}

const Home = () => {
  const isLoggined = useRecoilValue(isLoggedInState);

  return (
    <>
      <AppBarWithLogo />
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
