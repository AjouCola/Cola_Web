import { useEffect, Dispatch, SetStateAction, useRef } from 'react';

import styled from '@emotion/styled';
import codeSyntaxHighlightPlugin from '@toast-ui/editor-plugin-code-syntax-highlight';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor.css';
import { WRITE_EXAMPLE, MODE } from '@constants/index';
import Api from '@utils/api/core';

const CustomEditor = styled(Editor)`
  width: 100%;
`;
interface IPostEditor {
  initialValue?: string;
  placeholder?: string;
  previewStyle: 'vertical' | 'tab';
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}
const ToastEditor = ({ initialValue, placeholder, setContent, previewStyle }: IPostEditor) => {
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().changePreviewStyle(previewStyle);
    }
  }, [previewStyle]);
  const onChange = () => {
    if (editorRef.current) {
      const isMarkdownMode = editorRef.current.getInstance().isMarkdownMode();
      if (isMarkdownMode) {
        setContent(editorRef.current.getInstance().getMarkdown());
      } else {
        setContent(editorRef.current.getInstance().getHTML());
      }
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().removeHook('addImageBlobHook');
      editorRef.current.getInstance().addHook('addImageBlobHook', (blob, callback) => {
        const formData = new FormData();
        formData.append('imageFile', blob);
        async function getImageUrl() {
          const image = (await Api.post('/api/v1/s3/file', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })) as any;
          callback(image, 'imageURL');
        }
        getImageUrl();
      });
    }
  }, []);

  return (
    <CustomEditor
      ref={editorRef}
      initialValue={initialValue ?? ''}
      previewStyle="vertical"
      initialEditType="markdown"
      placeholder={placeholder}
      height="100%"
      onChange={onChange}
      plugins={[colorSyntax, codeSyntaxHighlightPlugin]}
    />
  );
};
export default ToastEditor;
