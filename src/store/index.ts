import { atom, selector } from 'recoil';

import { ITodoFolder } from '@utils/api/Todo';
export interface IToDo {
  id: number;
  content: string;
  createdAt: string;
  modifiedAt?: string;
  folderId?: number;
}
export interface ITodoState {
  [key: string]: IToDo[];
}

export const todoState = atom<ITodoFolder[]>({
  key: 'todoState',
  default: [] as ITodoFolder[],
});

export const accessTokenState = atom<string>({
  key: 'accessToken',
  default: 'dummy',
});
export const loginSelector = selector<boolean>({
  key: 'loginState',
  get: ({ get }) => {
    const token = get(accessTokenState);
    if (token) return true;
    else return false;
  },
});
