import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { FlexDiv } from '@styles/index';
import { theme } from '@styles/theme';

const Title = styled.h3`
  color: ${theme.colors.blue['400']};
  width: 10rem;
  padding: 0.5rem 0;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: start;
  margin-top: 1rem;
`;

const Wrapper = styled(FlexDiv)`
  align-items: center;
  width: 100%;
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    flex-direction: column;
  }
`;

const InputStyle = styled.input`
  box-shadow: 0px 0px 5px ${({ theme }) => theme.colors.shadow};
  border: none;
  padding-left: 1rem;
  min-height: 4rem;
  width: 100%;
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    height: 3rem;
    min-height: 3rem;
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0); 
  }
  100% {
    transform: rotate(360deg); 
  } 
  
`;
const Spinner = styled.span<{ size?: string; color?: string }>`
  height: ${({ size }) => (!size ? '1.6rem' : size)};
  width: ${({ size }) => (!size ? '1.6rem' : size)};
  color: ${({ color }) => (!color ? '#b2c9ff80' : color)};
  position: relative;
  display: inline-block;
  border: 5px solid;
  border-radius: 50%;
  border-right-color: white;
  animation: ${rotate} 1s linear infinite;
`;

export { Title, ErrorMessage, Wrapper, InputStyle, Spinner };
