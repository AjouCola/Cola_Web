import { ChangeEvent } from 'react';

import { TextArea } from './styles';
interface Props {
  markdownContent: string;
  setMarkdownContent: (value: string) => void;
}

const Editor = ({ markdownContent, setMarkdownContent }: Props) => {
  const handleUploadImage = (e: any) => {};

  return (
    <TextArea
      onDragEnd={handleUploadImage}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMarkdownContent(e.target.value)}
      rows={9}
      value={markdownContent}
    />
  );
};

export default Editor;
