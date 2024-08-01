import { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { AppBarWithTitle } from '../../components/AppBar';
import { HCard, VCard } from '../../components/Card';

const Cook = ({ recipe, handleBack }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    console.log(recipe);
  }, []);

  return (
    <>
      <RecipeList
        open={open}
        onClose={() => setOpen(false)}
        setIndex={setIndex}
        index={recipe.recipeContents.length}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100vh',
        }}>
        <AppBarWithTitle
          title="Cook"
          rightIcon="list"
          onRightIconClick={() => setOpen(true)}
          onBackBtnClick={handleBack}
        />
      </Box>
    </>
  );
};

const RecipeList = ({ open, onClose, setIndex, index }) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '0.1rem solid #FFFFFF',
    borderRadius: '1rem',
    boxShadow: 3,
    p: 4,
  };

  const buttons = Array.from({ length: index }, (_, i) => i + 1);

  const handleClick = (num) => {
    setIndex(num);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {buttons.map((num) => (
          <Button
            key={num}
            onClick={() => handleClick(num)}
            sx={{
              width: '100%',
            }}>
            <Typography variant="h6">{num}</Typography>
          </Button>
        ))}
      </Box>
    </Modal>
  );
};

export default Cook;
