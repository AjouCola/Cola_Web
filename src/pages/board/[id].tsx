import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

import UserDefault from '@atoms/icon/userDefault';
import BoardContent from '@organisms/boardContent';
import Comment from '@organisms/comment';
import { useUserSelector } from '@store/selector/user';
import { theme } from '@styles/theme';
import { Board as BoardApi } from '@utils/api/Board';
import { CommentApi } from '@utils/api/Comment';

const CommentEditor = dynamic(() => import('../../components/molecules/editor/qnaEditor'), { ssr: false });
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

interface IPostUserInfo {
  userId?: number;
  userName: string;
  profilePath: string | null;
  department: string;
}

export interface IComment {
  commentId: number;
  content: string;
  userInfo: IPostUserInfo;
}

interface IPost {
  postType: 'qna' | 'info' | 'common';
  postId: number;
  title: string;
  content: string;
  userInfo: IPostUserInfo;
  comments: IComment[];
  tags: string[];
  createdDate: string;
  modifiedDate: string;
  favorInfoResponseDto: {
    isLike: boolean;
    likes: number;
    postId: number;
  };
}
interface ICommentFormProps {
  postType: 'qna' | 'info' | 'common';
  onAddComment: (newComment: IComment) => void;
  getPostData: () => void;
}
const CommentForm = ({ postType, onAddComment, getPostData }: ICommentFormProps) => {
  const router = useRouter();
  const { id } = router.query;
  const { contents: userInfo } = useRecoilValueLoadable(useUserSelector({}));
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
      {postType === 'qna' ? (
        <CommentEditor setComment={setComment} comment={comment} />
      ) : (
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
      )}
      <BtnWrapper>
        <CommentSubmitBtn onClick={onSubmit}>작성</CommentSubmitBtn>
      </BtnWrapper>
    </Container>
  );
};

const BoardDetail = ({ postData }: { postData: IPost }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  // const [postData, setPostData] = useState<IPost>({} as IPost);
  const router = useRouter();

  const setPostData = (data: IPost) => (postData = data);
  const getPostData = async () => {
    if (router.query?.id && !isNaN(+router.query?.id)) {
      const data = (await BoardApi.get(+router.query.id)) as unknown as IPost;
      setPostData(data);

      setComments(data.comments);
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   getPostData();

  //   // setIsLoading(false);
  // }, []);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div style={{ maxWidth: '1200px', width: '100%', padding: '4rem 2rem' }}>
      <BoardContent
        postId={postData.postId}
        postType={postData.postType}
        title={postData.title}
        content={postData.content}
        userId={postData.userInfo.userId!}
        userName={postData.userInfo.userName || '유저이름'}
        tags={postData.tags}
        createdDate={postData.createdDate}
        modifiedDate={postData.modifiedDate}
        likes={postData.favorInfoResponseDto.likes}
        isLike={postData.favorInfoResponseDto.isLike}
      />
      <CommentForm
        postType={postData.postType}
        onAddComment={(newComment) => setComments((prev) => [...prev, newComment])}
        getPostData={getPostData}
      />
      {/* 추후 lazy loading 지원 예정  */}
      <CommentWrapper>
        {comments.map(({ userInfo: { userName, userId }, content, commentId }, idx) => (
          <CommentViewer
            key={commentId}
            postType={postData.postType}
            commentId={commentId}
            userId={userId!}
            name={userName}
            content={content}
          />
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
    res = (await BoardApi.get(+ctx.query?.id)) as unknown as IPost;
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
