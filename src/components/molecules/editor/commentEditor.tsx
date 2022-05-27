import { useEffect, useRef } from 'react';

import styled from '@emotion/styled';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { Editor } from '@toast-ui/react-editor';
import Prism from 'prismjs';

import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

interface IEditor {
  htmlStr?: string;
  comment?: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
}

const CustomEditor = styled(Editor)`
  height: 200px;
`;
function CommentEditor({ comment, setComment, ...options }: IEditor) {
  const editorRef = useRef<Editor>(null);
  useEffect(() => {
    if (comment !== undefined && comment === '') {
      editorRef.current?.getInstance().setMarkdown('');
    }
  }, [comment]);
  const onChangeEditor = () => {
    if (editorRef.current) {
      const isMarkdownMode = editorRef.current.getInstance().isMarkdownMode();
      if (isMarkdownMode) {
        setComment(editorRef.current.getInstance().getMarkdown());
      } else {
        setComment(editorRef.current.getInstance().getHTML());
      }
    }
  };
  return (
    <>
      <CustomEditor
        ref={editorRef}
        initialValue=""
        previewStyle="tab"
        initialEditType="markdown"
        useCommandShortcut={true}
        placeholder="질문에 답변을 달아주세요!"
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        onChange={onChangeEditor}
        {...options}
      />
    </>
  );
}
export default CommentEditor;
