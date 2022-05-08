import styled from '@emotion/styled';

import { theme } from '@styles/theme';

const Container = styled.div`
  position: absolute;
  display: flex;
  border-radius: 10px;
  padding: 4rem;
  width: 650px;
  box-sizing: border-box;
  border: 1px solid ${theme.colors.blue[500]};
  box-shadow: 10px 10px 6px ${theme.colors.blue[300]};
  background: ${theme.colors.white};
`;

const CardWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  justify-content: space-evenly;
`;

const TextWrapper = styled.div`
  h2 {
    color: ${theme.colors.blue[500]};
  }
  p {
    color: ${theme.colors.gray[600]};
  }
  label {
    background: ${theme.colors.blue[500]};
    color: ${theme.colors.gray[600]};
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: flex-end;
  right: 0px;
  top: 0px;
  justify-content: space-between;
`;

export { Container, CardWrapper, TextWrapper, IconWrapper };
