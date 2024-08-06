import { useEffect, useState } from 'react';
import { Drawer, Box, Typography, IconButton, Button } from '@mui/material';
import { AppBarWithTitle } from '../../components/AppBar';
import { Timer, TimerOff, PlayArrow, Pause, Refresh, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { getImageFromStorage } from '../../apis/firebase/storage';
import styled from '@emotion/styled';

const GlobalContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  img {
    width: 20rem;
    height: 20rem;
    object-fit: cover;
    border-radius: 0.5rem;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }

  @media (max-width: 600px) {
    img {
      width: 15rem;
      height: 15rem;
    }
  }
`;

const StyledTypography = styled(Typography)`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  color: #333;
  line-height: 1.6;
  align-items: center;
`;

const TimerContainer = styled(Box)`
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 5rem;
  gap: 1rem;

  h6 {
    margin-bottom: 0;
  }
`;

const Cook = ({ recipe, handleBack }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [timer, setTimer] = useState(recipe.recipeTimers[index] || 0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageUrls = await Promise.all(
          recipe.recipeDetailImgs.map(async (imgId) => {
            return await getImageFromStorage(imgId);
          })
        );
        setImages(imageUrls);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };
    loadImages();
  }, [recipe.recipeImgs]);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(id);
            setIsRunning(false);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [isRunning]);

  useEffect(() => {
    setTimer(recipe.recipeTimers[index] || 0);
    setIsCompleted(false);
    setIsRunning(false);
  }, [index, recipe.recipeTimers]);

  const startTimer = () => {
    if (isRunning || isCompleted) return;

    setIsRunning(true);
    setIsCompleted(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setTimer(recipe.recipeTimers[index] || 0);
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
      resetTimer();
    }
  };

  const handleNext = () => {
    if (index < recipe.recipeContents.length - 1) {
      setIndex(index + 1);
      resetTimer();
    }
  };

  if (!images.length) {
    return null;
  }

  return (
    <GlobalContainer>
      <RecipeList
        open={open}
        onClose={() => setOpen(false)}
        setIndex={setIndex}
        index={recipe.recipeContents.length}
        recipe={recipe}
        images={images}
      />
      <AppBarWithTitle
        title="요리하기"
        rightIcon="list"
        onRightIconClick={() => setOpen(true)}
        onBackBtnClick={handleBack}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          paddingTop: '5rem',
        }}>
        <CardContainer>
          <img src={images[index]} alt={recipe.recipeContents[index]} />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '75%',
              paddingTop: '3rem',
            }}>
            <Typography variant="h5" sx={{ marginRight: '1rem', lineHeight: '3' }}>
              {index + 1}
            </Typography>
            <StyledTypography variant="h6" sx={{ width: '20rem', lineHeight: '1.6' }}>
              {recipe.recipeContents[index]}
            </StyledTypography>
          </Box>
        </CardContainer>
        <TimerContainer>
          {isCompleted ? <TimerOff color="primary" /> : <Timer color="primary" />}
          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
            {formatTime(timer)}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
            }}>
            <IconButton
              onClick={startTimer}
              disabled={isRunning || isCompleted}
              color={isCompleted ? 'primary' : 'default'}>
              <PlayArrow />
            </IconButton>
            <IconButton onClick={pauseTimer} disabled={!isRunning || isCompleted} color="default">
              <Pause />
            </IconButton>
            <IconButton onClick={resetTimer} color="default">
              <Refresh />
            </IconButton>
          </Box>
        </TimerContainer>
        <Box
          sx={{
            display: 'flex',
            gap: '2rem',
            marginBottom: '5rem',
          }}>
          <Button
            startIcon={<ArrowBackIos />}
            variant="contained"
            size="large"
            onClick={handlePrev}
            disabled={index === 0}>
            이전
          </Button>
          <Button
            endIcon={<ArrowForwardIos />}
            variant="contained"
            size="large"
            onClick={handleNext}
            disabled={index === recipe.recipeContents.length - 1}>
            다음
          </Button>
        </Box>
      </Box>
    </GlobalContainer>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const RecipeList = ({ open, onClose, setIndex, index, recipe, images }) => {
  const buttons = Array.from({ length: index }, (_, i) => i + 1);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 300,
          padding: '1rem',
        }}>
        <Typography variant="h5" sx={{ marginBottom: '1.5rem' }}>
          레시피 순서
        </Typography>
        <Typography variant="body" sx={{ marginBottom: '2rem' }}>
          {recipe.name}
        </Typography>
        {buttons.map((num) => (
          <Button
            key={num}
            variant="outlined"
            onClick={() => {
              setIndex(num - 1);
              onClose();
            }}
            sx={{
              width: '100%',
              padding: '1rem 0',
              fontSize: '1.2rem',
              color: 'black',
              borderRadius: '0.5rem',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'flex-start',
              marginTop: '1rem',
              '&:hover': {
                backgroundColor: '#ddd',
              },
            }}>
            <img
              src={images[num - 1]}
              alt={recipe.recipeContents[num - 1]}
              style={{
                width: '4rem',
                height: '4rem',
                objectFit: 'cover',
                borderRadius: '0.25rem',
                marginLeft: '0.5rem',
                marginRight: '1rem',
              }}
            />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
              <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
                {num}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  paddingInline: '0.7rem',
                  lineHeight: '1.5',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textAlign: 'left',
                }}>
                {recipe.recipeContents[num - 1]}
              </Typography>
            </Box>
          </Button>
        ))}
      </Box>
    </Drawer>
  );
};

export default Cook;
