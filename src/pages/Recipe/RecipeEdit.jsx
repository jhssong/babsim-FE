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
import { loginState } from '../../recoil/atoms';
import RecipeTable from './RecipeEdit/RecipeTable';
import RecipeTags from './RecipeEdit/RecipeTags';
import CookeryEdit from './RecipeEdit/CookeryEdit';
import CookeryEditModal from './RecipeEdit/CookeryEditModal';
import ScrollToTop from '../../components/ScrollToTop';
import ImageCard from '../../components/ImageCard';

// dummy data
const initialRecipe = {
  id: '',
  imgURLs: [null],
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

const recipe = {
  id: '12345',
  imgURLs: [
    'https://d2v80xjmx68n4w.cloudfront.net/gigs/fPoZ31584321311.jpg?w=652',
    'https://d2v80xjmx68n4w.cloudfront.net/gigs/5s8Hq1584287799.jpg?w=652',
  ],
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
    'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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

const RecipeEdit = ({ mode, onBackBtnClick }) => {
  const isLoggined = useRecoilValue(loginState).isLoggedIn;

  const { recipeId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setDone] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState(initialRecipe);
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');
  const [timeError, setTimeError] = useState(false);
  const [isCookeryModalOpen, setIsCookeryModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const [imageUrls, setImageUrls] = useState(recipeInfo.imgURLs); // 수정 중인 레시피의 이미지 URL 리스트

  const difficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const categoryChange = (event) => {
    setCategory(event.target.value);
  };

  const getRecipeInfo = async () => {
    const json = await (await fetch(`http://localhost:5173/api/recipe/${recipeId}`)).json();
    setRecipeInfo(json);
    setIsLoading(false);
  };

  useEffect(() => {
    if (mode === 'edit' || mode === 'fork') {
      getRecipeInfo();
      setRecipeInfo(recipe); // test
    } else if (mode === 'write') {
      setRecipeInfo(initialRecipe); // test
      setIsLoading(false);
    }
  }, [mode, recipeId]);

  useEffect(() => {
    // POST 요청
    // 이전 페이지로 돌아가서? 성공 메세지 출력
  }, [isDone]);

  // 조건부 렌더링
  if (isLoading) {
    return null;
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
          {recipeInfo.imgURLs[0] ? (
            <Image src={recipeInfo.imgURLs[0]} />
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
            value={category}
            label="recipeCategory"
            onChange={categoryChange}
            sx={{ width: '100%', marginTop: '1rem' }}>
            <MenuItem value={'메인요리'}>메인요리</MenuItem>
            <MenuItem value={'간단요리'}>간단요리</MenuItem>
            <MenuItem value={'비건요리'}>비건요리</MenuItem>
            <MenuItem value={'안주'}>안주</MenuItem>
            <MenuItem value={'베이킹'}>베이킹</MenuItem>
            <MenuItem value={'다이어트'}>다이어트</MenuItem>
            <MenuItem value={'오븐 요리'}>오븐 요리</MenuItem>
            <MenuItem value={'키토'}>키토</MenuItem>
          </Select>
        </FormControl>
        <Divider sx={{ paddingTop: '1rem' }} />
        <RecipeTable ingredients={recipeInfo.ingredients} />
        <Divider sx={{ paddingTop: '1rem' }} />
        <RecipeTags recipeTags={recipeInfo.tags} />
        <Divider sx={{ paddingTop: '1rem' }} />
        <CookeryEdit recipe={recipeInfo} setState={setIsCookeryModalOpen} />
      </Container>
    </>
  );
};

export default RecipeEdit;
