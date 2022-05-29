import { useEffect, useRef } from 'react';

import styled from '@emotion/styled';
import { Viewer } from '@toast-ui/react-editor';
import { useRouter } from 'next/router';

import { FlexDiv } from '@styles/index';

const CustomViewer = styled(Viewer)`
  min-height: 200px;
  background: white;
  border-radius: 14px;
`;

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  padding: 0.5rem;
  border-radius: 1rem;
  width: 100%;
  height: 100%;
`;

const CommentViewer = ({ content }: { content: string }) => {
  const viewerRef = useRef<Viewer>(null);

  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.getInstance().setMarkdown(content);
    }
  }, [content, name]);

  return (
    <EditorWrapper>
      <CustomViewer ref={viewerRef} initialValue={content} />
    </EditorWrapper>
  );
};
export default CommentViewer;
