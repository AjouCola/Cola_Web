/* eslint-disable camelcase */
import { atom, selector, selectorFamily } from 'recoil';

import TodoApi, { ITodo } from '@utils/api/Todo';

// import { any } from '@utils/api/Todo';
export interface ITodoState {
  [key: string]: ITodo[];
}
export interface ITodoFolder {
  name: string;
  color: string;
  items_id: number;
  todos: ITodo[];
}
// 해당 날짜의 투두 폴더 리스트
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

export const todoListState = atom({
  key: 'todoFoldersState',
  default: [] as ITodoFolder[],
});
export const todoListSelector = selectorFamily({
  key: 'todoFolders',
  get:
    (date: Date) =>
    async ({ get }) => {
      const contents = await TodoApi.getTodoList(date.toISOString().slice(0, 10));
      const { folders } = contents;

      const todoList = folders?.map((folder: any) => ({
        name: folder.name,
        color: folder.color,
        items_id: folder.items.items_id,
        todos: folder.items.todos,
      }));
      // return [folderOrders, todoList]:[];
      return todoList;
    },
});
export const todoList = atom({
  key: 'todoFolersState',
  default: [],
});
