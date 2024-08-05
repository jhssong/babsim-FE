import { useEffect, useState } from 'react';
import { AppBarWithTitle } from '../../components/AppBar';
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Rating,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Review } from './RecipeInfo/ReviewInfo';
import { useParams } from 'react-router-dom';
import { Reviews, Star } from '@mui/icons-material';
import { userDataState } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';
import getForkedRecipes from '../../apis/Reviews/getForkedRecipes';
import getReviews from '../../apis/Reviews/getReviews';
import postReview from '../../apis/Reviews/postReview';
import styled from '@emotion/styled';

const labels = {
  1: '😥 별로예요',
  2: '😣 아쉬워요',
  3: '😐 괜찮아요',
  4: '😊 좋아요',
  5: '😍 최고예요!',
};

const Container = styled.div`
  height: 110vh;
`;

const RecipeReviews = ({ onBackBtnClick }) => {
  const { recipeId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [forkedRecipes, setForkedRecipes] = useState([]);
  const [selectedForkedRecipe, setSelectedForkedRecipe] = useState(null);
  const [alert, setAlert] = useState(false);

  const userData = useRecoilValue(userDataState);
  const userId = userData ? userData.id : null; // 현재 로그인된 유저 아이디

  useEffect(() => {
    // 모든 리뷰 가져오기
    const fetchReviews = async () => {
      const json = await getReviews(recipeId);
      setReviews(json.reverse());
    };
    fetchReviews();

    // 포크된 레시피 가져오기
    const fetchForkedRecipes = async () => {
      const recipes = await getForkedRecipes({ memberId: userId, forkedRecipeId: recipeId });
      setForkedRecipes(recipes);
    };
    if (userId) {
      fetchForkedRecipes();
    }
    setIsLoading(false);
  }, [isReviewModalOpen]);

  useEffect(() => {
    // 리뷰 작성 후 리뷰 다시 불러오기
    const fetchReviews = async () => {
      const json = await getReviews(recipeId);
      setReviews(json.reverse());
    };
    fetchReviews();
  }, [isReviewModalOpen]);

  const [page, setPage] = useState(1);
  const reviewsPerPage = 5;

  const handleChange = (event, value) => {
    setPage(value);
  };

  const paginatedReviews = reviews.slice((page - 1) * reviewsPerPage, page * reviewsPerPage);

  const handleIsModalOpen = () => {
    setIsReviewModalOpen(true);
  };

  const handleIsModalClose = () => {
    setIsReviewModalOpen(false);
  };

  const handleReviewModalClose = () => {
    setIsReviewModalOpen(false);
  };

  const handleSave = async () => {
    if (ratingValue !== null && reviewText.trim() !== '') {
      setIsLoading(true); // 로딩 시작

      try {
        if (selectedForkedRecipe === undefined) {
          setSelectedForkedRecipe(null);
        }
        await postReview({
          recipeId: recipeId,
          memberId: userId,
          rating: ratingValue,
          comment: reviewText,
          forkRecipeId: selectedForkedRecipe,
        });

        setIsReviewModalOpen(false);
        setAlert(false);
      } catch (error) {
        console.error('Error posting review:', error);
        setAlert(true); // 실패 시 알림
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    } else {
      setAlert(true); // 입력 오류 알림
    }
  };

  if (isLoading) {
    return (
      <Backdrop open={true} sx={{ color: '#fff', zIndex: 10000 }}>
        <CircularProgress variantcolor="primary" />
      </Backdrop>
    );
  }

  return (
    <Container>
      <AppBarWithTitle onBackBtnClick={onBackBtnClick} />

      <Dialog fullScreen open={isReviewModalOpen} onClose={handleIsModalClose}>
        <DialogTitle>리뷰 작성하기</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              paddingTop: '1.25rem',
            }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              레시피가 만족스러우셨나요?
            </Typography>
            <Box
              sx={{
                width: 220,
                display: 'flex',
                alignItems: 'center',
              }}>
              <Rating
                name="text-feedback"
                value={ratingValue}
                emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                onChange={(event, newValue) => {
                  setRatingValue(newValue);
                }}
              />
              <Box sx={{ ml: 2 }}>
                <Typography variant="body2">{labels[ratingValue]}</Typography>
              </Box>
            </Box>
          </Box>
          <TextField
            margin="dense"
            label="리뷰 내용"
            type="text"
            fullWidth
            multiline
            rows={7}
            inputProps={{ maxLength: 100 }}
            name="reviewText"
            sx={{ marginTop: '1rem' }}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <FormControl sx={{ marginTop: '1rem' }} fullWidth>
            <InputLabel id="forkedRecipe-label">레시피 추가</InputLabel>
            <Select
              labelId="forkedRecipe-label"
              id="forkedRecipe"
              value={selectedForkedRecipe}
              onChange={(e) => {
                setSelectedForkedRecipe(e.target.value);
                console.log(e.target.value);
              }}
              label="레시피 추가"
              sx={{ width: '100%' }}>
              {forkedRecipes.length === 0 ? (
                <MenuItem disabled value={null}>
                  레시피 없음
                </MenuItem>
              ) : (
                forkedRecipes.map((recipe) => (
                  <MenuItem key={recipe.id} value={recipe.id}>
                    {recipe.recipeName}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </DialogContent>
        {alert ? (
          <Alert sx={{ width: '100%' }} severity="error">
            입력되지 않은 항목이 있어요!
          </Alert>
        ) : null}
        <DialogActions>
          <Button onClick={handleReviewModalClose} color="primary">
            취소
          </Button>
          <Button onClick={handleSave} color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>

      {reviews.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
          }}>
          <Typography
            variant="body1"
            style={{
              textAlign: 'center',
              padding: '1rem',
            }}>
            😢 아직 리뷰가 없습니다.
            <br />
            첫번째 리뷰를 작성해보세요!
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {paginatedReviews.map((review) => (
            <Review
              key={review.memberID}
              name={review.memberName}
              img={review.memberImg}
              rating={review.rating}
              comment={review.comment}
              registerDate={review.registerDate}
              forkedRecipe={review.forkRecipeId}
            />
          ))}
          <Pagination
            count={Math.ceil(reviews.length / reviewsPerPage)}
            page={page}
            onChange={handleChange}
            color="primary"
            style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}
          />
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Reviews />}
          onClick={handleIsModalOpen}>
          리뷰 작성하기
        </Button>
      </Box>
    </Container>
  );
};

export default RecipeReviews;
