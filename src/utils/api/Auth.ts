import Api from './core';

const responseBody = (message: string) => {
  return {
    code: 200,
    status: 'success',
    data: {
      message: message,
    },
  };
};
const promiseResponse = (message: string) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(responseBody(message));
    }, 1000),
  );

const Auth = {
  policyAgreement({ service, privacy }: any) {
    console.log('policyAgreement', service, privacy);
    if (service && privacy) return promiseResponse('이용약관 동의 성공');
    else
      return new Promise((resolve) =>
        resolve({ code: 401, status: 'fail', data: { message: '이용약관에 모두 동의해주세요.' } }),
      );
  },
  checkEmail(email: string) {
    console.log('checkEmail', email);
    return promiseResponse('이메일 인증 성공');
  },
  signup(payload: any) {
    console.log('signup', payload);
    return promiseResponse('회원가입 성공');
  },
  async isUser(user: any) {
    const data = await Api.post('/user/isUser', {
      name: user.name,
      email: user.email,
      image: user.image,
    });
    return data;
  },
  async test() {
    const data = await Api.get('/test');
    return data;
  },
};
export default Auth;
