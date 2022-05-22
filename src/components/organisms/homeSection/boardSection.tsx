import { useState } from 'react';

import styled from '@emotion/styled';

import BoardItem from '@components/molecules/homeBoardItem';
import { theme } from '@styles/theme';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme: { colors } }) => colors.blue[500]};
  box-shadow: 0px 0px 6px #00000029;
  border-radius: 5px;
  display: grid;
  grid-template:
    'title content' 1fr
    '. content' 4fr
    'btn content' 1fr
    /1fr 8fr;
  padding: 1rem;
  gap: 1rem;
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template:
      'title  . btn' 1fr
      'content content content' 5fr
      /1fr 4fr 1fr;
  }
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template:
      'title . btn' 1fr
      'content content content' 5fr
      /1fr 4fr 1fr;
  }
`;

const BoardTitle = styled.h3`
  grid-area: title;
  font-size: 25px;
  color: white;
  position: relative;
  white-space: nowrap;
  &::after {
    position: absolute;
    top: 3rem;
    left: 1.6rem;
    content: '';
    width: 40%;
    height: 3px;
    background: white;
  }
`;
const BoardItemSection = styled.div`
  grid-area: content;
  flex: 1;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    width: 7px;
    background: ${({ theme: { colors } }) => colors.blue[300]};
    border-radius: 8px;
  }
`;

const InterestBtnWrapper = styled.div`
  grid-area: btn;
  display: flex;
  column-gap: 1rem;
  color: white;
  span {
    white-space: nowrap;
  }
`;

interface IInterestBtn {
  on: boolean;
}
const InterestBtn = styled.div<IInterestBtn>`
  width: 36px;
  height: 20px;
  border-radius: 11px;
  background: white;
  cursor: pointer;
  transition: all 300ms linear;
  position: relative;
  span {
    transition: all 200ms linear;
    position: absolute;
    top: calc(50% - 8px);
    left: ${({ on }) => (on ? '4px' : '16px')};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ theme: { colors } }) => colors.blue[500]};
  }
`;

const BoardSection = () => {
  const [boardItems, setBoardItems] = useState([1, 1, 1, 1, 1, 1, 1]);
  const [on, setOn] = useState(false);

  const onClickInterest = () => {
    setOn((prev) => !prev);
  };

  return (
    <Container>
      <BoardTitle>인기글</BoardTitle>
      <InterestBtnWrapper>
        <span>관심</span>
        <InterestBtn on={on} onClick={onClickInterest}>
          <span />
        </InterestBtn>
      </InterestBtnWrapper>
      <BoardItemSection>
        {boardItems.map((_, idx) => (
          <BoardItem key={idx} />
        ))}
      </BoardItemSection>
    </Container>
  );
};
export default BoardSection;
