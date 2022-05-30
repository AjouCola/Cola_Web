import styled from '@emotion/styled';

import Button from './index';

import { theme } from '@styles/theme';

const SubmitBtn = styled(Button)<{ size: 'small' | 'medium' }>`
  border-radius: 43px;
  width: 100%;
  max-width: 10rem;
  box-shadow: 0px 0px 5px ${({ theme }) => theme.colors.shadow};
  min-width: ${({ size }) => (size === 'medium' ? '16vw' : '6vw')};
  padding: ${({ size }) => (size === 'medium' ? '16px 4px' : '4px')};
  margin-top: 4vh;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  align-self: center;
  background-color: ${theme.colors.blue[500]};
`;

export default SubmitBtn;
