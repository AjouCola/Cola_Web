import Api from './core';

export const CommentApi = {
  async create(postId: number, content: string) {
    return await Api.post(`/api/v1/posts/${postId}/comments`, { content });
  },
  async get(postId: number) {
    return await Api.post(`/api/v1/posts/${postId}/comments`);
  },
};
