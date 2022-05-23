import Api from './core';

const User = {
  async getUserInfo() {
    return await Api.get('/api/v1/users').catch((err) => console.error(err));
  },
};

export default User;
