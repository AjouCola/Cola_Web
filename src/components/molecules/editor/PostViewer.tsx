import { useRef } from 'react';

import styled from '@emotion/styled';
import { Viewer } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor-viewer.css';

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

const PostViewer = ({ content }: { content: string }) => {
  const viewerRef = useRef<Viewer>(null);

  return (
    <EditorWrapper>
      <Viewer ref={viewerRef} initialValue={content ?? ''} />
    </EditorWrapper>
  );
};
export default PostViewer;
