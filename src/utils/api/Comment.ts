import Api from './core';

export const CommentApi = {
  async create(postId: number, content: string) {
    return await Api.post(`/api/v1/posts/${postId}/comments`, { content });
  },
  async get(postId: number) {
    return await Api.post(`/api/v1/posts/${postId}/comments`);
  },
  async delete(commentId: number) {
    return await Api.delete(`/api/v1/comments/${commentId}`).catch(() =>
      alert('댓글 삭제 중 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.'),
    );
  },
};
