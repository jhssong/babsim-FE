import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import Ingredient from './Ingredient';

const Container = styled.div`
  width: 100%;
  padding: 1rem;
`;

const IngredientInfo = ({ ingredients }) => {
  return (
    <Container>
      <Typography variant="h5">재료</Typography>
      {ingredients.map((ingredient, index) => (
        <Ingredient key={index} name={ingredient.name} amount={ingredient.amount} />
      ))}
    </Container>
  );
};

export default IngredientInfo;
