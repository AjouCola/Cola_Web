export interface SignUpFormInterface {
  password: string;
  passwordCheck: string;
  email: string;
  emailCheck: string;
  name: string;
  department: string;
  gitEmailId: string;
}

export const SignUpData = {
  password: {
    required: '비밀번호를 입력해주세요.',
    // TODO: 비밀번호 형식 pattern
  },
  passwordCheck: {
    required: '비밀번호를 다시 입력해주세요.',
    // TODO: 비밀번호 형식 pattern, password와 같은지 검증
  },
  email: {
    required: '아주대 이메일을 입력해주세요.',
    pattern: {
      value: /^[A-Za-z0-9._%+-]+@ajou.ac.kr$/,
      message: '아주대 이메일만 사용할 수 있습니다.',
    },
  },
  emailCheck: {},
  name: {
    required: '이름을 입력해주세요',
  },
  department: {
    required: '학과를 입력해주세요',
  },
  gitEmailId: {
    pattern: {
      value: /^[A-Za-z0-9._%+-]+@[\S+.]+$/,
      message: '이메일만 사용할 수 있습니다.',
    },
  },
};

export const SignUpType = {
  password: { type: 'password', placeholder: '비밀번호' },
  passwordCheck: { type: 'password', placeholder: '비밀번호 확인' },
  email: { type: 'text', label: '이메일 인증', placeholder: '아주대 메일' },
  emailCheck: { type: 'text', placeholder: '인증번호를 입력하세요' },
  name: { type: 'text', label: '이름', placeholder: '이름' },
  department: { type: 'text', placeholder: '학과' },
  gitEmailId: { type: 'text', label: 'GIT 계정', placeholder: 'GIT 이메일' },
};
