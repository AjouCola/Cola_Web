import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import UserDefault from '@atoms/icon/userDefault';
import BoardContent from '@organisms/boardContent';
import Comment from '@organisms/comment';
import { userState } from '@store/user';
import { theme } from '@styles/theme';
import { Board as BoardApi } from '@utils/api/Board';
import { CommentApi } from '@utils/api/Comment';

const CommentEditor = dynamic(() => import('../../components/molecules/editor/commentEditor'), { ssr: false });
const CommentViewer = dynamic(() => import('../../components/molecules/editor/CommentViewer'), { ssr: false });

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
const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0;
`;
const CommentSubmitBtn = styled.button`
  padding: 0.5rem 1rem;
  justify-self: flex-end;
  border-radius: 14px;
  border: none;
  background: ${({ theme: { colors } }) => colors.blue[500]};
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms linear;
  &:hover {
    background: ${({ theme: { colors } }) => colors.blue[400]};
  }
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
  getPostData: () => void;
}
const CommentForm = ({ onAddComment, getPostData }: ICommentFormProps) => {
  const router = useRouter();
  const { id } = router.query;
  const userInfo = useRecoilValue(userState);
  const [comment, setComment] = useState('');

  const onSubmit = async () => {
    console.log(comment);
    if (id && comment.trim().length > 0) {
      const {
        commentId,
        content,
        userInfo: { userId, userName },
      } = (await CommentApi.create(+id, comment).catch((err) => console.log(err))) as unknown as any;
      setComment('');
      getPostData();
    }
  };

  return (
    <Container>
      <div style={{ display: 'flex', columnGap: '1rem', paddingBottom: '1rem' }}>
        <UserDefault />
        <p style={{ fontSize: '1.2rem' }}>{userInfo?.name ?? '유저'}</p>
      </div>
      {/* <CommentInput
        placeholder="댓글 추가 .."
        value={comment}
        onChange={(e) => setComment(e.currentTarget.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSubmit();
          }
        }}
      /> */}
      <CommentEditor setComment={setComment} />
      <BtnWrapper>
        <CommentSubmitBtn onClick={onSubmit}>작성</CommentSubmitBtn>
      </BtnWrapper>
    </Container>
  );
};

const BoardDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<IComment[]>([]);
  const [postData, setPostData] = useState<IPost>({} as IPost);
  const router = useRouter();

  const getPostData = async () => {
    if (router.query?.id) {
      const data = (await BoardApi.get(+router.query.id)) as unknown as IPost;
      setPostData(data);

      setComments(data.comments);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div style={{ maxWidth: '1200px', width: '100%', padding: '4rem 2rem' }}>
      <BoardContent
        title={postData.title}
        content={postData.content}
        userName={postData.userInfo.userName || '유저이름'}
        createdDate={postData.createdDate}
        modifiedDate={postData.modifiedDate}
      />
      <CommentForm
        onAddComment={(newComment) => setComments((prev) => [...prev, newComment])}
        getPostData={getPostData}
      />
      {/* 추후 lazy loading 지원 예정  */}
      <CommentWrapper>
        {comments.map(({ userInfo: { userName, userId }, content, commentId }, idx) => (
          // <Comment key={idx} name={userName} contents={content} />
          <CommentViewer
            key={commentId}
            commentId={commentId}
            userId={userId!}
            name={userName}
            content={content}
          ></CommentViewer>
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
