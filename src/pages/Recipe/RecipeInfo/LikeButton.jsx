import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useState } from 'react';

const LikeButton = ({ recipeId, memberId }) => {
  const [isLiked, setIsLiked] = useState(false);

   const handleLike = async () => {
     try {
       const response = await axios.post('/api/likes', {
         recipeId,
         memberId,
       });
       isLiked === true ? setIsLiked(false) : setIsLiked(true);

       console.log(response.data); // 성공적으로 요청이 완료된 경우
     } catch (error) {
       console.error('Error liking the recipe:', error); // 요청 실패 시 에러 처리
     }
   };

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
