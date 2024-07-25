import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material';
import { useState } from 'react';
import setLike from '../../../apis/Recipe/RecipeInfo/setLike';

const LikeButton = ({ liked, recipeId, memberId }) => {
  const [isLiked, setIsLiked] = useState(liked);

  const handleLike = async () => {
    setLike(recipeId, memberId);
    setIsLiked(!isLiked);
  }

  return (
    <>
      {isLiked ? (
        <FavoriteOutlined
          color="primary"
          sx={{ cursor: 'pointer' }}
          onClick={handleLike}
        />
      ) : (
        <FavoriteBorderOutlined
          color="primary"
          sx={{ cursor: 'pointer' }}
          onClick={handleLike}
        />
      )}
    </>
  );
};

export default LikeButton;
