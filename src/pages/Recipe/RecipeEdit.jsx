import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppBarWithTitle } from '../../components/AppBar';
import { Divider, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Edit } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../recoil/atoms';
import RecipeTable from './RecipeEdit/RecipeTable';
import RecipeTags from './RecipeEdit/RecipeTags';
import CookeryEdit from './RecipeEdit/CookeryEdit';
import CookeryEditModal from './RecipeEdit/CookeryEditModal';

// dummy data
const recipe = {
  id: '12345',
  imgURLs: ['https://d2v80xjmx68n4w.cloudfront.net/gigs/fPoZ31584321311.jpg?w=652', null],
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

const Container = styled.div`
  padding: 1rem;
`;

const ImageSize = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  border-radius: 5px;
  overflow: hidden;
  padding-bottom: 1rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EditIconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: white; // Button icon color
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
  border-radius: 10%;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const EditIcon = styled(Edit)`
  color: white;
  width: 32px;
  height: 32px;
`;

const RecipeEdit = () => {
  const isLoggined = useRecoilValue(loginState).isLoggedIn;

  const { recipeId } = useParams();
  const [isLoading, setIsLoading] = useState(false); // Backend API 구현 후 true로 변경
  const [isDone, setDone] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [timeError, setTimeError] = useState(false);
  const [isCookeryModalOpen, setIsCookeryModalOpen] = useState(false); // 조리법 수정 모달창 열기/닫기

  const difficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

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
      {isLoading ? null : isCookeryModalOpen ? (
        <CookeryEditModal />
      ) : (
        <>
          <AppBarWithTitle title="" rightIcon="done" set={setDone} />
          <Container>
            <ImageSize>
              <Image src={recipe.imgURLs[0]} />
              <EditIconContainer>
                <EditIcon />
              </EditIconContainer>
            </ImageSize>
            <TextField
              id="recipeTitle"
              label="레시피 이름"
              sx={{ width: '100%' }}
              defaultValue={recipe.name}
              inputProps={{ maxLength: 20 }}
            />
            <Divider />
            <TextField
              id="recipeTitle"
              label="레시피 설명"
              sx={{ width: '100%', marginTop: '1rem' }}
              defaultValue={recipe.description}
              multiline
              rows={5}
              inputProps={{ maxLength: 100 }}
            />
            <FormControl
              sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              fullWidth>
              <InputLabel id="difficulty" sx={{ marginTop: '1rem' }}>
                요리 난이도
              </InputLabel>
              <Select
                labelId="difficulty"
                id="difficulty"
                value={difficulty}
                label="recipeDifficulty"
                onChange={difficultyChange}
                sx={{ width: '45%', marginTop: '1rem' }}>
                <MenuItem value={'초급'}>초급</MenuItem>
                <MenuItem value={'중급'}>중급</MenuItem>
                <MenuItem value={'고급'}>고급</MenuItem>
              </Select>
              <TextField
                id="recipeMinute"
                label="요리 시간 (분)"
                type="number"
                sx={{ width: '25%', marginTop: '1rem' }}
                defaultValue={Math.floor(recipe.cookingTime / 60)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: 0,
                  step: 1,
                  max: 60,
                  maxLength: 2,
                }}
                onChange={(event) => {
                  event.target.value < 0 ? (event.target.value = 0) : event.target.value;
                  event.target.value > 999 ? (event.target.value = 999) : event.target.value;
                }}
                error={timeError}
                helperText={timeError ? '시간을 정확히 입력해주세요.' : ''}
              />
              <TextField
                id="recipeSecond"
                label="요리 시간 (초)"
                type="number"
                sx={{ width: '25%', marginTop: '1rem' }}
                defaultValue={recipe.cookingTime % 60}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: 0,
                  step: 1,
                  max: 86400,
                  maxLength: 5,
                }}
                onChange={(event) => {
                  event.target.value < 0 ? (event.target.value = 0) : event.target.value;
                  event.target.value > 60 ? (event.target.value = 60) : event.target.value;
                }}
                error={timeError}
                helperText={timeError ? '시간을 정확히 입력해주세요.' : ''}
              />
            </FormControl>
            <Divider sx={{ paddingTop: '1rem' }} />
            <RecipeTable ingredients={recipe.ingredients} />
            <Divider sx={{ paddingTop: '1rem' }} />
            <RecipeTags recipeTags={recipe.tags} />
            <Divider sx={{ paddingTop: '1rem' }} />
            <CookeryEdit recipe={recipe} setState={setIsCookeryModalOpen} />
          </Container>
        </>
      )}
    </>
  );
};

export default RecipeEdit;
