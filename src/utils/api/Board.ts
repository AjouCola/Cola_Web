import Api from './core';

interface IPost {
  content: string;
  title: string;
  hashtags?: string;
}
interface ICreatePost extends IPost {
  boardCategory: 'info' | 'common' | 'qna';
}
interface IUpdatePost extends IPost {
  postId: number;
}
export const Board = {
  async create({ content, title, hashtags, boardCategory }: ICreatePost) {
    return await Api.post(`/api/v1/posts/` + boardCategory, { content, title, hashtags }).catch((err) =>
      console.error(err),
    );
  },
  async get(postId: number) {
    return await Api.get('/api/v1/posts/' + (postId + '')).catch((err) => console.log(err));
  },
  async edit({ content, title, postId, hashtags }: IUpdatePost) {
    await Api.patch('/api/v1/posts/' + postId, {
      content,
      hashtags,
      title,
    }).catch(() => alert('게시글을 수정하는 중에 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.'));
  },
  async delete(postId: number) {
    return await Api.delete('/api/v1/posts/' + postId).catch(() => alert('게시글 삭제 중 문제가 발생하였습니다.'));
  },
  async getList({
    pageParam = 0,
    size,
    sort,
    boardCategory,
  }: {
    pageParam: number;
    size?: number;
    sort?: string;
    boardCategory: 'common' | 'info' | 'qna';
  }) {
    const data = (await Api.get(`/api/v1/posts?category=${boardCategory}`, {
      params: {
        page: pageParam,
        size,
        sort,
      },
    })) as unknown as any;
    return {
      result: data.content,
      nextPage: data.pageable.pageNumber + 1,
      isLast: data.last,
    };
  },
};
