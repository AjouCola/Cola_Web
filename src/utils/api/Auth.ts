import Api from './core';

const Auth = {
  async checkEmail(email: string) {
    return await Api.post('/api/v1/auth/mail', { email }).catch((err) => console.error(err));
  },
  async checkEmailCode(token: string) {
    return await Api.post('/api/v1/auth/confirm', { token }).catch((err) => console.error(err));
  },
  async signUp({ name, department, ajouEmail, gitEmail }: any) {
    return await Api.post('/api/v1/auth/signUp', {
      name,
      department,
      ajouEmail,
      gitEmail,
    }).catch((err) => console.error(err));
  },
  async getUser() {
    return await Api.get('/api/v1/users').catch((err) => console.log(err));
  },
  async logout() {
    return await Api.get('/api/v1/auth/logout');
  },
};
export default Auth;
