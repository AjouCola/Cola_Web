import Api from './core';

const Auth = {
  async checkEmail(email: string) {
    const res = await Api.post('/api/v1/auth/mail', { email }).catch((err) => console.error(err));
    return res;
  },
  async checkEmailCode(token: string) {
    const res = await Api.post('/api/v1/auth/confirm', { token }).catch((err) => console.error(err));
    return res;
  },
};
export default Auth;
