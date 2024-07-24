import { useEffect, useState } from 'react';
import { AppBarWithTitle } from '../../components/AppBar';
import {
  Alert,
  Box,
  Button,
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
import { Fullscreen, Reviews, Star } from '@mui/icons-material';
import { loginState } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';
import { set } from 'date-fns';

const labels = {
  1: '😥 별로예요',
  2: '😣 아쉬워요',
  3: '😐 괜찮아요',
  4: '😊 좋아요',
  5: '😍 최고예요!',
};

const RecipeReviews = ({ onBackBtnClick }) => {
  const { recipeId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [forkedRecipes, setForkedRecipes] = useState([]);
  const [alert, setAlert] = useState(false);

  const loginInfo = useRecoilValue(loginState);
  const userId = loginInfo.user.id; // 현재 로그인된 유저 아이디

  const getReviews = async () => {
    const response = await fetch(`http://localhost:5173/recipes/api/reviews/${recipeId}`);
    const data = await response.json();
    setReviews(data);
  };

  // 리뷰 가져오기
  useEffect(() => {
    getReviews();
    setAlert(false);
  }, [isReviewModalOpen]);

  useEffect(() => {
    const param = new URLSearchParams({
      memberID: userId,
    }); // 로그인한 사용자의 ID
    const queryString = param.toString();
    // 포크한 레시피 가져오기
    const getForkedRecipes = async () => {
      const response = await fetch(`http://localhost:5173/recipes/api/forked?${queryString}`);
      const data = await response.json();
      setForkedRecipes(data);
    };
    getForkedRecipes();
  }, [userId]);

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

  const handleSave = () => {
    console.log(reviewText);
    // save review
    if (ratingValue !== null && reviewText.trim() !== '') {
      setIsReviewModalOpen(false);
      // 리뷰 POST 요청
    } else {
      setAlert(true);
    }
  };

  return (
    <div>
      <AppBarWithTitle onBackBtnClick={onBackBtnClick} />

      <Dialog fullScreen={Fullscreen} open={isReviewModalOpen} onClose={handleIsModalClose}>
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
              label="레시피 추가"
              sx={{ width: '100%' }}>
              <MenuItem value={'초급'}>초급</MenuItem>
              <MenuItem value={'중급'}>중급</MenuItem>
              <MenuItem value={'고급'}>고급</MenuItem>
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
        <>
          {paginatedReviews.map((review) => (
            <Review key={review.memberID} {...review} />
          ))}
          <Pagination
            count={Math.ceil(reviews.length / reviewsPerPage)}
            page={page}
            onChange={handleChange}
            color="primary"
            style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}
          />
        </>
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
    </div>
  );
};

export default RecipeReviews;
