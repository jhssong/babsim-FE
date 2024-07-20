import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppBarWithTitle } from '../../components/AppBar';
import { Button, Divider, Typography } from '@mui/material';
import RecipeInformation, { RecipeInfoImage } from './RecipeInfo/RecipeInformation';
import AllergyInfo from './RecipeInfo/AllergyInfo';
import NutritionInfo from './RecipeInfo/NutritionInfo';
import IngredientInfo from './RecipeInfo/IngredientInfo';
import CookeryInfo from './RecipeInfo/CookeryInfo';
import ReviewInfo from './RecipeInfo/ReviewInfo';
import { CallSplitOutlined, LocalDiningOutlined } from '@mui/icons-material';
import styled from '@emotion/styled';

// dummy data
const recipe = {
  id: '12345',
  imgURLs: [null, null],
  name: '짱구 도시락',
  description: '짱구가 어디갈 때 먹는 도시락',
  rate: 4,
  difficulty: '초급',
  cookingTime: 10,
  tags: ['짱구', '도시락', '초간단'],
  allergys: ['gluten', 'peanuts', 'shellfish'],
  ingredients: [
    { name: '방울토마토', amount: 1 },
    { name: '계란', amount: 1 },
    { name: '양상추', amount: 1 },
    { name: '소세지', amount: 10 },
  ],
  reviews: [
    {
      name: 'User1',
      rating: 5,
      registerDate: '24.01.10',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      forkedRecipe: null,
    },
    {
      name: 'User2',
      rating: 4,
      registerDate: '24.09.30',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      forkedRecipe: 123456,
    },
    {
      name: 'User3',
      rating: 4.5,
      registerDate: '24.03.12',
      comment: 'Loved it, will make again.',
      forkedRecipe: 999999,
    },
  ],
  recipeImgs: ['https://example.com/step1.jpg', 'https://example.com/step2.jpg'],
  recipeDescs: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cook the vegetables in a pan.',
  ],
  recipeTimers: [10, 120],
};

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  padding-inline: 1rem;

  button:nth-child(1) {
    width: 35%;
  }
  button:nth-child(2) {
    width: 55%;
  }
`;

const RecipeEdit = () => {
  const { recipeId } = useParams();
  const [isLoading, setIsLoading] = useState(false); // Backend API 구현 후 true로 변경
  const [isDone, setDone] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState([]);

  const getRecipeInfo = async () => {
    const json = await (await fetch(` http://localhost:5173/api/recipe/${recipeId}`)).json();
    setRecipeInfo(json);
    isLoading(false);
  };
  useEffect(() => {
    getRecipeInfo();
  }, []);
  useEffect(() => {
    // POST 요청
    // 이전 페이지로 돌아가서? 성공 메세지 출력
  }, [isDone]);

  return (
    <>
      {isLoading ? null : (
        <>
          <AppBarWithTitle title="" rightIcon="done" set={setDone} />
        </>
      )}
    </>
  );
};

export default RecipeEdit;
