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

const RecipeTable = ({ ingredients, setIngredients }) => {
  const [selectedCount, setSelectedCount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState(null);

  const renumberIngredients = (ingredients) => {
    return ingredients.map((ingredient, index) => ({
      ...ingredient,
      id: index + 1,
    }));
  };

  const handleCheckboxChange = (id) => {
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient.id === id ? { ...ingredient, selected: !ingredient.selected } : ingredient
    );
    setIngredients(renumberIngredients(updatedIngredients));
    setSelectedCount(updatedIngredients.filter((ing) => ing.selected).length);
  };

  const handleSelectAllClick = (event) => {
    const newSelected = event.target.checked;
    const updatedIngredients = ingredients.map((ingredient) => ({
      ...ingredient,
      selected: newSelected,
    }));
    setIngredients(renumberIngredients(updatedIngredients));
    setSelectedCount(newSelected ? updatedIngredients.length : 0);
  };

  const handleEditClick = (ingredient) => {
    setEditingIngredient(ingredient);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id) => {
    const updatedIngredients = ingredients.filter((ingredient) => ingredient.id !== id);
    setIngredients(renumberIngredients(updatedIngredients));
    setSelectedCount(updatedIngredients.filter((ing) => ing.selected).length);
  };

  const handleDeleteSelected = () => {
    const updatedIngredients = ingredients.filter((ingredient) => !ingredient.selected);
    setIngredients(renumberIngredients(updatedIngredients));
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
      setIngredients(renumberIngredients(updatedIngredients));
    } else {
      // Add new ingredient
      const newIngredient = {
        ...editingIngredient,
        id: ingredients.length + 1,
      };
      const updatedIngredients = [...ingredients, newIngredient];
      setIngredients(renumberIngredients(updatedIngredients));
    }
    handleDialogClose();
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    value = value.replace(' ', '');
    setEditingIngredient({ ...editingIngredient, [name]: value });
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

  useEffect(() => {}, []);

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
            value={editingIngredient?.quantity || ''}
            onChange={handleInputChange}
            inputProps={{
              maxLength: 8,
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
