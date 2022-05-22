import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const Container = styled.div`
  display: flex;
  font-family: DM Sans, sans-serif;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

const LeftbarContainer = styled.div`
  position: absolute;
  z-index: 999;
  display: flex;
  background: ${theme.colors.white};
  flex-direction: column;
  transition: all 100ms;
  left: -19.2vw;
  width: 20vw;
  height: 100%;
  padding: 1rem;

  box-shadow: 0px 0px 6px ${theme.colors.shadow};
  :hover {
    left: 0vw;
  }
  h3 {
    color: ${theme.colors.blue[500]};
  }
`;

export { Container, LeftbarContainer };
