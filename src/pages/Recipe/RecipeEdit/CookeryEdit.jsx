import CookeryInfo from '../RecipeInfo/CookeryInfo';
import styled from '@emotion/styled';
import { useTheme, Typography } from '@mui/material';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// Container 스타일 정의
const Container = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.palette.primary.main}; 
  background-color: {({ theme }) => theme.palette.background.paper};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding-top: 30px; // Space for the edit button
  display: flex;
  flex-direction: column;
  align-items: center;f
  justify-content: center;
`;

// EditButton 스타일 정의
const EditButton = styled(IconButton)`
  position: absolute;
  border-radius: 5%;
  width: 32px;
  height: 32px;
  top: 3%;
  right: 5%;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: white; // Button icon color
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

// CookeryEdit 컴포넌트 정의
const CookeryEdit = ({ recipe, setState }) => {
  const theme = useTheme();

  const onClick = () => {
    setState(true);
  };

  return (
    <Container theme={theme}>
      {recipe.recipeDescs.length === 0 ? (
        <Button variant="text" onClick={onClick}>
          <Typography variant="h6">요리법 추가하기</Typography>
        </Button>
      ) : (
        <EditButton theme={theme} aria-label="edit" onClick={onClick}>
          <EditIcon />
        </EditButton>
      )}
      <CookeryInfo
        images={recipe.recipeImgs}
        descs={recipe.recipeDescs}
        timers={recipe.recipeTimers}
      />
    </Container>
  );
};

export default CookeryEdit;
