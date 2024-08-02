import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const GridCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 두 개의 열로 고정 */
  gap: 1rem;
  width: 100%;
`;

const GridCardContainer = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

export const GridCardList = ({ children, title }) => {
  return (
    <GridCardContainer>
      {title ? <Typography variant="h5">{title}</Typography> : <></>}
      <GridCardWrapper>{children}</GridCardWrapper>
    </GridCardContainer>
  );
};

const RollCardWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;

  padding: 0.5rem 0;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;

  & > * {
    // 모든 자식 요소에 적용
    flex: 1 0 auto; // 모든 아이템이 같은 비율로 공간을 차지하도록 설정
    max-width: 40%; // 최소 너비 설정
  }
`;

const RollCardContainer = styled.div`
  display: flex;
  padding-left: 1rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

export const RollCardList = ({ children, title }) => {
  return (
    <RollCardContainer>
      {title ? <Typography variant="h5">{title}</Typography> : <></>}
      <RollCardWrapper>{children}</RollCardWrapper>
    </RollCardContainer>
  );
};
