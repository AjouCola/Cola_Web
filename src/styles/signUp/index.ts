import styled from '@emotion/styled';

import { theme } from '@styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
`;
const SubContainer = styled(Container)``;
const Wrapper = styled.div`
  display: flex;
`;
const Title = styled.h1`
  font-size: 4.8rem;
  color: ${theme.colors.blue[500]};
  padding: 1rem;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    font-size: 3rem;
    padding: 0;
  }
`;
const MajorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;
const SubTitle = styled.h3`
  color: ${theme.colors.blue['400']};
  white-space: nowrap;
  width: 5rem;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const SubFormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  input {
    width: 250px;
    height: 40px;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;
const BtnWrapper = styled.div`
  padding: 4vmin;
  display: flex;
  width: 100%;
  justify-content: space-between;
  svg {
    cursor: pointer;
    :hover {
      opacity: 50%;
    }
  }
`;
const ErrorMsg = styled.p`
  width: 100%;
  margin: 0;
  padding: 5px 0 10px 0;
  color: red;
`;
const EmailAuthBtn = styled.button`
  align-self: center;
  justify-self: center;
  padding: 0.5rem 1rem;
`;
const SubmitBtn = styled.button`
  width: 100%;
  padding: 1rem;
`;

const Select = styled.select`
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;
  width: 100%;
  padding: 1.5rem 3rem 1.5rem 1rem;
  border: none;
  background: white;
  box-shadow: 0px 0px 5px ${({ theme }) => theme.colors.shadow};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: 0px;
    top: 6px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 12px 7px 0 7px;
    border-color: ${({ theme }) => theme.colors.blue['200']} transparent transparent transparent;
    opacity: 1;
  }
`;

const Triangle = styled.div`
  position: absolute;
  right: 0px;
  top: 6px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 12px 7px 0 7px;
  border-color: ${({ theme }) => theme.colors.blue['200']} transparent transparent transparent;
  opacity: 1;
`;

export {
  Container,
  SubContainer,
  Title,
  SubTitle,
  Wrapper,
  FormWrapper,
  SubFormWrapper,
  InputWrapper,
  BtnWrapper,
  ErrorMsg,
  EmailAuthBtn,
  SubmitBtn,
  Select,
  Triangle,
  MajorWrapper,
};
