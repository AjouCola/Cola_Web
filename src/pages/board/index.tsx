import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { useRecoilState } from 'recoil';

import { BoardLayout, boardTypeState } from '../../store/board';

import BoardCard from '@molecules/boardType/boardCard';
import BoardPreviewItem from '@molecules/boardType/boardPreviewItem';
import BoardSimpleItem from '@molecules/boardType/boardSimpleItem';
import { Container, BoardList } from '@styles/board';
import { Board as BoardApi } from '@utils/api/Board';

interface IPost {
  postId: number;
  title: string;
  userInfo: {
    userId: number;
    userName: string;
  };
  createdDate: string;
  modifiedDate: string;
}
interface IQueryPage {
  result: IPost[];
  nextPage: number | null;
  isLast: boolean;
}
const Board = ({ ...pageProps }) => {
  const router = useRouter();
  const [boardType, setBoardType] = useRecoilState(boardTypeState);

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery<IQueryPage>(
    '[boardlist]',
    ({ pageParam }) => BoardApi.getList({ pageParam }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.isLast) return lastPage.nextPage;
        return undefined;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
    },
  );
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    console.log(isLoading, ' data: ', data);
    const fetchPages = data?.pages;
    console.log('post', fetchPages?.map((pages) => pages.result).flat());
    // setPosts(...fetchPages?.map((pages) => pages.result).flat());
  }, [isLoading, data]);
  // useEffect(() => {
  //   const data = (async function () {
  //     return await BoardApi.getList({ pageParam: 1 });
  //   })();
  //   console.log(data);
  // }, []);
  if (isLoading) return <div>로딩중...</div>;

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
        <button onClick={() => fetchNextPage()}>게시글 불러오기</button>
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
