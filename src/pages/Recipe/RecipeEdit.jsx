import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppBarWithTitle } from '../../components/AppBar';
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../../recoil/atoms';
import RecipeTable from './RecipeEdit/RecipeTable';
import RecipeTags from './RecipeEdit/RecipeTags';
import CookeryEdit from './RecipeEdit/CookeryEdit';
import CookeryEditModal from './RecipeEdit/CookeryEditModal';
import ScrollToTop from '../../components/ScrollToTop';
import ImageCard from '../../components/ImageCard';
import getRecipeInfo from '../../apis/Recipe/RecipeInfo/getRecipeInfo';

// 초기 레시피 데이터 설정
const initialRecipe = {
  id: '',
  imgURLs: [null],
  name: '',
  description: '',
  rate: 0,
  difficulty: '',
  cookingTime: 0,
  tags: [],
  allergies: [],
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

const RecipeEdit = ({ mode, onBackBtnClick }) => {
  const userData = useRecoilValue(userDataState);
  const { recipeId } = useParams();

  const [recipeInfo, setRecipeInfo] = useState(initialRecipe);
  const [category, setCategory] = useState('');
  const [timeError, setTimeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDone, setDone] = useState(false);
  const [isCookeryModalOpen, setIsCookeryModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState([]); // 수정 중인 레시피의 이미지 URL 리스트

  // 레시피 정보 GET 요청
  const fetchRecipeInfo = async () => {
    try {
      const json = await getRecipeInfo(recipeId, userData.id);
      setRecipeInfo(json);
      setIsLoading(false); // 로딩 상태 해제
    } catch (error) {
      console.error('Failed to fetch recipe info:', error);
    }
  };

  useEffect(() => {
    if (mode === 'edit' || mode === 'fork') {
      fetchRecipeInfo();
    } else if (mode === 'write') {
      setRecipeInfo(initialRecipe);
      setIsLoading(false); // 로딩 상태 해제
    }
  }, [mode, recipeId, userData.id]);

  const categoryChange = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    // POST 요청
    // 이전 페이지로 돌아가서? 성공 메세지 출력
  }, [isDone]);

  // 조건부 렌더링
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isImageModalOpen) {
    const handleCancel = () => {
      setIsImageModalOpen(false);
    };
    const handleDone = () => {
      setRecipeInfo({ ...recipeInfo, imgURLs: imageUrls });
      setIsImageModalOpen(false);
    };
    return (
      <>
        <ImageCard imageUrls={imageUrls} setImageUrls={setImageUrls} maxImageCount={3} />
        <Button onClick={handleCancel} color="primary">
          취소
        </Button>
        <Button onClick={handleDone} color="primary">
          확인
        </Button>
      </>
    );
  }

  if (isCookeryModalOpen) {
    return (
      <CookeryEditModal
        recipe={recipeInfo}
        onBackBtnClick={() => setIsCookeryModalOpen(false)}
        setRecipeState={setRecipeInfo}
        setModalState={setIsCookeryModalOpen}
      />
    );
  }

  return (
    <>
      <ScrollToTop />
      <AppBarWithTitle
        title=""
        rightIcon="done"
        set={setDone}
        onBackBtnClick={onBackBtnClick}
        onRightIconClick={() => console.log('Save clicked')}
      />
      <Container>
        <ImageSize>
          {imageUrls[0] ? (
            <Image src={imageUrls[0]} />
          ) : (
            <div style={{ width: '100%', height: '100%', backgroundColor: '#e0e0e0' }} />
          )}
          <EditIconContainer>
            <EditIcon
              onClick={() => {
                setIsImageModalOpen(true);
              }}
            />
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
            value={recipeInfo.difficulty}
            label="recipeDifficulty"
            onChange={(e) => {
              setRecipeInfo({ ...recipeInfo, difficulty: e.target.value });
            }}
            sx={{ width: '45%', marginTop: '1rem' }}>
            <MenuItem value={'EASY'}>초급</MenuItem>
            <MenuItem value={'MEDIUM'}>중급</MenuItem>
            <MenuItem value={'HARD'}>고급</MenuItem>
          </Select>
          <TextField
            id="recipeMinute"
            label="시간(분)"
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
            label="시간(초)"
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
        <FormControl
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
          fullWidth>
          <InputLabel id="category" sx={{ marginTop: '1rem' }}>
            카테고리
          </InputLabel>
          <Select
            labelId="category"
            id="category"
            value={recipeInfo.categoryName}
            label="recipeCategory"
            onChange={categoryChange}
            sx={{ width: '100%', marginTop: '1rem' }}>
            <MenuItem value={'Main Courses'}>메인요리</MenuItem>
            <MenuItem value={'Simple'}>간단요리</MenuItem>
            <MenuItem value={'Vegan'}>비건요리</MenuItem>
            <MenuItem value={'Snack'}>안주</MenuItem>
            <MenuItem value={'Baking'}>베이킹</MenuItem>
            <MenuItem value={'Diet'}>다이어트</MenuItem>
            <MenuItem value={'Oven'}>오븐 요리</MenuItem>
            <MenuItem value={'Keto'}>키토</MenuItem>
          </Select>
        </FormControl>
        <Divider sx={{ paddingTop: '1rem' }} />
        <RecipeTable
          ingredients={recipeInfo.ingredients}
          setIngredients={(newIngredients) =>
            setRecipeInfo({ ...recipeInfo, ingredients: newIngredients })
          }
        />
        <Divider sx={{ paddingTop: '1rem' }} />
        {recipeInfo.tags === null ? null : (
          <RecipeTags
            recipeTags={recipeInfo.tags}
            tags={recipeInfo.tags}
            setTags={(newTags) => setRecipeInfo({ ...recipeInfo, tags: newTags })}
          />
        )}
        <Divider sx={{ paddingTop: '1rem' }} />
        <CookeryEdit recipe={recipeInfo} setState={setIsCookeryModalOpen} />
      </Container>
    </>
  );
};

export default RecipeEdit;
