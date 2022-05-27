import { useEffect, Dispatch, SetStateAction, useRef } from 'react';

import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor.css';
import { WRITE_EXAMPLE, MODE } from '@constants/index';

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
