import Button from './index';

import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const SubmitBtn = styled(Button)<{ size: 'small' | 'medium' }>`
  border-radius: 43px;
  box-shadow: 0px 0px 5px #00000029;
  min-width: ${({ size }) => (size === 'medium' ? '16vw' : '6vw')};
  padding: ${({ size }) => (size === 'medium' ? '16px 4px' : '4px')};
  margin-top: 4vh;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  align-self: center;
  background-color: ${theme.colors.VeryLightBlue};
`;

export default SubmitBtn;
