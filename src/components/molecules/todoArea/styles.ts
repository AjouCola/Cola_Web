import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 10rem;
  gap: 1rem;
  padding: 0.5rem 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: none;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  gap: 0.2rem;
`;

const FolderTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: white;
  border-radius: 2px;
  color: ${({ theme: { colors } }) => colors.blue[500]};
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  span {
    padding: 0 0.3rem;
  }
`;
const BtnAddTodo = styled.button`
  cursor: pointer;
  border-radius: 100%;
  border: none;
  font-size: 1.2rem;
  background: none;
  width: 1.5rem;
  height: 1.5rem;
  color: ${({ theme: { colors } }) => colors.blue[500]};
  &:hover {
    background: #f2f2f2;
  }
`;

export { Container, Wrapper, FolderTitleWrapper, BtnAddTodo };
