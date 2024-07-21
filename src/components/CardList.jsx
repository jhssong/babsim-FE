import styled from '@emotion/styled';

const GridCardListContainer = styled.div`
  display: flex;
  padding: 0.5rem var(--none, 0rem);
  justify-content: space-between;
  align-items: flex-start;
  align-content: center;
  gap: 1rem 0.5rem;
  align-self: stretch;
  flex-wrap: wrap;
`;

export const GridCardList = ({ children }) => {
  return <GridCardListContainer>{children}</GridCardListContainer>;
};

const RollCardListContainer = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;

  padding: 0.5rem var(--none, 0rem);
  align-items: center;
  gap: 1rem;
  align-self: stretch;
`;

export const RollCardList = ({ children }) => {
  return <RollCardListContainer>{children}</RollCardListContainer>;
};
