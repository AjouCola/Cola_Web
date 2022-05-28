import styled from '@emotion/styled';

import Check from 'public/check.svg';

const SignUpFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 2vh;
  align-items: flex-start;
  max-width: 30rem;
`;

const CheckIcon = styled(Check)`
  position: absolute;
  right: 20px;
  top: 20px;
`;

export { SignUpFormStyle, CheckIcon };
