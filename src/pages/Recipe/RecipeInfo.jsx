import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppBarWithTitle } from '../../components/AppBar';
import { Box, Button, Divider, Typography } from '@mui/material';
import RecipeInformation, { RecipeInfoImage } from './RecipeInfo/RecipeInformation';
import AllergyInfo from './RecipeInfo/AllergyInfo';
import NutritionInfo from './RecipeInfo/NutritionInfo';
import IngredientInfo from './RecipeInfo/IngredientInfo';
import CookeryInfo from './RecipeInfo/CookeryInfo';
import ReviewInfo from './RecipeInfo/ReviewInfo';
import { CallSplitOutlined, LocalDiningOutlined } from '@mui/icons-material';
import styled from '@emotion/styled';
import RecipeReviews from './RecipeReviews';

// dummy data
const recipe = {
  id: '12345',
  imgURLs: [
    'https://d2v80xjmx68n4w.cloudfront.net/gigs/fPoZ31584321311.jpg?w=652',
    'https://d2v80xjmx68n4w.cloudfront.net/gigs/5s8Hq1584287799.jpg?w=652',
  ],
  name: '짱구 도시락',
  description: '짱구가 어디갈 때 먹는 도시락',
  rate: 4,
  difficulty: '초급',
  cookingTime: 10,
  tags: ['짱구', '도시락', '초간단'],
  allergys: ['gluten', 'peanuts', 'shellfish'],
  ingredients: [
    { name: '방울토마토', amount: 1 },
    { name: '계란', amount: 1 },
    { name: '양상추', amount: 1 },
    { name: '소세지', amount: 10 },
  ],
  reviews: [
    {
      name: 'User1',
      rating: 5,
      registerDate: '24.01.10',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      forkedRecipe: null,
    },
    {
      name: 'User2',
      rating: 4,
      registerDate: '24.09.30',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      forkedRecipe: 123456,
    },
    {
      name: 'User3',
      rating: 4.5,
      registerDate: '24.03.12',
      comment: 'Loved it, will make again.',
      forkedRecipe: 999999,
    },
    {
      name: 'User1',
      rating: 5,
      registerDate: '24.01.10',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      forkedRecipe: null,
    },
    {
      name: 'User2',
      rating: 4,
      registerDate: '24.09.30',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      forkedRecipe: 123456,
    },
    {
      name: 'User3',
      rating: 4.5,
      registerDate: '24.03.12',
      comment: 'Loved it, will make again.',
      forkedRecipe: 999999,
    },
  ],
  recipeImgs: ['https://example.com/step1.jpg', 'https://example.com/step2.jpg'],
  recipeDescs: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cook the vegetables in a pan.',
  ],
  recipeTimers: [10, 120],
};

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  padding-inline: 1rem;

  button:nth-child(1) {
    width: 35%;
  }
  button:nth-child(2) {
    width: 55%;
  }
`;

const RecipeInfo = () => {
  const navigate = useNavigate();

  const { recipeId } = useParams();
  const [isLoading, setIsLoading] = useState(false); // Backend API 구현 후 true로 변경
  const [isReviewMore, setIsReviewMore] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState([]);

  const getRecipeInfo = async () => {
    const json = await (await fetch(` http://localhost:5173/api/recipe/${recipeId}`)).json();
    setRecipeInfo(json);
    isLoading(false);
  };
  useEffect(() => {
    getRecipeInfo();
  }, []);

  return (
    <>
      {isReviewMore ? (
        <RecipeReviews onBackBtnClick={setIsReviewMore} />
      ) : (
        <>
          <AppBarWithTitle title="" rightIcon="share" />
          <RecipeInfoImage imgs={recipe.imgURLs} isLoading={isLoading} />
          <RecipeInformation recipeInfo={recipe} isLoading={isLoading} />
          <Divider />
          <AllergyInfo allergys={recipe.allergys} />
          <Divider />
          <NutritionInfo />
          <Divider />
          <IngredientInfo ingredients={recipe.ingredients} />
          <Divider />
          <Typography variant="h5" sx={{ padding: '1rem' }}>
            레시피
          </Typography>
          <CookeryInfo
            images={recipe.recipeImgs}
            descs={recipe.recipeDescs}
            timers={recipe.recipeTimers}
          />
          <Divider />
          <ReviewInfo reviews={recipe.reviews} />
          <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}>
            <Button onClick={() => setIsReviewMore(true)}>리뷰 더보기</Button>
          </Box>
          <Divider />
          <BottomContainer>
            <Button
              startIcon={
                <CallSplitOutlined
                  sx={{
                    minWidth: 'auto',
                    minHeight: 'auto',
                    padding: 0,
                    width: '32px',
                    height: '32px',
                  }}
                />
              }
              variant="contained"
              color="primary">
              <Typography variant="button" fontWeight="bold">
                포크하기
              </Typography>
            </Button>
            <Button
              startIcon={
                <LocalDiningOutlined
                  sx={{
                    minWidth: 'auto',
                    minHeight: 'auto',
                    padding: 0,
                    width: '32px',
                    height: '32px',
                  }}
                />
              }
              variant="contained"
              color="primary">
              <Typography variant="button" fontWeight="bold">
                요리하기
              </Typography>
            </Button>
          </BottomContainer>
        </>
      )}
    </>
  );
};

export default RecipeInfo;
