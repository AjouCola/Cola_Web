import { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import { Viewer } from '@toast-ui/react-editor';
import { useRouter } from 'next/router';
import { useRecoilValueLoadable } from 'recoil';

import CommonEditor from './commonEditor';
import QnaEditor from './qnaEditor';

import CommentIcon from '@assets/icon/comment_primary.svg';
import Heart from '@assets/icon/heart_primary.svg';
import UserDefault from '@components/atoms/icon/userDefault';
import { useUserSelector } from '@store/selector/user';
import { FlexDiv } from '@styles/index';
import { CommentApi } from '@utils/api/Comment';

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 10px;
  background: ${({ theme: { colors } }) => colors.blue[10]};
  box-shadow: 0px 0px 6px ${({ theme: { colors } }) => colors.shadow};
  margin-bottom: 1rem;
  padding: 1rem 2rem;
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    padding: 1rem 1rem;
  }
`;
const CustomViewer = styled(Viewer)`
  min-height: 200px;
  background: white;
  border-radius: 14px;
`;

const UserWrapper = styled(FlexDiv)`
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
  position: relative;
`;

const Dropdown = styled.ul<{ isShown: boolean }>`
  display: ${({ isShown }) => (isShown ? 'block' : 'none')};
  width: 7rem;
  background: white;
  box-shadow: 0 0 6px #00000029;
  border-radius: 14px;
  position: absolute;
  top: 2rem;
  right: 0;
  z-index: 100;
`;

const MenuBtnWrapper = styled.div`
  width: 10rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: inset 0 0 6px #00000029;
  background: white;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem;
  border-radius: 14px;
  svg:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    width: 7.5rem;
  }
`;
const MenuBtn = styled.button`
  position: relative;
  color: ${({ theme: { colors } }) => colors.blue[500]};
  font-weight: 600;
  border: none;
  background: none;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
const DropdownItem = styled.li`
  transition: background 150ms ease;
  padding: 0.4rem;
  text-align: center;
  background: white;

  &:hover {
    background: ${({ theme: { colors } }) => colors.blue[100]};
  }
  &:nth-of-type(1) {
    border-top-right-radius: 14px;
    border-top-left-radius: 14px;
  }
  &:nth-last-of-type(1) {
    border-bottom-right-radius: 14px;
    border-bottom-left-radius: 14px;
  }
`;

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  padding: 0.5rem;
  border-radius: 1rem;
`;

const EditModeBtn = styled.button<{ bgColor?: string; textColor?: string }>`
  border: none;
  background: ${({ theme: { colors }, bgColor }) => bgColor ?? colors.blue[500]};
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: ${({ textColor }) => textColor ?? 'white'};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 200ms ease;
  &:hover {
    opacity: 0.8;
  }
`;
const CommentViewer = ({
  commentId,
  postType,
  userId,
  name,
  content,
}: {
  postType: 'qna' | 'info' | 'common';
  commentId: number;
  userId: number;
  name: string;
  content: string;
}) => {
  const router = useRouter();
  const viewerRef = useRef<Viewer>(null);

  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.getInstance().setMarkdown(content);
    }
  }, [content, name]);

  const { contents: userInfo } = useRecoilValueLoadable(useUserSelector({}));
  const [isMine, setIsMine] = useState(false);

  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    if (userId === userInfo.id) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
  }, [userId]);

  const onClickDelete = async () => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      await CommentApi.delete(commentId);
      router.reload();
    }
  };

  const [editMode, setEditMode] = useState(false);
  const [editComment, setEditComment] = useState('');

  useEffect(() => {
    if (editMode) {
      setEditComment(content);
    }
  }, [editMode]);

  const onClickEdit = () => {
    setEditMode(true);
    setDropdown(false);
  };
  const onClickCancelEdit = () => {
    setEditMode(false);
    setDropdown(false);
  };
  const onSubmitEdit = async () => {
    await CommentApi.edit(commentId, editComment);
    setEditMode(false);
    router.reload();
  };
  return (
    <Comment>
      <UserWrapper direction="row">
        <UserDefault></UserDefault>
        <p>{name || '유저'}</p>
        <MenuBtnWrapper>
          <Heart />
          <CommentIcon />
          {isMine && (
            <MenuBtn
              onClick={() => {
                if (!editMode) setDropdown((prev) => !prev);
              }}
            >
              <span>•••</span>
              <Dropdown isShown={dropdown}>
                <DropdownItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickDelete();
                  }}
                >
                  삭제
                </DropdownItem>
                <DropdownItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickEdit();
                  }}
                >
                  수정
                </DropdownItem>
              </Dropdown>
            </MenuBtn>
          )}
        </MenuBtnWrapper>
      </UserWrapper>
      <EditorWrapper>
        {!editMode && <CustomViewer ref={viewerRef} initialValue={content} />}
        {editMode && (
          <>
            {postType === 'qna' && (
              <QnaEditor comment={editComment} setComment={setEditComment} initialValue={editComment} />
            )}
            {postType !== 'qna' && (
              <CommonEditor comment={editComment} setComment={setEditComment} initialValue={editComment} />
            )}
            <FlexDiv direction="row" style={{ gap: '1rem' }}>
              <EditModeBtn bgColor="rgb(123,123,123)" onClick={onClickCancelEdit}>
                취소
              </EditModeBtn>
              <EditModeBtn onClick={onSubmitEdit}>수정</EditModeBtn>
            </FlexDiv>
          </>
        )}
      </EditorWrapper>
    </Comment>
  );
};
export default CommentViewer;
