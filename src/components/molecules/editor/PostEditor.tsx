import { useEffect, Dispatch, SetStateAction, useRef } from 'react';

import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor.css';
import { WRITE_EXAMPLE, MODE } from '@constants/index';
import Api from '@utils/api/core';

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
        console.log(blob);
        const formData = new FormData();
        const array = [];
        array.push(blob);
        array.map((file) => formData.append('multipartFile[]', file));
        for (const a of formData) {
          console.log(a);
        }
        async function getImageUrl() {
          const [image] = (await Api.post('/api/v1/s3/file', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })) as any;
          callback(image, 'imageURL');
        }
        getImageUrl();
      });
    }
  }, []);

  return (
    <Editor
      ref={editorRef}
      initialValue={initialValue ?? ''}
      previewStyle="vertical"
      initialEditType="markdown"
      placeholder={placeholder}
      height="100%"
      onChange={onChange}
    />
  );
};
export default ToastEditor;
