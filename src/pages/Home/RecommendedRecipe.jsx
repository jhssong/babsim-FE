import styled from '@emotion/styled';

import { Typography } from '@mui/material';
import { VCard } from '../../components/Card';
import CardList from '../../components/CardList';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../recoil/atoms';

const RecommendedRecipeContainer = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const RecommendedRecipe = () => {
  const user = useRecoilValue(loginState).user.name;
  //const user = '김철수';

  const recipesData = {
    list: [
      {
        id: 'recipe1',
        img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
        name: 'Spaghetti Carbonara',
        tags: ['Italian', 'Pasta', 'Creamy'],
        cookingTime: 1800,
        rate: 4.5,
        allergies: ['dairy', 'egg'],
      },
      {
        id: 'recipe2',
        img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
        name: 'Chicken Curry',
        tags: ['Indian', 'Spicy', 'Chicken'],
        cookingTime: 2400,
        rate: 4.7,
        allergies: ['nut'],
      },
      {
        id: 'recipe3',
        img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
        name: '조재용의 특제 시부야 초록라멘 국물이 아주 끝내줘요 아주 그냥 ',
        tags: ['Vegan', 'Healthy', 'Bowl', 'Bowl', 'Bowl', 'Bowl', 'Bowl', 'Bowl'],
        cookingTime: 1500,
        rate: 4.9,
        allergies: ['soy', 'sesame'],
      },
      {
        id: 'recipe4',
        img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
        name: 'Beef Tacos',
        tags: ['Mexican', 'Beef', 'Spicy'],
        cookingTime: 1200,
        rate: 4.3,
        allergies: ['gluten'],
      },
      {
        id: 'recipe4',
        img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
        name: 'Beef Tacos',
        tags: ['Mexican', 'Beef', 'Spicy'],
        cookingTime: 1200,
        rate: 4.3,
        allergies: ['gluten'],
      },
    ],
  };
  return (
    <RecommendedRecipeContainer>
      <Typography variant="h5">{user}님을 위한 추천 레시피</Typography>
      <CardList>
        {recipesData.list.map((recipe, index) => (
          <VCard key={recipe.id} product={recipe} index={index} type="recipe" />
        ))}
      </CardList>
    </RecommendedRecipeContainer>
  );
};

export default RecommendedRecipe;
