import styled from '@emotion/styled';

import Check from 'public/check.svg';

const SignUpFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-start;
  width: 30rem;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    width: 100vw;
    gap: 1rem;
    width: 100%;
    padding: 0 1rem;
  }
`;

const CheckIcon = styled(Check)`
  position: absolute;
  right: 20px;
  top: 20px;
`;

export { SignUpFormStyle, CheckIcon };
