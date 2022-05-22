import styled from '@emotion/styled';

import { theme } from '@styles/theme';
interface IStatus {
  status: 'prev' | 'this' | 'today';
}

const Container = styled.div<IStatus>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 3rem;
  justify-self: center;
  visibility: ${({ status }) => (status === 'prev' ? 'hidden' : 'visible')};
  @media (max-width: ${theme.breakpoints.md}) {
    width: 2rem;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 1rem;
  }
`;

const DayText = styled.p<IStatus>`
  ${({ status, theme: { colors } }) => `
    background-color:${status === 'today' ? colors.blue[500] : ''};
    color:${status === 'today' ? 'white' : colors.gray[900]};
  `}
  border-radius:4px;
  // font-size:1rem;
  font-weight: 500;
`;

export { Container, DayText };
