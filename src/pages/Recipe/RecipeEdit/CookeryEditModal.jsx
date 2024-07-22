import { Container } from '@mui/material';
import { AppBarWithTitle } from '../../../components/AppBar';
import { Cookery } from '../RecipeInfo/CookeryInfo';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const CookeryWrapper = styled.div`
  padding: 1rem;
  background-color: #f0f0f0;
`;

const CookeryEditModal = ({ recipe, onBackBtnClick }) => {
  const [cookeries, setCookeries] = useState([]);

  const initCookeries = () => {
    const cookeries = [];
    for (let i = 0; i < recipe.recipeImgs.length; i++) {
      cookeries.push({
        image: recipe.recipeImgs[i],
        desc: recipe.recipeDescs[i],
        timer: recipe.recipeTimers[i],
      });
    }
    setCookeries(cookeries);
  };

  useEffect(() => {
    initCookeries();
  }, []);

  console.log(cookeries);
  return (
    <>
      <AppBarWithTitle title="요리법 수정" rightIcon="done" onBackBtnClick={onBackBtnClick} />
      <Container>
        {cookeries.map((cookery, idx) => (
          <CookeryWrapper key={idx}>
            <Cookery key={idx} image={cookery.image} desc={cookery.desc} timer={cookery.timer} />
          </CookeryWrapper>
        ))}
      </Container>
    </>
  );
};

export default CookeryEditModal;
