import Api from './core';

const User = {
  async getUserInfo() {
    return await Api.get('/api/v1/users').catch((err) => console.error(err));
  },
  async edit(params: { name: string; department: string; gitEmail: string }) {
    return await Api.post(`/api/v1/users`, params);
  },
};

export default User;
