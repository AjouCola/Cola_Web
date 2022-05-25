import styled from '@emotion/styled';

import { BoardLayout } from 'src/store/board';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 2rem;
  max-width: 1440px;
`;

interface BoardListProps {
  type: BoardLayout;
}
const BoardList = styled.div<BoardListProps>`
  margin-top: 20px;
  flex: 1;
  padding: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ type }) => (type === BoardLayout.SIMPLE_LIST ? '50px' : '1.2rem')};
`;

const BoardListTitle = styled.h2`
  font-size: 2.4rem;
  color: ${({ theme: { colors } }) => colors.blue[500]};
  padding: 0;
  margin: 0;
`;
const FlexEnd = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
`;
const BoardListUtilWrapper = styled(FlexEnd)`
  padding-bottom: 0.2rem;
  select {
    padding: 0.3rem 0.5rem;
    box-shadow: 0px 0px 6px #00000029;
    border-radius: 5px;
    border: none;
    color: ${({ theme: { colors } }) => colors.gray[900]};
    font-weight: 500;
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
  }
`;

const TypeIcon = styled.span<{ clicked: boolean }>`
  opacity: ${({ clicked }) => (clicked ? 1 : 0.5)};
  cursor: pointer;
  svg {
    opacity: 1;
  }
`;

export { Container, BoardList, BoardListTitle, FlexEnd, BoardListUtilWrapper, TypeIcon };
