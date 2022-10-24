import { MouseEvent, forwardRef } from 'react';

import { Title, InputStyle, ErrorMessage, Spinner } from './styles';

import AuthBtn from '@components/atoms/button/auth';

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
      <div style={{ width: '100%' }}>
        <div style={{ width: '100%' }}>
          <Title>{content}</Title>
          <div style={{ display: 'flex', width: '100%' }}>
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
          </div>
        </div>
        {error !== undefined && !disabled && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  },
);

SignUpInput.displayName = 'SignUpInput';

export default SignUpInput;
