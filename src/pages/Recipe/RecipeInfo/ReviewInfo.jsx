import styled from '@emotion/styled';
import { Avatar, Card, CardContent, Typography, Rating, Grid, Button } from '@mui/material';
import { LocalDiningOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ReviewCard = styled(Card)`
  margin: 1rem;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  #forkBtn {
    margin-left: auto;
  }
`;

export const Review = ({ memberID, name, img, rating, comment, registerDate, forkedRecipe }) => {
  return (
    <ReviewCard>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar alt={name} src={img} />
          </Grid>
          <Grid item xs>
            <Rating value={rating} readOnly precision={0.5} />
            <ReviewContainer>
              <Typography variant="subtitle" component="div">
                {name} • {registerDate}
              </Typography>
              {forkedRecipe === null ? null : (
                <Button
                  id="forkBtn"
                  component={Link}
                  to={`/recipe/${forkedRecipe}`}
                  variant="contained"
                  color="primary"
                  sx={{
                    minWidth: 'auto',
                    minHeight: 'auto',
                    padding: 0,
                    width: '32px',
                    height: '32px',
                  }}>
                  <LocalDiningOutlined />
                </Button>
              )}
            </ReviewContainer>
            <Typography variant="body1" component="p" style={{ marginTop: '0.5rem' }}>
              {comment}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </ReviewCard>
  );
};

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
