import { Dispatch, SetStateAction } from 'react';

import dynamic from 'next/dynamic';

import { Container, VerticalLine } from './styles';

import { MODE } from '@constants/index';

const PostEditor = dynamic(() => import('@components/molecules/editor'), { ssr: false });
const PostViewer = dynamic(() => import('@components/molecules/previewer'), { ssr: false });

interface Props {
  editMode: typeof MODE[number];
  chipList: string[];
  title: string;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const MarkdownEditor = ({ editMode, chipList, title, content, setContent }: Props) => {
  return (
    <Container>
      {editMode !== 'view' && <PostEditor markdownContent={content} setMarkdownContent={setContent} />}
      {editMode === 'all' && <VerticalLine />}
      {editMode !== 'edit' && <PostViewer markdownContent={content} title={title} chipList={chipList} />}
    </Container>
  );
};
export default MarkdownEditor;
