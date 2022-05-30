/* eslint-disable camelcase */

import Api from './core';

import { ITodoFolder } from '@store/index';
export interface ITodo {
  id: number;
  content: string;
  status: 'todo' | 'inProgress' | 'done';
}
export interface IItem {
  items_id: number;
  progress: number;
  todos: ITodo[] | string;
}
export interface IFolder {
  name: string;
  color: string;
  item: IItem | null;
  folder_id: number;
}
export interface IFolders {
  date: string;
  folders: IFolder[];
}

export interface ISaveTodoFolders {
  date: string;
  folderId: number;
  progress: number;
  todos: string;
}
const TodoApi = {
  getTodoList: async (date: string): Promise<any> => {
    return (await Api.get('/api/v1/todos/' + date)) as unknown as any;
  },
  saveTodoList: async (date: string, todoList: ITodoFolder[]): Promise<boolean> => {
    const res = (await Api.post('/api/v1/item', {
      itemDtos: todoList.map((folder) => ({
        date,
        folderId: folder.folder_id,
        progress: folder.progress,
        todos: JSON.stringify(folder.todos),
      })),
    }).catch((err) => console.error(err))) as unknown as Promise<boolean>;
    return res;
    // if (!res?.data?.success) retu rn false;
  },
  createFolder: async (name: string, color: string) => {
    await Api.post('/api/v1/folder', {
      name,
      color,
    });
  },
};
export default TodoApi;
