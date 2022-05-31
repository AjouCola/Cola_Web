import Api from './core/index';

const FavorApi = {
  async saveFavor({ postId, status }: { postId: number; status: boolean }) {
    return await Api.get('/api/v1/posts/favor/' + postId, {
      params: {
        status,
      },
    });
  },
};
export default FavorApi;
