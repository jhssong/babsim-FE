import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import RecipeEdit from './RecipeEdit';
import getRecipeInfo from '../../apis/Recipe/RecipeInfo/getRecipeInfo';
import getReviews from '../../apis/Reviews/getReviews';

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  padding-inline: 1rem;

  button:nth-child(1) {
    width: 42%;
  }
  button:nth-child(2) {
    width: 55%;
  }
`;

const RecipeInfo = () => {
  const { recipeId } = useParams();
  const [isLoading, setIsLoading] = useState(true); // Backend API 구현 후 true로 변경
  const [isReviewMore, setIsReviewMore] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isForkOpen, setIsForkOpen] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState([]);

  // 레시피 정보 GET 요청
  const fetchRecipeInfo = async () => {
    const json = await getRecipeInfo(recipeId, 1);
    setRecipeInfo(json);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRecipeInfo();
  }, [recipeId]);

  useEffect(() => {
    fetchRecipeInfo();
  }, [isReviewMore, isForkOpen]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isReviewMore) {
    return <RecipeReviews onBackBtnClick={setIsReviewMore} />;
  }

  if (isForkOpen) {
    return <RecipeEdit mode="fork" onBackBtnClick={setIsForkOpen} />;
  }

  return (
    <>
      <AppBarWithTitle title="" rightIcon="share" />
      <RecipeInfoImage imgs={recipeInfo.recipeImgs} isLoading={isLoading} />
      <RecipeInformation recipeInfo={recipeInfo} isLoading={isLoading} />
      <Divider />
      <AllergyInfo allergies={recipeInfo.allergies} />
      <Divider />
      <NutritionInfo />
      <Divider />
      <IngredientInfo ingredients={recipeInfo.ingredients} />
      <Divider />
      <Typography variant="h5" sx={{ padding: '1rem' }}>
        레시피
      </Typography>
      <CookeryInfo
        images={recipeInfo.recipeDetailImgs}
        descs={recipeInfo.recipeContents}
        timers={recipeInfo.recipeTimers}
      />
      <Divider />
      <ReviewInfo reviews={recipeInfo.reviews} />
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}>
        <Button onClick={() => setIsReviewMore(true)}>리뷰 더보기</Button>
      </Box>
      <Divider />
      <BottomContainer>
        <Button
          onClick={() => setIsForkOpen(true)}
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
  );
};

export default RecipeInfo;
