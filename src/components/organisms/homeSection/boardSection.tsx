import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { IPost } from '../boardPageTemplate';

import BoardItem from '@components/molecules/homeBoardItem';
import { theme } from '@styles/theme';
import { Board } from '@utils/api/Board';

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

const InterestBtn = styled.div`
  width: 36px;
  height: 20px;
  border-radius: 11px;
  background: white;
  cursor: pointer;
  transition: all 300ms linear;
  position: relative;
`;
const IsOn = styled.span<{ isOn: boolean }>`
  transition: all 200ms linear;
  position: absolute;
  top: calc(50% - 8px);
  left: ${({ isOn }) => (isOn ? '4px' : '16px')};
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ theme: { colors } }) => colors.blue[500]};
`;

const BoardSection = ({ type }: { type: string }) => {
  const [boardItems, setBoardItems] = useState<IPost[]>();
  const [on, setOn] = useState(false);

  useEffect(() => {
    (async function () {
      const data = (await Board.getList({
        pageParam: 0,
        sort: type === '최신글' ? 'recent' : 'favorCount',
      })) as unknown as IPost[];
      setBoardItems(data);
    })();
  }, []);
  useEffect(() => {
    if (boardItems) console.log('홈 게시글 리스트', boardItems);
  }, [boardItems]);

  const onClickInterest = () => {
    setOn((prev) => !prev);
  };

  return (
    <Container>
      <BoardTitle>인기글</BoardTitle>
      <InterestBtnWrapper>
        <span>관심</span>
        <InterestBtn onClick={onClickInterest}>
          <IsOn isOn={on} />
        </InterestBtn>
      </InterestBtnWrapper>
      <BoardItemSection>
        {boardItems?.map((post: IPost, idx: number) => (
          <BoardItem
            key={idx}
            title={post.title}
            userName={post.userInfo.userName}
            date={post.createdDate.slice(0, 10)}
          />
        ))}
      </BoardItemSection>
    </Container>
  );
};
export default BoardSection;
