import styled from '@emotion/styled';

import { AppBarWithLogo } from '../../components/AppBar';
import NavBar from '../../components/NavBar';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { GridCardList } from '../../components/CardList';
import { VCard } from '../../components/Card';
import { useNavigate } from 'react-router-dom';
import { getRecipeForked, getRecipeLikes, getRecipeOwn } from '../../apis/Recipe/getRecipe';
import Loading from '../../components/Loading';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../../recoil/atoms';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 7rem);
`;

const Scrap = () => {
  let navigate = useNavigate();
  const [value, setValue] = useState('fork');
  const userData = useRecoilValue(userDataState);

  const [recipesData, setRecipesData] = useState({ fork: [], like: [], my: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchScrap = async (memberId) => {
      try {
        const like = await getRecipeLikes(memberId);
        const fork = await getRecipeForked(memberId);
        const own = await getRecipeOwn(memberId);
        const data = {
          like: like,
          fork: fork,
          my: own,
        };
        console.log(data);
        setRecipesData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    // fetchScrap(1);
    fetchScrap(userData.id);
  }, []);

  const renderMessage = (value) => {
    switch (value) {
      case 'like':
        return '찜한 레시피가 존재하지 않습니다.';
      case 'fork':
        return 'fork한 레시피가 존재하지 않습니다.';
      case 'my':
        return '나의 레시피가 존재하지 않습니다.';
      default:
        return 'Error: value is not valid';
    }
  };

  const getRecipes = (value) => {
    switch (value) {
      case 'like':
        return recipesData.like;
      case 'fork':
        return recipesData.fork;
      case 'my':
        return recipesData.my;
      default:
        return [];
    }
  };

  const recipes = getRecipes(value);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <AppBarWithLogo />
      <Container>
        <CostomTabs value={value} setValue={setValue} />
        {recipes.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
            }}>
            <Typography variant="body1" color="primary">
              {renderMessage(value)}
            </Typography>
          </Box>
        ) : (
          <GridCardList>
            {recipes.map((recipe, index) => (
              <VCard
                key={recipe.id}
                product={recipe}
                index={index}
                type="recipe"
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              />
            ))}
          </GridCardList>
        )}
      </Container>

      <NavBar page="scrap" />
    </>
  );
};

const CostomTabs = ({ value, setValue }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
        sx={{
          '& .MuiTabs-flexContainer': {
            justifyContent: 'space-between',
          },
        }}>
        <Tab value="like" label="찜한 레시피" />
        <Tab value="fork" label="포크한 레시피" />
        <Tab value="my" label="나의 레시피" />
      </Tabs>
    </Box>
  );
};

export default Scrap;
