import styled from '@emotion/styled';

import { theme } from '@styles/theme';

const Container = styled.div`
  display: 'flex';
  width: 100%;
  overflow: auto;
  flex-direction: 'column';
  padding: 1rem;
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;

const ViewArea = styled.div`
  width: 100%;
  border: none;
  outline: none;
`;
const Wrapper = styled.div`
  display: flex;
`;
export { ViewArea, Wrapper, Container };
