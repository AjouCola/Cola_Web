import { useState } from 'react';

import styled from '@emotion/styled';

import { ContentWrapper } from './styles';

import { theme } from '@styles/theme';

const Container = styled(ContentWrapper)`
  border-radisu: 14px;
  padding: 1.6rem;
  min-width: 28rem;
  min-height: 42rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-radius: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100vw;
    height: 100vh;
  }
`;
const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 500;
  color: ${theme.colors.blue[500]};
  border-bottom: 0.3rem solid ${theme.colors.blue[500]};
`;
const SubContent = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  textarea {
    resize: none;
    width: 100%;
    height: 100%;
  }
`;
const Thumbnail = styled.div`
  flex: 1;
  height: 18rem;
  width: 100%;
  background: ${({ theme: { colors } }) => colors.blue[10]};
  display: flex;
  align-items: end;
  justify-content: center;
  button {
    margin-bottom: 10px;
  }
`;
const BtnWrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;
const Button = styled.button`
  padding: 0.5rem 1rem;
  transition: all 150ms linear;
  border: none;
  border-radius: 14px;
  color: white;
  background: ${({ theme: { colors } }) => colors.blue[500]};
  cursor: pointer;

  &:hover {
    background: ${({ theme: { colors } }) => colors.blue[400]};
  }
`;
const PostCreateModal = ({ title, content }: { title: string; content: string }) => {
  const [textareaValue, setTextareaValue] = useState(content);

  return (
    <Container>
      <SubContent>
        <Title>포스트 미리보기</Title>
        <Thumbnail>
          <Button>썸네일 업로드</Button>
        </Thumbnail>
      </SubContent>
      <SubContent>
        <Title>{title}</Title>

        <textarea cols={30} rows={6} maxLength={150} onChange={(e) => setTextareaValue(e.target.value)}>
          {textareaValue.replaceAll('#', '')}
        </textarea>
        <p>{textareaValue.length} / 150</p>
      </SubContent>
      <BtnWrapper>
        <Button style={{ background: 'rgb(102 102 102)' }}>취소</Button>
        <Button>작성하기</Button>
      </BtnWrapper>
    </Container>
  );
};

export default PostCreateModal;
