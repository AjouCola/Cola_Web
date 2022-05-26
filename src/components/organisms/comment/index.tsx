import styled from '@emotion/styled';
import { marked } from 'marked';

import UserDefault from '@components/atoms/icon/userDefault';
import { FlexDiv } from '@styles/index';
import { theme } from '@styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  min-height: 20vh;
  width: 100%;
  border-radius: 10px;
  background: ${theme.colors.blue[10]};
  box-shadow: 0px 0px 6px ${theme.colors.shadow};
  margin-bottom: 2rem;
`;

const ContentArea = styled.div`
  min-height: 8vh;
  background: ${theme.colors.white};
  border-radius: 10px;
  box-shadow: inset 0px 0px 6px ${theme.colors.shadow};
  padding: 0.4rem;
`;

interface Props {
  name: string;
  contents: string;
}

const Comment = ({ name, contents }: Props) => {
  return (
    <Container>
      <FlexDiv direction="row" style={{ columnGap: '1rem' }}>
        <UserDefault />
        <p>{name || '댓글 작성자 이름'}</p>
      </FlexDiv>
      <ContentArea dangerouslySetInnerHTML={{ __html: marked(contents) }}></ContentArea>
    </Container>
  );
};
export default Comment;
