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
const initialRecipe = {
  id: '',
  imgURLs: [null, null],
  name: '',
  description: '',
  rate: 0,
  difficulty: '',
  cookingTime: 0,
  tags: [],
  allergys: [],
  ingredients: [],
  reviews: [],
  recipeImgs: [],
  recipeDescs: [],
  recipeTimers: [],
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

const RecipeEdit = ({ mode }) => {
  const isLoggined = useRecoilValue(loginState).isLoggedIn;

  const { recipeId } = useParams();
  const [isLoading, setIsLoading] = useState(false); // Backend API 구현 후 true로 변경
  const [isDone, setDone] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState(initialRecipe);
  const [difficulty, setDifficulty] = useState('');
  const [timeError, setTimeError] = useState(false);
  const [isCookeryModalOpen, setIsCookeryModalOpen] = useState(false); // 조리법 수정 모달창 열기/닫기

  const difficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const getRecipeInfo = async () => {
    const json = await (await fetch(`http://localhost:5173/api/recipe/${recipeId}`)).json();
    setRecipeInfo(json);
    setIsLoading(false);
  };

  useEffect(() => {
    if (mode === 'edit') {
      getRecipeInfo();
    } else if (mode === 'write') {
      setRecipeInfo(initialRecipe);
      setIsLoading(false);
    }
  }, [mode, recipeId]);

  useEffect(() => {
    // POST 요청
    // 이전 페이지로 돌아가서? 성공 메세지 출력
  }, [isDone]);

  return (
    <>
      {isLoading ? null : isCookeryModalOpen ? (
        <CookeryEditModal recipe={recipeInfo} onBackBtnClick={setIsCookeryModalOpen} />
      ) : (
        <>
          <AppBarWithTitle title="" rightIcon="done" set={setDone} />
          <Container>
            <ImageSize>
              {recipeInfo.imgURLs[0] ? (
                <Image src={recipeInfo.imgURLs[0]} />
              ) : (
                <div style={{ width: '100%', height: '100%', backgroundColor: '#e0e0e0' }} />
              )}
              <EditIconContainer>
                <EditIcon />
              </EditIconContainer>
            </ImageSize>
            <TextField
              id="recipeTitle"
              label="레시피 이름"
              sx={{ width: '100%' }}
              value={recipeInfo.name}
              inputProps={{ maxLength: 20 }}
              onChange={(e) => setRecipeInfo({ ...recipeInfo, name: e.target.value })}
            />
            <Divider />
            <TextField
              id="recipeDescription"
              label="레시피 설명"
              sx={{ width: '100%', marginTop: '1rem' }}
              value={recipeInfo.description}
              multiline
              rows={5}
              inputProps={{ maxLength: 100 }}
              onChange={(e) => setRecipeInfo({ ...recipeInfo, description: e.target.value })}
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
                value={Math.floor(recipeInfo.cookingTime / 60)}
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
                  const value = Math.max(0, Math.min(60, Number(event.target.value)));
                  setRecipeInfo({
                    ...recipeInfo,
                    cookingTime: value * 60 + (recipeInfo.cookingTime % 60),
                  });
                }}
                error={timeError}
                helperText={timeError ? '시간을 정확히 입력해주세요.' : ''}
              />
              <TextField
                id="recipeSecond"
                label="요리 시간 (초)"
                type="number"
                sx={{ width: '25%', marginTop: '1rem' }}
                value={recipeInfo.cookingTime % 60}
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
                  const value = Math.max(0, Math.min(60, Number(event.target.value)));
                  setRecipeInfo({
                    ...recipeInfo,
                    cookingTime: Math.floor(recipeInfo.cookingTime / 60) * 60 + value,
                  });
                }}
                error={timeError}
                helperText={timeError ? '시간을 정확히 입력해주세요.' : ''}
              />
            </FormControl>
            <Divider sx={{ paddingTop: '1rem' }} />
            <RecipeTable ingredients={recipeInfo.ingredients} />
            <Divider sx={{ paddingTop: '1rem' }} />
            <RecipeTags recipeTags={recipeInfo.tags} />
            <Divider sx={{ paddingTop: '1rem' }} />
            <CookeryEdit recipe={recipeInfo} setState={setIsCookeryModalOpen} />
          </Container>
        </>
      )}
    </>
  );
};

export default RecipeEdit;
