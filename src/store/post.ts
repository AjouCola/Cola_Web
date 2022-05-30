import { atom } from 'recoil';

export interface IEditPost {
  postId: number;
  title: string;
  content: string;
  tags: string[];
}
export const editPostData = atom({
  key: 'editPostSTate',
  default: {} as IEditPost,
});
