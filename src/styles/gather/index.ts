import styled from '@emotion/styled';

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const Container = styled(FlexColumn)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export { FlexColumn, Container };
