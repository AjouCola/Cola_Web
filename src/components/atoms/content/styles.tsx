import styled from '@emotion/styled';

import { theme } from '@styles/theme';

const Container = styled.div`
  max-height: 41px;
  border-radius: 30px;
  padding: 0.4rem 2rem;
  box-sizing: border-box;
  align-items: center;
  display: flex;
  justify-content: space-between;
  background: ${theme.colors.white};
  h2,
  p {
    color: ${theme.colors.gray[600]};
    margin: 0px;
  }
  div {
    text-align: end;
    p {
      font-size: small;
    }
  }
`;

export { Container };
