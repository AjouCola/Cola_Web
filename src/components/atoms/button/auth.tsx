import styled from '@emotion/styled';

import Button from './index';

import { theme } from '@styles/theme';

const AuthBtn = styled(Button)`
  border-radius: 5px;
  box-shadow: 0px 0px 5px ${({ theme }) => theme.colors.shadow};
  white-space: nowrap;
  padding: 0 1rem;
  margin-left: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background-color: ${theme.colors.blue[500]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default AuthBtn;
