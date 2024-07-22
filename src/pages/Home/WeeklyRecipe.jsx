import styled from '@emotion/styled';

import { Typography } from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { HCard } from '../../components/Card';
import { useNavigate } from 'react-router-dom';

const WeeklyRecipeContainer = styled.div`
  display: flex;
  padding: var(--none, 0rem) 1rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const WeeklyRecipeHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
`;

const WeeklyRecipeContents = styled.div`
  display: flex;
  padding: 0.5rem var(--none, 0rem);
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
`;

const WeeklyRecipe = () => {
  const recipesData = {
    list: [
      {
        id: '0',
        img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
        name: 'Spaghetti Carbonara',
        tags: ['Italian', 'Pasta', 'Creamy'],
        cookingTime: 1800,
        rate: 4.5,
        allergies: ['dairy', 'egg'],
      },
      {
        id: '0',
        img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
        name: 'Chicken Curry',
        tags: ['Indian', 'Spicy', 'Chicken'],
        cookingTime: 2400,
        rate: 4.7,
        allergies: ['nut'],
      },
      {
        id: '0',
        img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
        name: '조재용의 특제 시부야 초록라멘 국물이 아주 끝내줘요 아주 그냥 ',
        tags: ['Vegan', 'Healthy', 'Bowl', 'Bowl', 'Bowl', 'Bowl', 'Bowl', 'Bowl'],
        cookingTime: 1500,
        rate: 4.9,
        allergies: ['soy', 'sesame'],
      },
      {
        id: '0',
        img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
        name: 'Beef Tacos',
        tags: ['Mexican', 'Beef', 'Spicy'],
        cookingTime: 1200,
        rate: 4.3,
        allergies: ['gluten'],
      },
      {
        id: '0',
        img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
        name: 'Beef Tacos',
        tags: ['Mexican', 'Beef', 'Spicy'],
        cookingTime: 1200,
        rate: 4.3,
        allergies: ['gluten'],
      },
    ],
  };

  const today = new Date();
  const formattedDate = format(today, 'yyyy.MM.dd');

  const [pageIndex, setPageIndex] = useState(0); //페이지를 나타내는 변수
  let navigate = useNavigate();

  const handlers = useSwipeable({
    onSwipedLeft: () => setPageIndex((prevIndex) => Math.min(prevIndex + 1, 4)), // 최대 페이지 인덱스는 4 (0부터 시작해서 5페이지)
    onSwipedRight: () => setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0)),
  });

  const recipesToShow = recipesData.list.slice(pageIndex * 3, pageIndex * 3 + 3);

  return (
    <>
      <WeeklyRecipeContainer>
        <WeeklyRecipeHeader>
          <Typography variant="h5" color="subbackground">
            이번주 레시피
          </Typography>
          <Typography variant="caption" color="subbackground">
            {formattedDate} 기준
          </Typography>
        </WeeklyRecipeHeader>

        <WeeklyRecipeContents {...handlers}>
          {recipesToShow.map((recipe, index) => (
            <HCard
              key={recipe.id}
              recipe={recipe}
              index={pageIndex * 3 + index}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            />
          ))}
        </WeeklyRecipeContents>
      </WeeklyRecipeContainer>
    </>
  );
};

export default WeeklyRecipe;
