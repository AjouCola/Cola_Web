import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import { BoardLayout, boardTypeState } from '../../store/board';

import BoardCard from '@molecules/boardType/boardCard';
import BoardPreviewItem from '@molecules/boardType/boardPreviewItem';
import BoardSimpleItem from '@molecules/boardType/boardSimpleItem';
import { Container, BoardList } from '@styles/board';
// import { useEffect } from 'react';

// import { Board } from '@utils/api/Board';
const Board = () => {
  const router = useRouter();
  const [boardType, setBoardType] = useRecoilState(boardTypeState);

  // useEffect(() => {}, []);
  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ display: 'inline-block' }}>게시판</h2>
        <div style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span
              style={{ cursor: 'pointer', color: boardType === BoardLayout.TILE ? 'blue' : '#222' }}
              onClick={() => setBoardType(BoardLayout.TILE)}
            >
              타일
            </span>
            <span
              style={{ cursor: 'pointer', color: boardType === BoardLayout.PREVIEW_LIST ? 'blue' : '#222' }}
              onClick={() => setBoardType(BoardLayout.PREVIEW_LIST)}
            >
              상세리스트
            </span>
            <span
              style={{ cursor: 'pointer', color: boardType === BoardLayout.SIMPLE_LIST ? 'blue' : '#222' }}
              onClick={() => setBoardType(BoardLayout.SIMPLE_LIST)}
            >
              간단리스트
            </span>
          </div>
          <p>정렬</p>
        </div>
      </div>
      <section>
        <button onClick={() => router.push('/write')}>게시글 작성</button>
        <BoardList type={boardType}>
          {[...new Array(20)].map((_, i) => {
            if (boardType === BoardLayout.TILE) return <BoardCard key={i} id={i} />;
            else if (boardType === BoardLayout.PREVIEW_LIST) return <BoardPreviewItem key={i} id={i} />;
            else return <BoardSimpleItem key={i} id={i} />;
          })}
        </BoardList>
      </section>
    </Container>
  );
};
export default Board;
