import { atom } from 'recoil';

export interface IEditPost {
  postId: number;
  title: string;
  content: string;
  tags: string[];
}
export const editPostData = atom({
  key: 'editPostData',
  default: {
    postId: 8,
    postType: 'common',
    title: '출근길',
    content:
      '## 출근길\n 다들 출근길에는 무엇을 하면서 보내시나요??\n저는 보통 잠을 잡니다\n\n### 마지막 출근\n내일이 마지막 출근이네요 ㅎㅎ 앞으로는 소프트웨어 마에스트로 활동을 할 것 같습니다\n\n## 좋은하루보내세요',
    userInfo: {
      userId: 11,
      userName: '은승균',
      profilePath: null,
      department: 'SW',
    },
    comments: [
      {
        commentId: 3,
        userInfo: {
          userId: 14,
          userName: '서재명',
          profilePath: null,
          department: 'SW',
        },
        content: '고생하셨습니다! ',
      },
      {
        commentId: 4,
        userInfo: {
          userId: 5,
          userName: '홍성빈',
          profilePath:
            'https://cola-image-bucket.s3.ap-northeast-2.amazonaws.com/3c1b9402-8f4c-45ff-abba-4b0f36e2f3a9.png',
          department: 'SW',
        },
        content: '## 한 학기 동안 출근하시느라 고생하셨어요~',
      },
    ],
    tags: ['일상', '잡답', '직장인'],
    createdDate: '2022-05-30T08:15:23.024561',
    modifiedDate: '2022-05-30T08:15:23.024561',
  } as IEditPost,
});
