import { atom } from 'recoil';

export interface IEditPost {
  postId: number;
  title: string;
  content: string;
  tags: string[];
  thumbnailPath: string;
  preview: string;
}
export const editPostData = atom({
  key: 'editPostData',
  default: {} as IEditPost,
});
