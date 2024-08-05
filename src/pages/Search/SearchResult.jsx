/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled';

import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { getSearchResult } from '../../apis/Search/getSearchResult';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInState, userDataState } from '../../recoil/atoms';
import { GridCardList } from '../../components/CardList';
import { VCard } from '../../components/Card';
import { Box, Switch, Typography } from '@mui/material';
import { AppBarWithTitle } from '../../components/AppBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 3rem);
`;

const SearchResult = ({ keyword }) => {
  let navigate = useNavigate();
  const isLoggined = useRecoilValue(isLoggedInState);
  const userData = useRecoilValue(userDataState);

  const [allergy, setAllergy] = useState(false);
  const [recipesData, setRecipesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResult = async (keyword) => {
      try {
        const data = await getSearchResult(keyword);
        setRecipesData(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchSearchResult(keyword);
  }, []);

  const filteredRecipes = (recipesData || []).filter((recipe) => {
    if (!allergy) return true; // 알레르기 필터링을 사용하지 않는 경우
    if (!recipe.allergies) return true; // allergies 속성이 없는 경우 필터에서 제외하지 않음
    if (!isLoggined) return true;
    return !recipe.allergies.some((allergy) => userData.allergies.includes(allergy));
  });

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <AppBarWithTitle title="검색 결과" />
      {filteredRecipes.length === 0 ? (
        <Container>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
            }}>
            <Typography variant="body1" color="primary">
              검색 결과가 없습니다.
            </Typography>
          </Box>
        </Container>
      ) : (
        <Container>
          {isLoggined ? <AllergyFilter allergy={allergy} setAllergy={setAllergy} /> : <></>}
          <GridCardList>
            {filteredRecipes.map((recipe, index) => (
              <VCard
                key={recipe.id}
                product={recipe}
                index={index}
                type="recipe"
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              />
            ))}
          </GridCardList>
        </Container>
      )}
    </>
  );
};

const AllergyFilterContainer = styled.div`
  display: flex;
  padding: 0rem 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  align-self: stretch;
`;

const AllergyFilter = ({ allergy, setAllergy }) => {
  return (
    <AllergyFilterContainer>
      <Typography variant="caption" sx={{ color: 'subbackground.main' }}>
        알레르기 필터
      </Typography>
      <Switch defaultChecked color="primary" onChange={() => setAllergy(!allergy)} />
    </AllergyFilterContainer>
  );
};

export default SearchResult;
