import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppBarWithTitle } from '../../components/AppBar';
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
  Backdrop,
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
import postRecipeWrite from '../../apis/Recipe/RecipeEdit/postRecipeWrite';
import { getImageFromStorage } from '../../apis/firebase/storage';
import putRecipeEdit from '../../apis/Recipe/RecipeEdit/putRecipeEdit';
import postRecipeFork from '../../apis/Recipe/RecipeEdit/postRecipeFork';

// 초기 레시피 데이터 설정
const initialRecipe = {
  id: null,
  recipeImgs: [null],
  name: '',
  description: '',
  difficulty: 'EASY',
  cookingTime: 0,
  categoryName: 'Main Courses',
  tags: [],
  allergies: [],
  ingredients: [],
  reviews: [],
  recipeDetailImgs: [],
  recipeContents: [],
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
  color: white;
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

const RecipeEdit = ({ mode, onBackBtnClick, onComplete, setState }) => {
  const userData = useRecoilValue(userDataState);
  const { recipeId } = useParams();

  const [recipeInfo, setRecipeInfo] = useState(initialRecipe);
  const [category, setCategory] = useState('');
  const [timeError, setTimeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [isDone, setDone] = useState(false);
  const [isCookeryModalOpen, setIsCookeryModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageIds, setImageIds] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();

  const fetchRecipeInfo = async (userId) => {
    try {
      const json = await getRecipeInfo({ recipeId, userId });
      setRecipeInfo(json);
      setImageUrls(json.recipeImgs);
      setImageIds(json.recipeImgs);

      if (mode === 'edit' && json.creatorId !== userId.userId) {
        alert('작성자만 수정할 수 있어요!');
        navigate('/recipe/' + recipeId);
        return;
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch recipe info:', error);
    }
  };

  // 새로운 레시피 POST 요청
  const postNewRecipe = async (userId) => {
    try {
      const response = postRecipeWrite({ recipeInfo, creatorId: userData.id });
      console.log(response);
      setDone(true);
    } catch (error) {
      console.error('Failed to post recipe info:', error);
    }
  };

  // 수정한 레시피 PUT 요청
  const putEdittedRecipe = async (userId) => {
    setIsLoading(true);
    try {
      const response = await putRecipeEdit({ recipeInfo, creatorId: userData.id, recipeId });
      console.log(response);
      setDone(true);
    } catch (error) {
      console.error('Failed to put editted recipe:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 포크한 레시피 POST 요청
  const postForkedRecipe = async () => {
    setIsLoading(true);
    try {
      const response = await postRecipeFork({
        recipeInfo,
        creatorId: userData.id,
        forkRecipeId: recipeId,
      });
      console.log(response);
      setDone(true);
    } catch (error) {
      console.error('Failed to post forked recipe:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if ((mode === 'edit' || mode === 'fork') && userData !== null) {
      fetchRecipeInfo({ userId: userData.id });
    } else if (mode === 'write') {
      setRecipeInfo(initialRecipe);
      setIsLoading(false);
      console.log(recipeInfo);
    }
  }, [userData]);

  useEffect(() => {
    const loadImages = async () => {
      const imageUrls = await Promise.all(
        imageIds.map(async (imgId) => {
          console.log(imgId);
          return await getImageFromStorage(imgId);
        })
      );
      setImageUrls(imageUrls);
    };
    loadImages();
  }, [imageIds]);

  useEffect(() => {
    if (
      recipeInfo.recipeImgs.length === 0 ||
      recipeInfo.recipeContents.length === 0 ||
      recipeInfo.recipeDetailImgs.length === 0 ||
      recipeInfo.name === '' ||
      recipeInfo.description === '' ||
      recipeInfo.cookingTime === 0 ||
      recipeInfo.ingredients.length === 0
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    console.log(isValid);
    console.log(recipeInfo);
  }, [recipeInfo]);

  useEffect(() => {
    if (isDone === true) {
      if (mode === 'edit') {
        navigate('/recipe/' + recipeId);
      } else {
        setState(false); // 모달 닫기
        onComplete(true);
        setDone(false);
      }
    }
  }, [isDone]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSaveClick = () => {
    if (isValid) {
      if (mode === 'edit') {
        putEdittedRecipe({ userId: userData.id });
      } else if (mode === 'write') {
        postNewRecipe({ userId: userData.id });
      } else if (mode === 'fork') {
        postForkedRecipe({ userId: userData.id });
      }
    } else {
      setSnackbarMessage('입력되지 않은 항목이 있어요!');
      setSnackbarOpen(true);
    }
  };

  if (isLoading) {
    return (
      <Backdrop open={true} sx={{ color: '#fff', zIndex: 10000 }}>
        <CircularProgress variantcolor="primary" />
      </Backdrop>
    );
  }

  if (isImageModalOpen) {
    const handleCancel = () => {
      setIsImageModalOpen(false);
    };

    const handleDone = (localImageUrls, localImageIds) => {
      setImageUrls(localImageUrls);
      setImageIds(localImageIds);
      setRecipeInfo({ ...recipeInfo, recipeImgs: localImageIds });
      setIsImageModalOpen(false);
    };
    return (
      <>
        <ImageCard
          mode={'indirect'}
          initialImageUrls={imageUrls}
          initialImageIds={imageIds}
          maxImageCount={3}
          onCancel={handleCancel}
          onDone={handleDone}
        />
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
        rightIcon={
          mode === 'edit'
            ? 'doneInRecipeEdit'
            : mode === 'fork'
              ? 'doneInRecipeFork'
              : 'doneInRecipeWrite'
        }
        onBackBtnClick={onBackBtnClick}
        onRightIconClick={handleSaveClick}
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
          inputProps={{ maxLength: 30 }}
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
            onChange={(e) => {
              setRecipeInfo({ ...recipeInfo, categoryName: e.target.value });
            }}
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
        <CookeryEdit
          recipe={recipeInfo}
          setState={setIsCookeryModalOpen}
          setRecipeState={setRecipeInfo}
        />
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RecipeEdit;
