import { useState, useEffect } from 'react';
import {
  Container,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Box,
} from '@mui/material';
import { AppBarWithTitle } from '../../../components/AppBar';
import { Cookery } from '../RecipeInfo/CookeryInfo';
import styled from '@emotion/styled';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Add } from '@mui/icons-material';

const CookeryWrapper = styled.div`
  padding: 1rem;
  padding-top: 2.5rem;
  position: relative;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px;
  margin-bottom: 1rem;
  background-color: #fff;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
`;

const StyledIconButton = styled(IconButton)`
  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const AddButton = styled(Button)`
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px;
`;

const AddButtonText = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CookeryEditModal = ({ recipe, onBackBtnClick, setRecipeState, setModalState }) => {
  const [cookeries, setCookeries] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [currentEditData, setCurrentEditData] = useState({ image: '', desc: '', timer: 0 });
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [newCookery, setNewCookery] = useState({ image: '', desc: '', timer: 0 });
  const [newMinutes, setNewMinutes] = useState(0);
  const [newSeconds, setNewSeconds] = useState(0);

  const initCookeries = () => {
    const cookeries = [];
    for (let i = 0; i < recipe.recipeImgs.length; i++) {
      cookeries.push({
        image: recipe.recipeImgs[i],
        desc: recipe.recipeDescs[i],
        timer: recipe.recipeTimers[i],
      });
    }
    setCookeries(cookeries);
  };

  useEffect(() => {
    initCookeries();
  }, []);

  const handleEdit = (index) => {
    setCurrentEditIndex(index);
    const currentData = cookeries[index];
    setCurrentEditData(currentData);
    setMinutes(Math.floor(currentData.timer / 60));
    setSeconds(currentData.timer % 60);
    setIsEditModalOpen(true);
  };

  const handleDelete = (index) => {
    setCookeries(cookeries.filter((_, i) => i !== index));
  };

  const handleAdd = (index) => {
    setNewCookery({ image: '', desc: '', timer: 0 });
    setNewMinutes(0);
    setNewSeconds(0);
    setIsAddModalOpen(true);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedCookeries = Array.from(cookeries);
    const [movedCookery] = reorderedCookeries.splice(result.source.index, 1);
    reorderedCookeries.splice(result.destination.index, 0, movedCookery);
    setCookeries(reorderedCookeries);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleEditModalSave = () => {
    const updatedCookeries = [...cookeries];
    if (currentEditData.desc !== '') {
      updatedCookeries[currentEditIndex] = {
        ...currentEditData,
        timer: parseInt(minutes, 10) * 60 + parseInt(seconds, 10),
      };
    }
    setCookeries(updatedCookeries);
    setIsEditModalOpen(false);
  };

  const handleAddModalSave = () => {
    const newCookeries = [...cookeries];
    if (newCookery.desc !== '') {
      newCookeries.push({
        ...newCookery,
        timer: parseInt(newMinutes, 10) * 60 + parseInt(newSeconds, 10),
      });
    }
    setCookeries(newCookeries);
    setIsAddModalOpen(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'minutes') {
      setMinutes(value < 0 ? 0 : value);
      setMinutes(value > 999 ? 999 : value);
    } else if (name === 'seconds') {
      setSeconds(value < 0 ? 0 : value);
      setSeconds(value > 59 ? 59 : value);
    } else {
      setCurrentEditData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newMinutes') {
      setNewMinutes(value < 0 ? 0 : value);
      setNewMinutes(value > 999 ? 999 : value);
    } else if (name === 'newSeconds') {
      setNewSeconds(value < 0 ? 0 : value);
      setNewSeconds(value > 59 ? 59 : value);
    } else {
      setNewCookery((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSave = () => {
    const updatedRecipe = {
      ...recipe,
      recipeImgs: cookeries.map((cookery) => cookery.image),
      recipeDescs: cookeries.map((cookery) => cookery.desc),
      recipeTimers: cookeries.map((cookery) => cookery.timer),
    };
    setRecipeState(updatedRecipe);
    setModalState(false);
  };

  return (
    <>
      <AppBarWithTitle
        title="요리법 수정"
        rightIcon="doneInCookeryEditModal"
        onBackBtnClick={onBackBtnClick}
        onRightIconClick={handleSave}
      />
      {cookeries.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
          }}>
          <Typography
            variant="body1"
            style={{
              textAlign: 'center',
              padding: '1rem',
            }}>
            🍳 요리법을 추가해주세요! <br />
            추가된 요리법은 드래그해서 순서를 바꿀 수 있어요.
          </Typography>
        </Box>
      ) : null}

      <Container>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="cookeries">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {cookeries.map((cookery, idx) => (
                  <Draggable key={idx} draggableId={`cookery-${idx}`} index={idx}>
                    {(provided) => (
                      <CookeryWrapper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <ButtonContainer>
                          <StyledIconButton onClick={() => handleEdit(idx)}>
                            <EditIcon />
                          </StyledIconButton>
                          <StyledIconButton onClick={() => handleDelete(idx)}>
                            <DeleteIcon />
                          </StyledIconButton>
                        </ButtonContainer>
                        <Cookery
                          image={cookery.image}
                          desc={cookery.desc}
                          timer={cookery.timer}
                          order={idx + 1}
                        />
                      </CookeryWrapper>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <AddButton
                  variant="contained"
                  onClick={() => handleAdd(cookeries.length)}
                  startIcon={<Add />}>
                  <AddButtonText variant="body">요리법 추가하기</AddButtonText>
                </AddButton>
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Dialog open={isEditModalOpen} onClose={handleEditModalClose}>
          <DialogTitle>요리법 수정</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="이미지 URL"
              type="text"
              fullWidth
              name="image"
              value={currentEditData.image}
              onChange={handleEditInputChange}
            />
            <TextField
              margin="dense"
              label="설명"
              type="text"
              fullWidth
              name="desc"
              value={currentEditData.desc}
              onChange={handleEditInputChange}
              multiline
              rows={4}
              inputProps={{ maxLength: 100 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="분"
                  type="number"
                  fullWidth
                  name="minutes"
                  value={minutes}
                  onChange={handleEditInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="초"
                  type="number"
                  fullWidth
                  name="seconds"
                  value={seconds}
                  onChange={handleEditInputChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditModalClose} color="primary">
              취소
            </Button>
            <Button onClick={handleEditModalSave} color="primary">
              저장
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={isAddModalOpen} onClose={handleAddModalClose}>
          <DialogTitle>요리법 추가</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="이미지 URL"
              type="text"
              fullWidth
              name="image"
              value={newCookery.image}
              onChange={handleAddInputChange}
            />
            <TextField
              margin="dense"
              label="설명"
              type="text"
              fullWidth
              name="desc"
              value={newCookery.desc}
              onChange={handleAddInputChange}
              multiline
              rows={4}
              inputProps={{ maxLength: 100 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="분"
                  type="number"
                  fullWidth
                  name="newMinutes"
                  value={newMinutes}
                  onChange={handleAddInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="초"
                  type="number"
                  fullWidth
                  name="newSeconds"
                  value={newSeconds}
                  onChange={handleAddInputChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddModalClose} color="primary">
              취소
            </Button>
            <Button onClick={handleAddModalSave} color="primary">
              추가
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default CookeryEditModal;
