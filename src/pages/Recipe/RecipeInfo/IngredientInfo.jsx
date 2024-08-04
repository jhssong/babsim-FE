import { Button, Typography } from '@mui/material';
import styled from '@emotion/styled';

const IngredientContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  padding: 1.5rem;
  width: 100%;
`;

const AmountText = styled(Typography)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;

const NameText = styled(Typography)`
  position: absolute;
  left: 1rem; /* 왼쪽 여백 */
`;

const LinkButton = styled(Button)`
  position: absolute;
  right: 1rem; /* 오른쪽 여백 */
`;

export const Ingredient = ({ name, amount }) => {
  const onBtnClick = () => {
    window.open(`https://www.coupang.com/np/search?component=&q=${name}`, '_blank');
  };

  return (
    <IngredientContainer>
      <NameText variant="body2">{name}</NameText>
      <AmountText variant="body2">{amount}</AmountText>
      <LinkButton variant="contained" size="small" color="primary" onClick={onBtnClick}>
        구매
      </LinkButton>
    </IngredientContainer>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 1rem;
`;

const IngredientInfo = ({ ingredients }) => {
  return (
    <Container>
      <Typography variant="h5">재료</Typography>
      {ingredients.map((ingredient, index) => (
        <Ingredient key={index} name={ingredient.name} amount={ingredient.quantity} />
      ))}
    </Container>
  );
};

export default IngredientInfo;
