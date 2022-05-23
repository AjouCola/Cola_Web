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

interface IUserInfo {
  userId?: number;
  userName: string;
}

export interface IComment {
  commentId: number;
  content: string;
  userInfo: IUserInfo;
}

interface IPost {
  postId: number;
  title: string;
  content: string;
  userInfo: IUserInfo;
  comments: IComment[];
  createdDate: string;
  modifiedDate: string;
}
interface ICommentFormProps {
  onAddComment: (newComment: IComment) => void;
}
const CommentForm = ({ onAddComment }: ICommentFormProps) => {
  const router = useRouter();
  const { id } = router.query;
  const [comment, setComment] = useState('');

  const onSubmit = async () => {
    console.log(comment);

    const commentId = await CommentApi.create(+id!, comment).catch((err) => console.log(err));
    if (commentId) {
      onAddComment({
        commentId: +commentId as number,
        content: comment,
        userInfo: {
          userName: '은승균',
        },
      });
      setComment('');
    }
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

const BoardDetail = ({ postData }: { postData: IPost }) => {
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
      <CommentForm onAddComment={(newComment) => setComments((prev) => [...prev, newComment])} />
      {/* 추후 lazy loading 지원 예정  */}
      <CommentWrapper>
        {comments.map(({ userInfo: { userName }, content }, idx) => (
          <Comment key={idx} name={userName} contents={content} />
        ))}
        {comments.length === 0 && <p>댓글이 없습니다.</p>}
      </CommentWrapper>
    </div>
  );
};
export default BoardDetail;

BoardDetail.getInitialProps = async (ctx: NextPageContext) => {
  let res;

  if (ctx.query.id) {
    res = await BoardApi.get(+ctx.query?.id);
    console.log('postData', res);
  } else {
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: '/',
        'Content-Type': 'text/html; charset=utf-8',
      });
      ctx.res.end();

      return {};
    }
  }
  return {
    postData: res,
  };
};
