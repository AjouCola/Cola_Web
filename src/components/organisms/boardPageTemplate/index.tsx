import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { useRecoilState } from 'recoil';

import { BoardLayout, boardTypeState } from '../../../store/board';
import { Spinner } from '../signUpInput/styles';

import SimpleType from '@assets/icon/board_detail_type.svg';
import GridType from '@assets/icon/board_grid_type.svg';
import ListType from '@assets/icon/board_list_type.svg';
import BoardCard from '@molecules/boardType/boardCard';
import BoardPreviewItem from '@molecules/boardType/boardPreviewItem';
import BoardSimpleItem from '@molecules/boardType/boardSimpleItem';
import {
  Container,
  BoardList,
  TitleWrapper,
  BoardListTitle,
  BoardListUtilWrapper,
  WritePost,
  FlexEnd,
  TypeIcon,
} from '@styles/board';
import { Board as BoardApi } from '@utils/api/Board';

export interface IPost {
  postId: number;
  title: string;
  content: string;
  userInfo: {
    userId: number;
    userName: string;
  };
  createdDate: string;
  modifiedDate: string;
  preview: string;
  thumbnailPath: string;
  favorInfoResponseDto: {
    postId: number;
    count: number;
    favor: boolean;
  };
}
interface IQueryPage {
  result: IPost[];
  nextPage: number | null;
  isLast: boolean;
}

const Board = ({ boardCategory }: { boardCategory: 'common' | 'info' | 'qna' | 'search' }) => {
  const { ref, inView } = useInView();
  const router = useRouter();
  const [sortBy, setSortBy] = useState<'recent' | 'favorCount'>('recent');
  const [boardType, setBoardType] = useRecoilState(boardTypeState);

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery<IQueryPage>(
    ['boardlist', boardCategory, sortBy],
    ({ pageParam = 0 }) =>
      boardCategory === 'search'
        ? BoardApi.getSearch({ pageParam, sort: sortBy, keyword: router.query?.keyword!.toString() })
        : BoardApi.getList({ pageParam, boardCategory, sort: sortBy }),
    {
      getNextPageParam: (lastPage) => {
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
    const fetchPages = data?.pages;
    if (fetchPages) {
      console.log('post', fetchPages?.map((pages) => pages.result).flat());
      setPosts(fetchPages?.map((pages) => pages.result).flat() as IPost[]);
    }
  }, [isLoading, data]);
  useEffect(() => {
    if (!isLoading && hasNextPage && inView) {
      fetchNextPage();
    }
  }, [inView]);

  const handleSortChange = (e: any) => {
    setSortBy(e.target.value);
  };
  return (
    <Container>
      <TitleWrapper>
        <BoardListTitle>
          {boardCategory === 'search'
            ? router.query.keyword + ' 검색 결과'
            : boardCategory === 'common'
            ? '자유게시판'
            : boardCategory === 'info'
            ? '정보게시판'
            : '질문게시판'}
        </BoardListTitle>
        <BoardListUtilWrapper>
          <FlexEnd>
            {boardCategory !== 'search' && (
              <Link href={`/board/${boardCategory}/write`}>
                <WritePost>글쓰기</WritePost>
              </Link>
            )}
          </FlexEnd>
          <FlexEnd>
            <FlexEnd>
              <select name="" id="" onChange={handleSortChange} value={sortBy}>
                <option value="recent">최신순</option>
                <option value="favorCount">인기순</option>
              </select>
            </FlexEnd>
            <FlexEnd>
              <TypeIcon clicked={boardType === BoardLayout.TILE} onClick={() => setBoardType(BoardLayout.TILE)}>
                <GridType />
              </TypeIcon>
              <TypeIcon
                clicked={boardType === BoardLayout.PREVIEW_LIST}
                onClick={() => setBoardType(BoardLayout.PREVIEW_LIST)}
              >
                <ListType />
              </TypeIcon>
              <TypeIcon
                clicked={boardType === BoardLayout.SIMPLE_LIST}
                onClick={() => setBoardType(BoardLayout.SIMPLE_LIST)}
              >
                <SimpleType />
              </TypeIcon>
            </FlexEnd>
          </FlexEnd>
        </BoardListUtilWrapper>
      </TitleWrapper>
      <section>
        {isLoading && (
          <BoardList type={boardType}>
            <Spinner size="3rem" color="#b2c9ff" />
          </BoardList>
        )}
        {!isLoading && (
          <BoardList type={boardType}>
            {posts.length === 0 ? (
              <div>
                <p>게시글이 없습니다.</p>
              </div>
            ) : null}
            {boardType === BoardLayout.TILE &&
              posts.map((post) => (
                <BoardCard
                  key={post.postId}
                  id={post.postId}
                  title={post.title}
                  preview={post.preview}
                  thumbnailPath={post.thumbnailPath}
                  username={post.userInfo.userName}
                  createdAt={post.createdDate}
                  isLike={post.favorInfoResponseDto.favor}
                  favorCount={post.favorInfoResponseDto.count}
                />
              ))}
            {boardType === BoardLayout.PREVIEW_LIST &&
              posts.map((post) => (
                <BoardPreviewItem
                  key={post.postId}
                  title={post.title}
                  id={post.postId}
                  preview={post.preview}
                  thumbnailPath={post.thumbnailPath}
                  username={post.userInfo.userName}
                  createdAt={post.createdDate}
                  isLike={post.favorInfoResponseDto.favor}
                  favorCount={post.favorInfoResponseDto.count}
                />
              ))}
            {boardType === BoardLayout.SIMPLE_LIST &&
              posts.map((post) => (
                <BoardSimpleItem
                  key={post.postId}
                  id={post.postId}
                  title={post.title}
                  username={post.userInfo.userName}
                  createdAt={post.createdDate}
                  isLike={post.favorInfoResponseDto.favor}
                  favorCount={post.favorInfoResponseDto.count}
                />
              ))}
          </BoardList>
        )}
      </section>
      <div ref={ref} style={{ width: '100%', height: '5rem' }}></div>
    </Container>
  );
};
export default Board;
