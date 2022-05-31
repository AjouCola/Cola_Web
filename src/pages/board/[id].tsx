import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from 'react-query';
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
    favor: boolean;
    count: number;
    postId: number;
  };
}
interface ICommentFormProps {
  postId: number;
  postType: 'qna' | 'info' | 'common';
  onAddComment: (newComment: IComment) => void;
}
const CommentForm = ({ postId, postType, onAddComment }: ICommentFormProps) => {
  const router = useRouter();
  const { id } = router.query;
  const { contents: userInfo } = useRecoilValueLoadable(useUserSelector({}));
  const [comment, setComment] = useState('');

  const queryClient = useQueryClient();

  const onSubmit = async () => {
    console.log(comment);
    if (id && comment.trim().length > 0) {
      const newComment = (await CommentApi.create(+id, comment).catch((err) =>
        console.log(err),
      )) as unknown as IComment;
      setComment('');
      onAddComment(newComment);
      queryClient.invalidateQueries(['post', postId]);
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

const BoardDetail = ({ id }: { id: number }) => {
  const { isLoading, data: postData } = useQuery<IPost>(
    ['post', id],
    () => BoardApi.get(Number(id)) as unknown as IPost,
  );
  const [comments, setComments] = useState<IComment[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (postData) setComments(postData.comments);
  }, [postData]);

  if (isLoading) return 'Loading...';
  else if (!postData) return 'Failed to fetch post data';
  else
    return (
      <div style={{ maxWidth: '1200px', width: '100%', padding: '4rem 2rem' }}>
        <BoardContent
          postId={postData.postId}
          postType={postData.postType}
          title={postData.title}
          content={postData.content}
          commentsCount={comments.length}
          userId={postData.userInfo.userId!}
          userName={postData.userInfo.userName || '유저이름'}
          tags={postData.tags}
          createdDate={postData.createdDate}
          modifiedDate={postData.modifiedDate}
          favorCount={postData.favorInfoResponseDto.count}
          isLike={postData.favorInfoResponseDto.favor}
        />
        <CommentForm
          postId={id}
          postType={postData.postType}
          onAddComment={(newComment) => setComments((prev) => [...prev, newComment])}
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

export async function getServerSideProps(context: any) {
  const { id } = context.params;

  return {
    props: {
      id: +id,
    }, // will be passed to the page component as props
  };
}
