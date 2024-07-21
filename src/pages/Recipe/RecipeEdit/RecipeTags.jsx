import { useState } from 'react';
import { TextField, IconButton, Chip, Box, InputAdornment } from '@mui/material';
import { AddOutlined, Cancel } from '@mui/icons-material';

const RecipeTags = ({ recipeTags }) => {
  const [tags, setTags] = useState(recipeTags);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.length <= 10 && tagInput && tags.length < 3 && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTag();
    }
  };

  return (
    <div>
      <TextField
        id="recipeTags"
        label="레시피 태그"
        type="text"
        sx={{ width: '100%', marginTop: '1rem' }}
        value={tagInput}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= 10) {
            setTagInput(value);
          }
        }}
        onKeyPress={handleKeyPress}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleAddTag} disabled={tags.length >= 3 || !tagInput}>
                <AddOutlined color="primary" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '1rem' }}>
        {tags.map((tag, index) => (
          <Chip
            color="primary"
            key={index}
            label={tag}
            onDelete={() => handleDeleteTag(tag)}
            sx={{ margin: '0.25rem' }}
            deleteIcon={<Cancel color="secondary" />}
          />
        ))}
      </Box>
    </div>
  );
};

export default RecipeTags;
