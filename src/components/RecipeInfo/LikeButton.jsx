import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';

const LikeButton = ({ liked }) => {
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    // POST 요청 보내기
    setIsLiked(liked);
  }, [liked]);

  return (
    <>
      {isLiked ? (
        <FavoriteOutlined
          color="primary"
          sx={{ cursor: 'pointer' }}
          onClick={() => setIsLiked(false)}
        />
      ) : (
        <FavoriteBorderOutlined
          color="primary"
          sx={{ cursor: 'pointer' }}
          onClick={() => setIsLiked(true)}
        />
      )}
    </>
  );
};

export default LikeButton;
