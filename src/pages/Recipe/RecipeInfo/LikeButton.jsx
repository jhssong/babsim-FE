import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import setLike from '../../../apis/Recipe/RecipeInfo/setLike';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../../../recoil/atoms';

const LikeButton = ({ liked, recipeId }) => {
  const userData = useRecoilValue(userDataState);
  const [isLiked, setIsLiked] = useState(liked);

  const handleLike = async () => {
    await setLike({ recipeId, memberId: userData.id });
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  return (
    <>
      {isLiked ? (
        <FavoriteOutlined color="primary" sx={{ cursor: 'pointer' }} onClick={handleLike} />
      ) : (
        <FavoriteBorderOutlined color="primary" sx={{ cursor: 'pointer' }} onClick={handleLike} />
      )}
    </>
  );
};

export default LikeButton;
