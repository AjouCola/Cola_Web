import { marked } from 'marked';

import { ViewArea, Container } from './styles';
interface Props {
  markdownContent: string;
  title?: string;
  chipList: string[];
}

const Preview = ({ markdownContent, title, chipList }: Props) => {
  return (
    <Container>
      <p>{title}</p>
      <ViewArea dangerouslySetInnerHTML={{ __html: marked(markdownContent) }} />
    </Container>
  );
};

export default Preview;
