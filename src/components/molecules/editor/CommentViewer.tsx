import { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import { Viewer } from '@toast-ui/react-editor';

import CommentIcon from '@assets/icon/comment_primary.svg';
import Heart from '@assets/icon/heart_primary.svg';
import UserDefault from '@components/atoms/icon/userDefault';
import { FlexDiv } from '@styles/index';

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: ${({ theme: { colors } }) => colors.blue[10]};
  box-shadow: 0px 0px 6px ${({ theme: { colors } }) => colors.shadow};
`;
const CustomViewer = styled(Viewer)`
  min-height: 200px;
  padding: 1rem 2rem;
  margin-bottom: 1rem;
`;

const UserWrapper = styled(FlexDiv)`
  align-items: center;
  gap: 1rem;
  padding: 1rem;
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
`;

const MenuBtnWrapper = styled.div`
  width: 10rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: inset 0 0 6px #00000029;
  background: white;
  position: absolute;
  right: 1rem;
  top: 1rem;
  svg:hover {
    opacity: 0.8;
  }
`;
const MenuBtn = styled.button`
  position: relative;
  color: ${({ theme: { colors } }) => colors.blue[500]};
  font-weight: 600;
  border: none;
  background: none;
  &:hover {
    opacity: 0.8;
  }
`;
const DropdownItem = styled.li`
  transition: background 150ms ease;
  padding: 0.4rem;
  text-align: center;
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
const CommentViewer = ({ name, content }: { name: string; content: string }) => {
  const viewerRef = useRef<Viewer>(null);

  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.getInstance().setMarkdown(content);
    }
  }, [content, name]);

  const [dropdown, setDropdown] = useState(false);
  return (
    <Comment>
      <UserWrapper direction="row">
        <UserDefault></UserDefault>
        <p>{name || '유저'}</p>
        <MenuBtnWrapper>
          <Heart />
          <CommentIcon />
          <MenuBtn onClick={() => setDropdown((prev) => !prev)}>
            <span>•••</span>
            <Dropdown isShown={dropdown}>
              <DropdownItem>삭제</DropdownItem>
              <DropdownItem>수정</DropdownItem>
            </Dropdown>
          </MenuBtn>
        </MenuBtnWrapper>
      </UserWrapper>
      <CustomViewer ref={viewerRef} initialValue={content} />
    </Comment>
  );
};
export default CommentViewer;
