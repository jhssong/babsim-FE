import { useEffect, useState } from 'react';
import { AppBarWithTitle } from '../../components/AppBar';
import { Box, Button, Pagination, Typography } from '@mui/material';
import { Review } from './RecipeInfo/ReviewInfo';
import { useParams } from 'react-router-dom';
import { Reviews } from '@mui/icons-material';

const RecipeReviews = ({ onBackBtnClick }) => {
  const recipeId = useParams();
  const [reviews, setReviews] = useState([]);

  console.log(reviews.length);

  const getReviews = async () => {
    const response = await fetch(`localhost:5173/recipes/api/reviews/${recipeId}`);
    const data = await response.json();
    setReviews(data);
  };

  useEffect(() => {
    getReviews();
  }, []);

  const [page, setPage] = useState(1);
  const reviewsPerPage = 5;

  const handleChange = (event, value) => {
    setPage(value);
  };

  const paginatedReviews = reviews.slice((page - 1) * reviewsPerPage, page * reviewsPerPage);

  return (
    <div>
      <AppBarWithTitle onBackBtnClick={onBackBtnClick} />
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
        <Button variant="contained" color="primary" startIcon={<Reviews />}>
          리뷰 작성하기
        </Button>
      </Box>
    </div>
  );
};

export default RecipeReviews;
