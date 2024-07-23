import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Toolbar,
  Typography,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';

const RecipeTable = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState(null);

  const handleCheckboxChange = (id) => {
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient.id === id ? { ...ingredient, selected: !ingredient.selected } : ingredient
    );
    setIngredients(updatedIngredients);
    setSelectedCount(updatedIngredients.filter((ing) => ing.selected).length);
  };

  const handleSelectAllClick = (event) => {
    const newSelected = event.target.checked;
    const updatedIngredients = ingredients.map((ingredient) => ({
      ...ingredient,
      selected: newSelected,
    }));
    setIngredients(updatedIngredients);
    setSelectedCount(newSelected ? updatedIngredients.length : 0);
  };

  const handleEditClick = (ingredient) => {
    setEditingIngredient(ingredient);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id) => {
    const updatedIngredients = ingredients.filter((ingredient) => ingredient.id !== id);
    setIngredients(updatedIngredients);
    setSelectedCount(updatedIngredients.filter((ing) => ing.selected).length);
  };

  const handleDeleteSelected = () => {
    const updatedIngredients = ingredients.filter((ingredient) => !ingredient.selected);
    setIngredients(updatedIngredients);
    setSelectedCount(0);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingIngredient(null);
  };

  const handleDialogSave = () => {
    if (editingIngredient.id) {
      // Update existing ingredient
      const updatedIngredients = ingredients.map((ingredient) =>
        ingredient.id === editingIngredient.id ? editingIngredient : ingredient
      );
      setIngredients(updatedIngredients);
    } else {
      // Add new ingredient
      const newIngredient = {
        ...editingIngredient,
        id: ingredients.length + 1,
      };
      setIngredients([...ingredients, newIngredient]);
    }
    handleDialogClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingIngredient({ ...editingIngredient, [name]: value });
  };

  const handleNumberChange = (event) => {
    event.target.value < 1 ? (event.target.value = 1) : event.target.value;
    event.target.value > 999 ? (event.target.value = 999) : event.target.value;
    setEditingIngredient({ ...editingIngredient, [name]: event.target.value });
  };

  const handleAddClick = () => {
    const newIngredient = {
      id: null,
      name: '',
      quantity: 1,
      selected: false,
    };
    setEditingIngredient(newIngredient);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    // API 연결시 코드 수정하기
    setIngredients([
      { id: 1, name: '방울토마토', quantity: 1, selected: false },
      { id: 2, name: '계란', quantity: 1, selected: false },
      { id: 3, name: '양상추', quantity: 1, selected: false },
      { id: 4, name: '소세지', quantity: 10, selected: false },
    ]);
  }, []);

  return (
    <div>
      <Toolbar>
        {selectedCount === 0 ? (
          <Typography variant="h6">재료</Typography>
        ) : (
          <Typography variant="body" fontWeight="bold">
            {selectedCount}개가 선택됨
          </Typography>
        )}
        <div style={{ marginLeft: 'auto' }}>
          <IconButton color="primary" onClick={handleAddClick}>
            <Add />
          </IconButton>
          <IconButton color="primary" onClick={handleDeleteSelected}>
            <Delete />
          </IconButton>
        </div>
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedCount > 0 && selectedCount < ingredients.length}
                  checked={selectedCount === ingredients.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>재료</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>개수</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((ingredient) => (
              <TableRow key={ingredient.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={ingredient.selected}
                    onChange={() => handleCheckboxChange(ingredient.id)}
                  />
                </TableCell>
                <TableCell>{ingredient.name}</TableCell>
                <TableCell>{ingredient.quantity}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEditClick(ingredient)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(ingredient.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{editingIngredient?.id ? '재료 수정' : '재료 추가'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="재료"
            name="name"
            value={editingIngredient?.name || ''}
            onChange={handleInputChange}
            inputProps={{
              maxLength: 12,
            }}
            fullWidth
          />
          <TextField
            margin="dense"
            label="개수"
            name="quantity"
            type="number"
            value={editingIngredient?.quantity || ''}
            onChange={handleNumberChange}
            inputProps={{
              maxLength: 3,
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>취소</Button>
          <Button onClick={handleDialogSave}>저장</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RecipeTable;
