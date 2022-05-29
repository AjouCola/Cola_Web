/* eslint-disable camelcase */

import Api from './core';

export interface ITodo {
  id: number;
  content: string;
  status: 'todo' | 'doing' | 'done';
}
export interface IItem {
  items_id: number;
  todos: ITodo[];
}
export interface IFolder {
  name: string;
  color: string;
  item: IItem | null;
}
export interface IFolders {
  date: string;
  folder_orders: number[];
  folders: IFolder[];
}

const TodoApi = {
  getTodoList: async (date: string): Promise<IFolders> => {
    return (await Api.get('/api/v1/todos/' + date)) as unknown as any;

    // return data;
  },
  saveTodoList: async (date: Date, todoList: any): Promise<boolean> => {
    // const res = await Api.post('/todo', {
    //   date,
    //   todoList: JSON.stringify(todoList),
    // }).catch((err) => console.error(err));

    // if (!res?.data?.success) return false;
    console.log('save todolist', date, JSON.stringify(todoList));
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });
  },
  createFolder: async (name: string, color: string) => {
    await Api.post('/api/v1/folder', {
      name,
      color,
    });
  },
};
export default TodoApi;
