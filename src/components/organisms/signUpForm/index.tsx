import { MouseEvent, useState } from 'react';

import { useForm, UseFormRegister } from 'react-hook-form';

import { SignUpFormInterface, SignUpData } from './index.type';
import { SignUpFormStyle, CheckIcon } from './styles';

import SubmitBtn from '@components/atoms/button/submit';
import SignUpInput from '@components/organisms/signUpInput';
import { MAJOR_TYPE } from '@constants/index';
import { FlexDiv } from '@styles/index';
import { Select, Triangle, SubTitle } from '@styles/signUp';
import Auth from '@utils/api/Auth';

interface Props {
  handleModalOnOff: () => void;
  major: keyof typeof MAJOR_TYPE;
  onSubmitForm: (name: string, department: string, ajouEmail: string, gitEmail: string) => void;
}

interface SelectBoxProps extends Props {
  register: UseFormRegister<SignUpFormInterface>;
}

const MajorSelectBox = ({ major, handleModalOnOff, register }: SelectBoxProps) => {
  return (
    <div style={{ position: 'relative' }}>
      <Select onClick={handleModalOnOff} {...register('department', SignUpData.department)}>
        <option value={MAJOR_TYPE[major]} hidden>
          {MAJOR_TYPE[major]}
        </option>
      </Select>
      <Triangle />
    </div>
  );
};

const SignUpForm = ({ handleModalOnOff, major, onSubmitForm }: Props) => {
  const [checkEmail, setCheckEmail] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<SignUpFormInterface>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '@ajou.ac.kr',
    },
  });

  const onClickEmailAuth = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // onSubmit이 아니기때문에 validation을 trigger한다.
    const result = await trigger('email');
    if (!result) return;

    const emailValue = getValues('email');
    const emailCodeValue = getValues('emailCheck');
    if (!checkEmail) {
      // 이메일 인증 필요
      try {
        const data = await Auth.checkEmail(emailValue);
        console.log('checkEmail data:', data);
        setCheckEmail(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      // 이메일 인증 코드 확인
      try {
        const resData = await Auth.checkEmailCode(emailCodeValue);
        console.log('checkEmailCode data : ', resData);
        if (resData) {
          setIsEmailValid(true);
        }
      } catch (err) {
        console.log(err);
      }
      // TODO: email code 비교 및 체크하기
    }
  };

  const onSubmit = (data: SignUpFormInterface) => {
    if (!isEmailValid) return;
    console.log(data);
    onSubmitForm(data.name, major, data.email, data.gitEmailId);
  };

  const handleChange = () => {
    setIsEmailValid(false);
    setCheckEmail(false);
  };

  return (
    <SignUpFormStyle onSubmit={handleSubmit(onSubmit)}>
      <SignUpInput
        placeholder="이름"
        content="이름"
        {...register('name', SignUpData.name)}
        error={errors.name?.message}
      />
      <FlexDiv direction="row" style={{ position: 'relative' }}>
        <SignUpInput
          placeholder="아주대 메일"
          content="이메일 인증"
          buttonContent={!isEmailValid ? '인증' : undefined}
          onClick={onClickEmailAuth}
          {...register('email', SignUpData.email)}
          error={errors.email?.message}
          onChange={handleChange}
        />
        {isEmailValid && <CheckIcon />}
      </FlexDiv>
      {checkEmail && !isEmailValid && (
        <SignUpInput
          type="password"
          placeholder="인증번호를 입력하세요"
          buttonContent="확인"
          onClick={onClickEmailAuth}
          {...register('emailCheck', SignUpData.emailCheck)}
          error={errors.emailCheck?.message}
        />
      )}
      <FlexDiv direction="row">
        <SubTitle>학과</SubTitle>
        <MajorSelectBox
          major={major}
          register={register}
          handleModalOnOff={handleModalOnOff}
          onSubmitForm={onSubmitForm}
        />
      </FlexDiv>
      <SignUpInput
        placeholder="GIT 이메일"
        content="GIT 계정"
        {...register('gitEmailId', SignUpData.gitEmailId)}
        error={errors.gitEmailId?.message}
      />
      <SubmitBtn size="medium">SAVE</SubmitBtn>
    </SignUpFormStyle>
  );
};

export default SignUpForm;
