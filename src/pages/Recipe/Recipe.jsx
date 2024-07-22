import styled from '@emotion/styled';

import { AppBarWithLogo } from '../../components/AppBar';
import NavBar from '../../components/NavBar';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../recoil/atoms';
import { useEffect, useRef, useState } from 'react';
import { Button, Chip, Stack, Switch, Typography } from '@mui/material';
import { GridCardList } from '../../components/CardList';
import { VCard } from '../../components/Card';
import { useNavigate } from 'react-router-dom';
import { Edit } from '@mui/icons-material';

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

  let navigate = useNavigate();

  const categories = [
    '메인요리',
    '밑반찬',
    '간식',
    '간단요리',
    '비건요식',
    '안주',
    '베이킹',
    '다이어트',
    '오븐 요리',
    '키토',
    '도시락',
    '한식',
    '양식',
    '일식',
    '중식',
  ];

  const data = {
    0: [
      {
        id: '0',
        img: 'https://i.namu.wiki/i/U_nuVL__0tNfEPk8Eb9PXISEad-qOs4aOEI0u-Zclq928dHx835CxJjMk3HKzg4ieprrKff_42Th2Tao7yezAg.webp',
        name: 'Kimchi',
        tags: ['Korean', 'Spicy', 'Fermented'],
        cookingTime: 7200,
        rate: 4.8,
        allergies: ['fish'],
      },
      {
        id: '0',
        img: 'https://i.namu.wiki/i/U_nuVL__0tNfEPk8Eb9PXISEad-qOs4aOEI0u-Zclq928dHx835CxJjMk3HKzg4ieprrKff_42Th2Tao7yezAg.webp',
        name: 'Kimchi',
        tags: ['Korean', 'Spicy', 'Fermented'],
        cookingTime: 7200,
        rate: 4.8,
        allergies: ['fish'],
      },
      {
        id: '0',
        img: 'https://i.namu.wiki/i/U_nuVL__0tNfEPk8Eb9PXISEad-qOs4aOEI0u-Zclq928dHx835CxJjMk3HKzg4ieprrKff_42Th2Tao7yezAg.webp',
        name: 'Kimchi',
        tags: ['Korean', 'Spicy', 'Fermented'],
        cookingTime: 7200,
        rate: 4.8,
        allergies: ['fish'],
      },
      {
        id: '0',
        img: 'https://i.namu.wiki/i/U_nuVL__0tNfEPk8Eb9PXISEad-qOs4aOEI0u-Zclq928dHx835CxJjMk3HKzg4ieprrKff_42Th2Tao7yezAg.webp',
        name: 'Kimchi',
        tags: ['Korean', 'Spicy', 'Fermented'],
        cookingTime: 7200,
        rate: 4.8,
        allergies: ['fish'],
      },
      {
        id: '0',
        img: 'https://i.namu.wiki/i/U_nuVL__0tNfEPk8Eb9PXISEad-qOs4aOEI0u-Zclq928dHx835CxJjMk3HKzg4ieprrKff_42Th2Tao7yezAg.webp',
        name: 'Kimchi',
        tags: ['Korean', 'Spicy', 'Fermented'],
        cookingTime: 7200,
        rate: 4.8,
        allergies: ['fish'],
      },
      {
        id: '0',
        img: 'https://i.namu.wiki/i/U_nuVL__0tNfEPk8Eb9PXISEad-qOs4aOEI0u-Zclq928dHx835CxJjMk3HKzg4ieprrKff_42Th2Tao7yezAg.webp',
        name: 'Kimchi',
        tags: ['Korean', 'Spicy', 'Fermented'],
        cookingTime: 7200,
        rate: 4.8,
        allergies: ['fish'],
      },
      {
        id: '0',
        img: 'https://i.namu.wiki/i/U_nuVL__0tNfEPk8Eb9PXISEad-qOs4aOEI0u-Zclq928dHx835CxJjMk3HKzg4ieprrKff_42Th2Tao7yezAg.webp',
        name: 'Kimchi',
        tags: ['Korean', 'Spicy', 'Fermented'],
        cookingTime: 7200,
        rate: 4.8,
        allergies: ['fish'],
      },
      {
        id: '0',
        img: 'https://i.namu.wiki/i/U_nuVL__0tNfEPk8Eb9PXISEad-qOs4aOEI0u-Zclq928dHx835CxJjMk3HKzg4ieprrKff_42Th2Tao7yezAg.webp',
        name: 'Kimchi',
        tags: ['Korean', 'Spicy', 'Fermented'],
        cookingTime: 7200,
        rate: 4.8,
        allergies: ['fish'],
      },
      {
        id: '0',
        img: 'https://i.namu.wiki/i/U_nuVL__0tNfEPk8Eb9PXISEad-qOs4aOEI0u-Zclq928dHx835CxJjMk3HKzg4ieprrKff_42Th2Tao7yezAg.webp',
        name: 'Kimchi',
        tags: ['Korean', 'Spicy', 'Fermented'],
        cookingTime: 7200,
        rate: 4.8,
        allergies: ['fish'],
      },
      {
        id: '0',
        img: 'https://i.namu.wiki/i/U_nuVL__0tNfEPk8Eb9PXISEad-qOs4aOEI0u-Zclq928dHx835CxJjMk3HKzg4ieprrKff_42Th2Tao7yezAg.webp',
        name: 'Potato Salad',
        tags: ['American', 'Vegetarian', 'Creamy'],
        cookingTime: 1200,
        rate: 4.6,
        allergies: ['dairy', 'egg'],
      },
    ],
    1: [
      {
        id: '0',
        img: 'https://dimg.donga.com/wps/SPORTS/IMAGE/2022/01/27/111487381.1.jpg',
        name: 'Spaghetti Carbonara',
        tags: ['Italian', 'Pasta', 'Creamy'],
        cookingTime: 1800,
        rate: 4.5,
        allergies: ['dairy', 'egg'],
      },
      {
        id: '0',
        img: 'https://dimg.donga.com/wps/SPORTS/IMAGE/2022/01/27/111487381.1.jpg',
        name: 'Chicken Curry',
        tags: ['Indian', 'Spicy', 'Chicken'],
        cookingTime: 2400,
        rate: 4.7,
        allergies: ['nut'],
      },
    ],
    2: [
      {
        id: '0',
        img: 'https://isplus.com/data/isp/image/2024/04/24/isp20240424000098.800x.0.jpg',
        name: 'Kimchi',
        tags: ['Korean', 'Spicy', 'Fermented'],
        cookingTime: 7200,
        rate: 4.8,
        allergies: ['fish'],
      },
      {
        id: '0',
        img: 'https://isplus.com/data/isp/image/2024/04/24/isp20240424000098.800x.0.jpg',
        name: 'Potato Salad',
        tags: ['American', 'Vegetarian', 'Creamy'],
        cookingTime: 1200,
        rate: 4.6,
        allergies: ['dairy', 'egg'],
      },
    ],
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        // 여기서 '200'은 스크롤 허용 범위를 설정하는 값
        setShowButton(containerRef.current.scrollTop < 150);
      }
    };

    // 참조된 컴포넌트에 스크롤 이벤트 리스너 등록
    const containerElement = containerRef.current;
    containerElement.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      containerElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getIndexByCategory = () => {
    return data[categories.indexOf(category) + 1] || [];
  };

  const filteredRecipes = getIndexByCategory().filter((recipe) => {
    if (!allergy) return true;
    return !recipe.allergies.some((allergyItem) => user.allergy.includes(allergyItem));
  });

  return (
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
            }}>
            <Edit />
            <Typography variant="caption">레시피 등록하기</Typography>
          </Button>
        )}
      </Container>

      <NavBar page="recipe" />
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
  const [showAll, setShowAll] = useState(false);

  const handleClick = (category) => {
    if (category === buttonLabel) {
      setShowAll((prevShowAll) => !prevShowAll);
    } else {
      const newCategory = selectedCategory === category ? null : category;
      setSelectedCategory(newCategory);
      setCategory(newCategory || 'all');
    }
  };
  const buttonLabel = showAll ? '접기' : '모두보기';
  const visibleCategories = showAll
    ? [...categories, `${buttonLabel}`]
    : [...categories.slice(0, 7), `${buttonLabel}`];

  return (
    <CategoryContainer>
      <Typography variant="h5">다양한 요리 카테고리</Typography>
      <Stack spacing={1}>
        {Array.from({ length: Math.ceil(visibleCategories.length / 4) }).map((_, rowIndex) => (
          <Stack direction="row" spacing={1} key={rowIndex}>
            {visibleCategories.slice(rowIndex * 4, rowIndex * 4 + 4).map((category) => (
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
