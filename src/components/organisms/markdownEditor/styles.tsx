import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const Container = styled.div`
  box-shadow: inset 0px 0px 6px ${({ theme }) => theme.colors.shadow};
  grid-area: contents;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 2vw;
`;
const VerticalLine = styled.div`
  height: 100%;
  width: 1px;
  border: 0.5px solid;
  opacity: 50%;
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;

export { Container, VerticalLine };
