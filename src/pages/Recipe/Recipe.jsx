import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { isLoggedInState, userDataState } from '../../recoil/atoms';
import { useEffect, useRef, useState } from 'react';
import { Button, Chip, Snackbar, Stack, Switch, Typography, Alert } from '@mui/material';
import { GridCardList } from '../../components/CardList';
import { VCard } from '../../components/Card';
import { useNavigate } from 'react-router-dom';
import { Edit } from '@mui/icons-material';
import { AppBarWithLogo } from '../../components/AppBar';
import NavBar from '../../components/NavBar';
import RecipeEdit from './RecipeEdit';
import { getRecipeCateoreis } from '../../apis/Recipe/getRecipe';
import Loading from '../../components/Loading';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 7rem);
`;

const Recipe = () => {
  const isLoggined = useRecoilValue(isLoggedInState);
  const userData = useRecoilValue(userDataState);
  const [category, setCategory] = useState('모든요리');
  const [allergy, setAllergy] = useState(true);
  const containerRef = useRef(null);
  const [showButton, setShowButton] = useState(true);
  const [writeRecipe, setWriteRecipe] = useState(false);

  const [recipesData, setRecipesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [writeComplete, setWriteComplete] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  let navigate = useNavigate();

  const categories = [
    '모든요리',
    '메인요리',
    '간단요리',
    '비건요리',
    '안주',
    '베이킹',
    '다이어트',
    '오븐 요리',
    '키토',
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        // 여기서 '150'은 스크롤 허용 범위를 설정하는 값
        setShowButton(containerRef.current.scrollTop < 150);
      }
    };

    const fetchRecipeCategory = async (categoryId) => {
      try {
        const data = await getRecipeCateoreis(categoryId);
        setRecipesData((prevData) => ({
          ...prevData,
          [category]: data,
        }));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    const registerScrollListener = () => {
      const containerElement = containerRef.current;
      if (containerElement) {
        containerElement.addEventListener('scroll', handleScroll);
      } else {
        console.error('containerElement is null, retrying...');
        setTimeout(registerScrollListener, 100); // 100ms 후에 다시 시도
      }
    };

    registerScrollListener();

    if (!recipesData[category] || recipesData[category].length === 0) {
      fetchRecipeCategory(categories.indexOf(category));
    }
    return () => {
      const containerElement = containerRef.current;
      if (containerElement) {
        containerElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [category]);

  const filteredRecipes = (recipesData[category] || []).filter((recipe) => {
    if (!allergy) return true; // 알레르기 필터링을 사용하지 않는 경우
    if (!recipe.allergies) return true; // allergies 속성이 없는 경우 필터에서 제외하지 않음
    return !recipe.allergies.some((allergy) => userData.allergies.includes(allergy));
  });

  const writeHandClick = () => {
    return isLoggined ? setWriteRecipe(true) : navigate('/login');
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {writeRecipe ? (
        <RecipeEdit
          mode={'write'}
          onBackBtnClick={setWriteRecipe}
          onComplete={() => {
            setWriteComplete(true);
            setSnackbarOpen(true);
          }}
          setState={setWriteRecipe}
        />
      ) : (
        <>
          <AppBarWithLogo />
          <Container ref={containerRef}>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={2000} // 2초 후 자동으로 닫힘
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                레시피 등록에 성공했어요!
              </Alert>
            </Snackbar>
            <Categories setCategory={setCategory} categories={categories} />
            {isLoggined ? <AllergyFilter allergy={allergy} setAllergy={setAllergy} /> : <></>}
            <GridCardList>
              {filteredRecipes.map((recipe, index) => (
                <VCard
                  key={recipe.id}
                  product={recipe}
                  index={index}
                  type="recipe"
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                />
              ))}
            </GridCardList>
            {showButton && (
              <Button
                variant="contained"
                sx={{
                  borderRadius: '4rem',
                  position: 'fixed',
                  bottom: '8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
                onClick={writeHandClick}>
                <Edit />
                <Typography variant="caption">레시피 등록하기</Typography>
              </Button>
            )}
          </Container>

          <NavBar page="recipe" />
        </>
      )}
    </>
  );
};

const CategoryContainer = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
`;

const Categories = ({ setCategory, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleClick = (category) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    setCategory(newCategory || '모든요리');
  };

  const filteredCategories = categories.slice(1, 9);

  return (
    <CategoryContainer>
      <Typography variant="h5">다양한 요리 카테고리</Typography>
      <Stack spacing={1}>
        {Array.from({ length: Math.ceil(filteredCategories.length / 4) }).map((_, rowIndex) => (
          <Stack direction="row" spacing={1} key={rowIndex}>
            {filteredCategories.slice(rowIndex * 4, rowIndex * 4 + 4).map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => handleClick(category)}
                variant="outlined"
                sx={{
                  color: selectedCategory === category ? 'primary.main' : 'inherit',
                  borderColor: selectedCategory === category ? 'primary.light' : 'inherit',
                }}
              />
            ))}
          </Stack>
        ))}
      </Stack>
    </CategoryContainer>
  );
};

const AllergyFilterContainer = styled.div`
  display: flex;
  padding: 0rem 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  align-self: stretch;
`;

const AllergyFilter = ({ allergy, setAllergy }) => {
  return (
    <AllergyFilterContainer>
      <Typography variant="caption" sx={{ color: 'subbackground.main' }}>
        알레르기 필터
      </Typography>
      <Switch defaultChecked color="primary" onChange={() => setAllergy(!allergy)} />
    </AllergyFilterContainer>
  );
};

export default Recipe;
