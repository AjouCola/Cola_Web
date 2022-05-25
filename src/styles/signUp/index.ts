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
  font-size: 5rem;
  color: ${theme.colors.blue[500]};
  padding: 55px 0px 70px 0;
`;

const SubTitle = styled.h3`
  margin-top: 1vh;
  color: ${theme.colors.blue['400']};
  width: 8vw;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 2vh;
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
  min-width: 350px;
  min-height: 60px;
  padding-left: 12px;
  border: none;
  background: white;
  box-shadow: 0px 0px 5px ${({ theme }) => theme.colors.shadow};
`;

const Triangle = styled.div`
  position: absolute;
  right: 20px;
  top: 24px;
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
};
