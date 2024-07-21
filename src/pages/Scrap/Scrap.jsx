import styled from '@emotion/styled';

import { AppBarWithLogo } from '../../components/AppBar';
import NavBar from '../../components/NavBar';
import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { GridCardList } from '../../components/CardList';
import { VCard } from '../../components/Card';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 7rem);
`;

const Scrap = () => {
  const [value, setValue] = useState('fork');
  let navigate = useNavigate();

  const fork = {
    list: [
      {
        id: '0',
        img: 'https://i.namu.wiki/i/R0AhIJhNi8fkU2Al72pglkrT8QenAaCJd1as-d_iY6MC8nub1iI5VzIqzJlLa-1uzZm--TkB-KHFiT-P-t7bEg.webp',
        name: 'Spaghetti Carbonara',
        tags: ['Italian', 'Pasta', 'Creamy'],
        cookingTime: 1800,
        rate: 4.5,
        allergies: ['dairy', 'egg'],
      },
      {
        id: '0',
        img: 'https://i.namu.wiki/i/R0AhIJhNi8fkU2Al72pglkrT8QenAaCJd1as-d_iY6MC8nub1iI5VzIqzJlLa-1uzZm--TkB-KHFiT-P-t7bEg.webp',
        name: 'Chicken Curry',
        tags: ['Indian', 'Spicy', 'Chicken'],
        cookingTime: 2400,
        rate: 4.7,
        allergies: ['nut'],
      },
      {
        id: '0',
        img: 'https://i.namu.wiki/i/R0AhIJhNi8fkU2Al72pglkrT8QenAaCJd1as-d_iY6MC8nub1iI5VzIqzJlLa-1uzZm--TkB-KHFiT-P-t7bEg.webp',
        name: '조재용의 특제 시부야 초록라멘 국물이 아주 끝내줘요 아주 그냥 ',
        tags: ['Vegan', 'Healthy', 'Bowl', 'Bowl', 'Bowl', 'Bowl', 'Bowl', 'Bowl'],
        cookingTime: 1500,
        rate: 4.9,
        allergies: ['soy', 'sesame'],
      },
      {
        id: '0',
        img: 'https://i.namu.wiki/i/R0AhIJhNi8fkU2Al72pglkrT8QenAaCJd1as-d_iY6MC8nub1iI5VzIqzJlLa-1uzZm--TkB-KHFiT-P-t7bEg.webp',
        name: 'Beef Tacos',
        tags: ['Mexican', 'Beef', 'Spicy'],
        cookingTime: 1200,
        rate: 4.3,
        allergies: ['gluten'],
      },
      {
        id: '0',
        img: 'https://i.namu.wiki/i/R0AhIJhNi8fkU2Al72pglkrT8QenAaCJd1as-d_iY6MC8nub1iI5VzIqzJlLa-1uzZm--TkB-KHFiT-P-t7bEg.webp',
        name: 'Beef Tacos',
        tags: ['Mexican', 'Beef', 'Spicy'],
        cookingTime: 1200,
        rate: 4.3,
        allergies: ['gluten'],
      },
    ],
  };

  const like = {
    list: [
      {
        id: '0',
        img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
        name: 'Spaghetti Carbonara',
        tags: ['Italian', 'Pasta', 'Creamy'],
        cookingTime: 1800,
        rate: 4.5,
        allergies: ['dairy', 'egg'],
      },
      {
        id: '0',
        img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
        name: 'Chicken Curry',
        tags: ['Indian', 'Spicy', 'Chicken'],
        cookingTime: 2400,
        rate: 4.7,
        allergies: ['nut'],
      },
      {
        id: '0',
        img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
        name: '조재용의 특제 시부야 초록라멘 국물이 아주 끝내줘요 아주 그냥 ',
        tags: ['Vegan', 'Healthy', 'Bowl', 'Bowl', 'Bowl', 'Bowl', 'Bowl', 'Bowl'],
        cookingTime: 1500,
        rate: 4.9,
        allergies: ['soy', 'sesame'],
      },
      {
        id: '0',
        img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
        name: 'Beef Tacos',
        tags: ['Mexican', 'Beef', 'Spicy'],
        cookingTime: 1200,
        rate: 4.3,
        allergies: ['gluten'],
      },
      {
        id: '0',
        img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
        name: 'Beef Tacos',
        tags: ['Mexican', 'Beef', 'Spicy'],
        cookingTime: 1200,
        rate: 4.3,
        allergies: ['gluten'],
      },
    ],
  };
  const my = {
    list: [
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
      {
        id: '0',
        img: 'https://dimg.donga.com/wps/SPORTS/IMAGE/2022/01/27/111487381.1.jpg',
        name: '조재용의 특제 시부야 초록라멘 국물이 아주 끝내줘요 아주 그냥 ',
        tags: ['Vegan', 'Healthy', 'Bowl', 'Bowl', 'Bowl', 'Bowl', 'Bowl', 'Bowl'],
        cookingTime: 1500,
        rate: 4.9,
        allergies: ['soy', 'sesame'],
      },
      {
        id: '0',
        img: 'https://dimg.donga.com/wps/SPORTS/IMAGE/2022/01/27/111487381.1.jpg',
        name: 'Beef Tacos',
        tags: ['Mexican', 'Beef', 'Spicy'],
        cookingTime: 1200,
        rate: 4.3,
        allergies: ['gluten'],
      },
      {
        id: '0',
        img: 'https://dimg.donga.com/wps/SPORTS/IMAGE/2022/01/27/111487381.1.jpg',
        name: 'Beef Tacos',
        tags: ['Mexican', 'Beef', 'Spicy'],
        cookingTime: 1200,
        rate: 4.3,
        allergies: ['gluten'],
      },
    ],
  };

  return (
    <>
      <AppBarWithLogo />
      <Container>
        <CostomTabs value={value} setValue={setValue} />
        <GridCardList>
          {(value === 'like' ? like : value === 'fork' ? fork : my).list.map((recipe, index) => (
            <VCard
              key={recipe.id}
              product={recipe}
              index={index}
              type="recipe"
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            />
          ))}
        </GridCardList>
      </Container>

      <NavBar page="scrap" />
    </>
  );
};

const CostomTabs = ({ value, setValue }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
        sx={{
          '& .MuiTabs-flexContainer': {
            justifyContent: 'space-between',
          },
        }}>
        <Tab value="like" label="찜한 레시피" />
        <Tab value="fork" label="포크한 레시피" />
        <Tab value="my" label="나의 레시피" />
      </Tabs>
    </Box>
  );
};

export default Scrap;
