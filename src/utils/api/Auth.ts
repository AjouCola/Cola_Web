import Api from './core';

const Auth = {
  async checkEmail(email: string) {
    return await Api.post('/api/v1/auth/mail', { email }).catch((err) => console.error(err));
  },
  async checkEmailCode(token: string) {
    return await Api.post('/api/v1/auth/confirm', { token }).catch((err) => console.error(err));
  },
  async signUp({ name, department, ajouEmail, gitEmail }: any) {
    return await Api.post('/api/v1/users/sign-up', {
      name,
      department,
      ajouEmail,
      gitEmail,
    }).catch((err) => console.error(err));
  },
};
export default Auth;
