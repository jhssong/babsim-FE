import { Reviews } from '@mui/icons-material';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import Review from './Review';

const Container = styled.div`
  width: 100%;
  padding: 1rem;
`;

const ReviewInfo = ({ reviews }) => {
  return (
    <Container>
      <Typography variant="h5">리뷰</Typography>
      {reviews.slice(0, 5).map((review, index) => (
        <Review
          key={index}
          memberId={review.memberId}
          name={review.name}
          img={review.img}
          rating={review.rating}
          comment={review.comment}
          registerDate={review.registerDate}
          forkedRecipe={review.forkedRecipe}
        />
      ))}
    </Container>
  );
};

export default ReviewInfo;
