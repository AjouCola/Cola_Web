import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import UserDefault from '@atoms/icon/userDefault';
import BoardContent from '@organisms/boardContent';
import Comment from '@organisms/comment';
import { theme } from '@styles/theme';
import { CommentApi } from '@utils/api/Comment';

const Container = styled.div`
  margin: 2rem 1rem;
`;

const CommentInput = styled.input`
  width: 100%;
  min-height: 3rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${theme.colors.blue[500]};
`;

const CommentWrapper = styled.div``;

const TEST_POST_ID = 0;

const CommentForm = () => {
  const [comment, setComment] = useState('');

  const onSubmit = async () => {
    console.log(comment);
    await CommentApi.create(TEST_POST_ID, comment).catch((err) => console.log(err));
  };
  return (
    <Container>
      <div style={{ display: 'flex', columnGap: '1rem' }}>
        <UserDefault />
        <p>작성자 이름</p>
      </div>
      <CommentInput
        placeholder="댓글 추가 .."
        value={comment}
        onChange={(e) => setComment(e.currentTarget.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSubmit();
          }
        }}
      />
    </Container>
  );
};

interface IUserInfo {
  userId: number;
  userName: string;
}

const DUMMY_COMMENTS = [
  { userInfo: { userName: 'guest1' }, content: 'comment1' },
  { userInfo: { userName: 'guest2' }, content: 'comment2' },
  { userInfo: { userName: 'guest3' }, content: 'comment3' },
  { userInfo: { userName: 'guest4' }, content: 'comment4' },
];

interface IComment {
  commentId: number;
  content: string;
  userInfo: IUserInfo;
}
const BoardDetail = () => {
  const router = useRouter();

  const [comments, setComments] = useState<IComment[]>(DUMMY_COMMENTS as IComment[]);

  useEffect(() => {
    const handleRouteChange = async (url: string, { shallow }: any) => {
      console.log(url.split('/')[2]);
      const res = await CommentApi.get(+url.split('/')[2]).catch((err) => console.log(err));
      console.log(res);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);
  return (
    <div style={{ maxWidth: '1200px' }}>
      <BoardContent content="제목" />
      <CommentForm />
      {/* 추후 lazy loading 지원 예정  */}
      <CommentWrapper>
        {comments.map(({ userInfo: { userName }, content }, idx) => (
          <Comment key={idx} name={userName} contents={content} />
        ))}
      </CommentWrapper>
    </div>
  );
};
export default BoardDetail;
