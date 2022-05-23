import styled from '@emotion/styled';

import { theme } from '@styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background: ${theme.colors.blue[500]};
  h2,
  p {
    margin: 0px;
  }
  row-gap: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.white};
  p {
    font-size: larger;
  }
`;

export { Container, Wrapper };
