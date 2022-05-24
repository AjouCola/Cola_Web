import Api from './core';

interface ICreatePost {
  content: string;
  title: string;
  boardCategory: 'info' | 'common' | 'qna';
}
export const Board = {
  async create({ content, title, boardCategory }: ICreatePost) {
    return await Api.post(`/api/v1/posts`, { content, title, category: boardCategory }).catch((err) =>
      console.error(err),
    );
  },
  async get(postId: number) {
    //
    return await Api.get('/api/v1/posts/' + (postId + '')).catch((err) => console.log(err));
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

// const data = {
//   content: [
//     {
//       postId: 360,
//       title: 'title19',
//       userInfo: { userId: 23, userName: null },
//       createdDate: '2022-05-24T05:46:24.349521',
//       modifiedDate: '2022-05-24T05:46:24.349521',
//     },
//     {
//       postId: 359,
//       title: 'title18',
//       userInfo: { userId: 23, userName: null },
//       createdDate: '2022-05-24T05:46:24.336049',
//       modifiedDate: '2022-05-24T05:46:24.336049',
//     },
//     {
//       postId: 358,
//       title: 'title17',
//       userInfo: { userId: 23, userName: null },
//       createdDate: '2022-05-24T05:46:24.322585',
//       modifiedDate: '2022-05-24T05:46:24.322585',
//     },
//     {
//       postId: 357,
//       title: 'title16',
//       userInfo: { userId: 23, userName: null },
//       createdDate: '2022-05-24T05:46:24.309016',
//       modifiedDate: '2022-05-24T05:46:24.309016',
//     },
//     {
//       postId: 356,
//       title: 'title15',
//       userInfo: { userId: 23, userName: null },
//       createdDate: '2022-05-24T05:46:24.29385',
//       modifiedDate: '2022-05-24T05:46:24.29385',
//     },
//     {
//       postId: 355,
//       title: 'title14',
//       userInfo: { userId: 23, userName: null },
//       createdDate: '2022-05-24T05:46:24.280339',
//       modifiedDate: '2022-05-24T05:46:24.280339',
//     },
//   ],
//   pageable: {
//     sort: { empty: false, sorted: true, unsorted: false },
//     offset: 0,
//     pageNumber: 0,
//     pageSize: 6,
//     paged: true,
//     unpaged: false,
//   },
//   totalPages: 4,
//   totalElements: 20,
//   last: false,
//   size: 6,
//   number: 0,
//   sort: { empty: false, sorted: true, unsorted: false },
//   numberOfElements: 6,
//   first: true,
//   empty: false,
// };
