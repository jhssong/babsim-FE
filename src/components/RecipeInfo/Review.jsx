import React from 'react';
import { Avatar, Card, CardContent, Typography, Rating, Grid, Button } from '@mui/material';
import styled from '@emotion/styled';
import { LocalDiningOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ReviewCard = styled(Card)`
  margin: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  #forkBtn {
    margin-left: auto;
  }
`;

const Review = ({ memberID, name, img, rating, comment, registerDate, forkedRecipe }) => {
  return (
    <ReviewCard>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar alt={name} src={img} />
          </Grid>
          <Grid item xs>
            <Rating value={rating} readOnly precision={0.5} />
            <Container>
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
            </Container>
            <Typography variant="body1" component="p" style={{ marginTop: '0.5rem' }}>
              {comment}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </ReviewCard>
  );
};

export default Review;
