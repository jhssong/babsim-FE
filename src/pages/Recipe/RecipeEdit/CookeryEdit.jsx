import CookeryInfo from '../RecipeInfo/CookeryInfo';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// Container 스타일 정의
const Container = styled.div`
  position: relative;
  border: 2px solid ${({ theme }) => theme.palette.primary.main}; // MUI primary color for border
  background-color: #f0f0f0; // Light gray color for background
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding-top: 30px; // Space for the edit button
`;

// EditButton 스타일 정의
export const EditButton = styled(IconButton)`
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
const CookeryEdit = ({ recipe }) => {
  const theme = useTheme();

  return (
    <Container theme={theme}>
      <EditButton theme={theme} aria-label="edit">
        <EditIcon />
      </EditButton>
      <CookeryInfo
        images={recipe.recipeImgs}
        descs={recipe.recipeDescs}
        timers={recipe.recipeTimers}
      />
    </Container>
  );
};

export default CookeryEdit;
