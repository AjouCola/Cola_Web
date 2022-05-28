import { MouseEvent, forwardRef } from 'react';

import { Title, InputStyle, Wrapper, ErrorMessage, Spinner } from './styles';

import AuthBtn from '@components/atoms/button/auth';
import { FlexDiv } from '@styles/index';

interface InputProps {
  content?: string;
  buttonContent?: string;
  error: string | undefined;
  type?: string;
  placeholder: string;
  onChange?: any;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  authBtnSuspense?: boolean;
  disabled?: boolean;
}

const SignUpInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      content,
      error,
      type = 'text',
      placeholder,
      buttonContent,
      onClick,
      onChange,
      authBtnSuspense,
      disabled,
      ...rest
    },
    ref,
  ) => {
    return (
      <FlexDiv direction="column">
        <Wrapper direction="row">
          <Title>{content}</Title>
          <InputStyle
            ref={ref}
            {...rest}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
          />
          {buttonContent !== undefined && !disabled && (
            <AuthBtn onClick={onClick}>{authBtnSuspense ? <Spinner></Spinner> : buttonContent}</AuthBtn>
          )}
        </Wrapper>
        {error !== undefined && !disabled && <ErrorMessage>{error}</ErrorMessage>}
      </FlexDiv>
    );
  },
);

SignUpInput.displayName = 'SignUpInput';

export default SignUpInput;
