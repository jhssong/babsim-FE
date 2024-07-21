import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const GridCardWrapper = styled.div`
  display: flex;
  padding: 0.5rem var(--none, 0rem);
  justify-content: space-between;
  align-items: flex-start;
  align-content: center;
  gap: 1rem 0.5rem;
  align-self: stretch;
  flex-wrap: wrap;
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

  padding: 0.5rem var(--none, 0rem);
  align-items: center;
  gap: 1rem;
  align-self: stretch;
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
