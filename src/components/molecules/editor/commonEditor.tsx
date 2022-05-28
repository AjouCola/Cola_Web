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
  initialValue?: string;
  placeholder?: string;
}

function CommonEditor({ comment, setComment, initialValue, placeholder }: IEditor) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (comment !== undefined && comment === '' && inputRef.current !== null) {
      inputRef.current.value = '';
    }
  }, [comment]);

  useEffect(() => {
    if (initialValue && inputRef.current !== null) {
      inputRef.current.value = initialValue;
    }
  }, [initialValue]);

  const onChangeValue = () => {
    if (inputRef.current) {
      setComment(inputRef.current.value);
    }
  };
  return (
    <>
      <input ref={inputRef} onChange={onChangeValue} />
    </>
  );
}
export default CommonEditor;
