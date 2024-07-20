import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';

const Container = styled.div`
  width: 100%;
  height: 200px;
`;

const RecipeInfoImage = ({ src, alt, isLoading }) => {
  return (
    <Container>
      {isLoading ? (
        <Skeleton variant="rectangular" sx={{ width: '100%', height: '100%' }} />
      ) : (
        <img src={src} alt={alt} />
      )}
    </Container>
  );
};

export default RecipeInfoImage;
