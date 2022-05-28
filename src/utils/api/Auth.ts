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
  async edit(params: { name: string; department: string; gitEmail: string }) {
    return await Api.put(`/api/v1/users`, params);
  },
};
export default Auth;
