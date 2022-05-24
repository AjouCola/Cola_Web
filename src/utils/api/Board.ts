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
  async getList({ pageParam = 0, size, sort }: { pageParam: number; size?: number; sort?: string }) {
    const data = (await Api.get('/api/v1/posts', {
      params: {
        page: pageParam,
        size,
        sort,
      },
    })) as unknown as any;
    return {
      result: data.content,
      nextPage: data.pageNumber + 1,
      isLast: data.totalPages === data.pageNumber,
      ...data,
    };
  },
};
