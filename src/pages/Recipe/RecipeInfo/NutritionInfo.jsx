import { Box, Skeleton, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

const Container = styled.div`
  width: 100%;
  padding: 1rem;

  img {
    width: 4rem;
    padding-left: 0.5rem;
  }
`;

const Wrapper = styled.div`
  padding: 0.5rem;
`;

const NutritionInfo = ({ nutrition }) => {
  const [info, setInfo] = useState(nutrition);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (info !== undefined && info !== null) {
      // 개행 문자 처리 및 굵은 글씨체 처리
      const formattedInfo = info
        .replace(/\n/g, '<br />')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      setInfo(formattedInfo);
      setIsLoading(false);
    }
  }, [info]);

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Typography variant="h5">영양 성분 정보</Typography>
        <img src="\src\assets\images\google-gemini-icon.svg" alt="Google Gemini" />
      </Box>
      <Wrapper>
        <Typography variant="body1" color="gray" sx={{ marginBottom: '1rem' }}>
          생성형 인공지능 Gemini를 통해 분석한 영양 성분 정보예요. 부정확한 정보가 포함되어 있을 수
          있어요.
        </Typography>
        {isLoading ? (
          <Skeleton variant="text" width="100%" height={30} />
        ) : (
          <Typography variant="body1">{parse(info)}</Typography>
        )}
      </Wrapper>
    </Container>
  );
};

export default NutritionInfo;
