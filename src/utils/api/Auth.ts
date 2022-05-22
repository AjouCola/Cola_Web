import Api from './core';

const Auth = {
  async checkEmail(email: string) {
    const { data }: any = await Api.post('/api/v1/auth/mail', { email }).catch((err) => console.error(err));
    return data;
  },
  async checkEmailCode(token: string) {
    const { data }: any = await Api.post('/api/v1/auth/confirm', { token }).catch((err) => console.error(err));
    return data;
  },
};
export default Auth;
