import styled from '@emotion/styled';

import { useRecoilValue } from 'recoil';
import { loginState } from '../../recoil/atoms';
import { useEffect, useRef, useState } from 'react';
import { Button, Chip, Stack, Switch, Typography } from '@mui/material';
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
  const isLoggined = useRecoilValue(loginState).isLoggedIn;
  const user = useRecoilValue(loginState).user;
  const [category, setCategory] = useState('all');
  const [allergy, setAllergy] = useState(true);
  const containerRef = useRef(null);
  const [showButton, setShowButton] = useState(true);
  const [writeRecipe, setWriteRecipe] = useState(false);
  const [recipesData, setRecipesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryData, setCategoryData] = useState([]); // 선택된 카테고리의 데이터를 저장할 상태

  let navigate = useNavigate();

  const categories = [
    '메인요리',
    '간단요리',
    '비건요리',
    '안주',
    '베이킹',
    '다이어트',
    '오븐 요리',
    '키토',
  ];

  const getIndexByCategory = () => {
    return categoryData || [];
  };

  const filteredRecipes = getIndexByCategory().filter((recipe) => {
    if (!allergy) return true;
    return !recipe.allergies.some((allergyItem) => user.allergy.includes(allergyItem));
  });

  const writeHandClick = () => {
    return isLoggined ? setWriteRecipe(true) : navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setShowButton(containerRef.current.scrollTop < 150);
      }
    };

    const fetchRecommendedRecipe = async (categoryId) => {
      if (recipesData[categoryId]) {
        // 이미 데이터가 있으면 다시 요청하지 않고, 기존 데이터를 사용
        setCategoryData(recipesData[categoryId]);
        setLoading(false);
      } else {
        try {
          const data = await getRecipeCateoreis(categoryId);
          setRecipesData((prevData) => ({ ...prevData, [categoryId]: data.list }));
          setCategoryData(data.list);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      }
    };

    const categoryId = categories.indexOf(category);
    fetchRecommendedRecipe(categoryId);

    const containerElement = containerRef.current;
    containerElement.addEventListener('scroll', handleScroll);

    return () => {
      containerElement.removeEventListener('scroll', handleScroll);
    };
  }, [category]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {writeRecipe ? (
        <RecipeEdit mode={'write'} onBackBtnClick={setWriteRecipe} />
      ) : (
        <>
          <AppBarWithLogo />
          <Container ref={containerRef}>
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

// Categories 컴포넌트는 그대로 사용
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
    setCategory(newCategory || 'all');
  };

  return (
    <CategoryContainer>
      <Typography variant="h5">다양한 요리 카테고리</Typography>
      <Stack spacing={1}>
        {Array.from({ length: Math.ceil(categories.length / 4) }).map((_, rowIndex) => (
          <Stack direction="row" spacing={1} key={rowIndex}>
            {categories.slice(rowIndex * 4, rowIndex * 4 + 4).map((category) => (
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

// AllergyFilter 컴포넌트는 그대로 사용
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
