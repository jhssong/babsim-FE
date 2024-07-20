import styled from '@emotion/styled';

const CardListContainer = styled.div`
  display: flex;
  padding: 0.5rem var(--none, 0rem);
  justify-content: space-between;
  align-items: flex-start;
  align-content: center;
  gap: 1rem 0.5rem;
  align-self: stretch;
  flex-wrap: wrap;
`;

const CardList = ({ children }) => {
  return <CardListContainer>{children}</CardListContainer>;
};

export default CardList;
