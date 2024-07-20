import { ThemeProvider } from '@emotion/react';
import { Rating, Typography, Skeleton } from '@mui/material';
import theme from '../../../styles/theme';
import styled from '@emotion/styled';
import LikeButton from './LikeButton';

const RecipeImageContainer = styled.div`
  width: 100%;
  height: 200px;
`;

export const RecipeInfoImage = ({ src, alt, isLoading }) => {
  return (
    <RecipeImageContainer>
      {isLoading ? (
        <Skeleton variant="rectangular" sx={{ width: '100%', height: '100%' }} />
      ) : (
        <img src={src} alt={alt} />
      )}
    </RecipeImageContainer>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 1rem;

  h5 {
    margin-bottom: 0.25rem;
  }
  p {
    margin-bottom: 0.25rem;
  }
`;

const TitleLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RatingLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

const RecipeInformation = ({ recipeInfo, isLoading }) => {
  return (
    <>
      <Container>
        <TitleLine>
          {isLoading ? (
            <Skeleton variant="text" width={200} height={30} />
          ) : (
            <Typography variant="h5">{recipeInfo.name}</Typography>
          )}
          <LikeButton />
        </TitleLine>
        {isLoading ? (
          <Skeleton variant="text" width="100%" height={20} />
        ) : (
          <Typography variant="body1">{recipeInfo.description}</Typography>
        )}
        <RatingLine>
          {isLoading ? (
            <>
              <Skeleton variant="rectangular" width={50} height={20} />
              <Skeleton variant="text" width={50} height={20} />
              <Skeleton variant="text" width={100} height={20} />
            </>
          ) : (
            <>
              <Rating name="read-only" value={recipeInfo.rate} size="small" readOnly />
              <Typography variant="caption">{recipeInfo.difficulty}</Typography>
              <Typography variant="caption">요리 시간 {recipeInfo.cookingTime}분</Typography>
            </>
          )}
        </RatingLine>

        <ThemeProvider theme={theme}>
          {isLoading ? (
            <Skeleton variant="text" width="100%" height={20} />
          ) : (
            recipeInfo.tags.map((tag) => (
              <Typography variant="caption" color="grey" key={tag} sx={{ paddingRight: '0.25rem' }}>
                #{tag}
              </Typography>
            ))
          )}
        </ThemeProvider>
      </Container>
    </>
  );
};

export default RecipeInformation;
