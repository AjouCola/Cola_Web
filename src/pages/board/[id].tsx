import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';

import UserDefault from '@atoms/icon/userDefault';
import BoardContent from '@organisms/boardContent';
import Comment from '@organisms/comment';
import { theme } from '@styles/theme';
import { Board as BoardApi } from '@utils/api/Board';
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

const TEST_POST_ID = 5;

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

interface IPost {
  postId: number;
  title: string;
  content: string;
  userInfo: {
    userId: number;
    userName: string;
  };
  comments: [
    {
      commentId: number;
      userInfo: {
        userId: number;
        userName: string;
      };
      content: string;
    },
  ];
  createdDate: string;
  modifiedDate: string;
}
const BoardDetail = ({ postData }: { postData: IPost }) => {
  const router = useRouter();

  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    setComments(postData.comments);
  }, []);
  return (
    <div style={{ maxWidth: '1200px' }}>
      <BoardContent
        title={postData.title}
        content={postData.content}
        userName={postData.userInfo.userName || '유저이름'}
        createdDate={postData.createdDate}
        modifiedDate={postData.modifiedDate}
      />
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
BoardDetail.getInitialProps = async (ctx: NextPageContext) => {
  const res = await BoardApi.get(5);
  console.log('postData', res);
  return {
    postData: res,
  };
};
