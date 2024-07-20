import { Skeleton, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useState } from 'react';

const Container = styled.div`
  width: 100%;
  padding: 1rem;
`;

const NutritionInfo = () => {
  const [info, setInfo] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const getNutritionInfo = async () => {
    const json = await (await fetch(` http://localhost:5173/api/${recipeId}`)).json();
    setInfo(json.nutritionInfo);
    isLoading(false);
  };
  return (
    <>
      <Container>
        <Typography variant="h5">영양 성분 정보</Typography>
        {isLoading ? (
          <Skeleton variant="text" width="100%" height={30} />
        ) : (
          <Typography variant="body1">{info}</Typography>
        )}
      </Container>
    </>
  );
};

export default NutritionInfo;
