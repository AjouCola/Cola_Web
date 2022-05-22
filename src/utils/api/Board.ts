import Api from './core';

interface ICreatePost {
  content: string;
  title: string;
}
export const Board = {
  async create({ content, title }: ICreatePost) {
    return await Api.post('/api/v1/posts', { content, title }).catch((err) => console.error(err));
  },
  async get(postId: number) {
    //
    return await Api.get('/api/v1/posts/' + (postId + '')).catch((err) => console.log(err));
  },
};
