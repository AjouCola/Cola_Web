import Api from './core';

const User = {
  async getUserInfo() {
    return await Api.get('/api/v1/users').catch((err) => console.error(err));
  },
  async edit(params: { name: string; department: string; gitEmail: string }) {
    return await Api.put(`/api/v1/users`, params).catch((err) => console.error(err));
  },
  async logout() {
    return await Api.get('/login');
  },
};

export default User;
