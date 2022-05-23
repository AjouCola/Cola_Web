import { Container, Wrapper } from './styles';

import Content from '@atoms/content';

const PostContent = ({ title, postData }: { title: string; postData: any[] }) => {
  return (
    <Container>
      <Wrapper>
        <h2>{title}</h2>
        <p>+</p>
      </Wrapper>
      {postData.map((content) => (
        <Content key={content} {...content} />
      ))}
    </Container>
  );
};

export default PostContent;
