import Api from './core';

interface IPost {
  content: string;
  preview: string;
  title: string;
  tags?: string[];
  thumbnailPath: string;
}
interface ICreatePost extends IPost {
  boardCategory: 'info' | 'common' | 'qna';
}
interface IUpdatePost extends IPost {
  postId: number;
  content: string;
  preview: string;
  title: string;
  thumbnailPath: string;
  tags: string[];
}
export const Board = {
  async create({ content, preview, title, thumbnailPath, tags, boardCategory }: ICreatePost) {
    return await Api.post(`/api/v1/posts/` + boardCategory, { content, preview, title, tags, thumbnailPath }).catch(
      (err) => console.error(err),
    );
  },
  async get(postId: number) {
    return await Api.get('/api/v1/posts/' + (postId + '')).catch((err) => console.log(err));
  },
  async edit({ content, preview, title, thumbnailPath, postId, tags }: IUpdatePost) {
    await Api.patch('/api/v1/posts/' + postId, { thumbnailPath, preview, content, tags, title }).catch(() =>
      alert('게시글을 수정하는 중에 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.'),
    );
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
    sort?: 'recent' | 'favorCount';
    boardCategory: 'common' | 'info' | 'qna';
  }) {
    const data = (await Api.get(`/api/v1/posts?category=${boardCategory}`, {
      params: {
        page: pageParam,
        size,
        sort: sort === 'favorCount' ? 'favorCount,Desc' : '',
      },
    })) as unknown as any;
    return {
      result: data.content,
      nextPage: data.pageable.pageNumber + 1,
      isLast: data.last,
    };
  },
};
