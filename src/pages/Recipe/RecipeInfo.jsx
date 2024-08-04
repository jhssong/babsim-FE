import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppBarWithTitle } from '../../components/AppBar';
import { Alert, Backdrop, Box, Button, CircularProgress, Divider, Snackbar, Typography } from '@mui/material';
import RecipeInformation, { RecipeInfoImage } from './RecipeInfo/RecipeInformation';
import AllergyInfo from './RecipeInfo/AllergyInfo';
import NutritionInfo from './RecipeInfo/NutritionInfo';
import IngredientInfo from './RecipeInfo/IngredientInfo';
import CookeryInfo from './RecipeInfo/CookeryInfo';
import ReviewInfo from './RecipeInfo/ReviewInfo';
import { CallSplitOutlined, Edit, LocalDiningOutlined } from '@mui/icons-material';
import styled from '@emotion/styled';
import RecipeReviews from './RecipeReviews';
import RecipeEdit from './RecipeEdit';
import getRecipeInfo from '../../apis/Recipe/RecipeInfo/getRecipeInfo';
import Cook from './Cook';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../../recoil/atoms';

const BottomContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem;
  padding-inline: 1rem;

  #editBtn {
    width: 5%;
  }
  #forkBtn {
    width: 30%;
  }
  #cookBtn {
    width: 50%;
  }
`;

const RecipeInfo = () => {
  const userData = useRecoilValue(userDataState);

  const { recipeId } = useParams();
  const [isLoading, setIsLoading] = useState(true); // Backend API 구현 후 true로 변경
  const [isReviewMore, setIsReviewMore] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isForkOpen, setIsForkOpen] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [cook, setCook] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // 레시피 정보 GET 요청
  const fetchRecipeInfo = async (userId) => {
    const json = await getRecipeInfo({ recipeId, memberId: userId });
    setRecipeInfo(json);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userData !== null && userData !== undefined) {
      fetchRecipeInfo(userData.id);
    }
  }, [recipeId, userData]);

  useEffect(() => {
    if (userData !== null && userData !== undefined) {
      fetchRecipeInfo(userData.id);
    }
  }, [isReviewMore, isForkOpen, userData]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  if (isLoading) {
    return (
      <Backdrop open={true} sx={{ color: '#fff', zIndex: 10000 }}>
        <CircularProgress variantcolor="primary" />
      </Backdrop>
    );
  }

  if (isReviewMore) {
    return <RecipeReviews onBackBtnClick={setIsReviewMore} />;
  }

  if (isForkOpen) {
    return (
      <RecipeEdit
        mode="fork"
        onBackBtnClick={setIsForkOpen}
        setState={setIsForkOpen}
        onComplete={setSnackbarOpen}
      />
    );
  }

  if (cook) {
    return <Cook recipe={recipeInfo} handleBack={() => setCook(false)} />;
  }

  return (
    <>
      <AppBarWithTitle title="" rightIcon="share" />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          레시피 포크를 완료했어요!
        </Alert>
      </Snackbar>
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
        imgIds={recipeInfo.recipeDetailImgs}
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
          id="forkBtn"
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
          id="cookBtn"
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
          color="primary"
          onClick={() => setCook(true)}>
          <Typography variant="button" fontWeight="bold">
            요리하기
          </Typography>
        </Button>
        {recipeInfo.editable && (
          <Button
            id="editBtn"
            component={Link}
            to={`/recipe/edit/${recipeInfo.id}`}
            variant="outlined"
            color="primary"
            sx={{ maxWidth: '1rem' }}>
            <Edit
              sx={{
                minWidth: 'auto',
                minHeight: 'auto',
                padding: 0,
                width: '32px',
                height: '32px',
              }}
            />
          </Button>
        )}
      </BottomContainer>
    </>
  );
};

export default RecipeInfo;
