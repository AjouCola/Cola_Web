import { useEffect, useRef } from 'react';

import styled from '@emotion/styled';
import { Viewer } from '@toast-ui/react-editor';

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
`;
const CommentViewer = ({ name, content }: { name: string; content: string }) => {
  const viewerRef = useRef<Viewer>(null);

  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.getInstance().setMarkdown(content);
    }
  }, [content, name]);
  return (
    <Comment>
      <FlexDiv direction="row">
        <UserDefault></UserDefault>
        <p>{name || '유저'}</p>
      </FlexDiv>
      <CustomViewer ref={viewerRef} initialValue={content} />
    </Comment>
  );
};
export default CommentViewer;
