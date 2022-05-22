import Api from './core';

const Auth = {
  async checkEmail(email: string) {
    return await Api.post('/api/v1/auth/mail', { email }).catch((err) => console.error(err));
  },
  async checkEmailCode(token: string) {
    return await Api.post('/api/v1/auth/confirm', { token }).catch((err) => console.error(err));
  },
};
export default Auth;
