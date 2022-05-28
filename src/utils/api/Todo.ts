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
  items: IItem;
}
export interface IFolders {
  date: string;
  folder_orders: number[];
  folders: IFolder[];
}

const contents: IFolders = {
  date: '2022-05-27',
  folder_orders: [1, 2],
  folders: [
    {
      name: 'asdf',
      color: '#ffffff',
      items: {
        items_id: 1,
        todos: JSON.parse(
          JSON.stringify([
            { id: 1, content: 'asdf', status: 'todo' },
            { id: 3, content: 'asdf2', status: 'doing' },
            { id: 7, content: 'asdf3', status: 'done' },
          ]),
        ),
      },
    },
    {
      name: 'asdf2',
      color: '#ffffff',
      items: {
        items_id: 2,
        todos: JSON.parse(
          JSON.stringify([
            { id: 2, content: 'asdf2', status: 'todo' },
            { id: 5, content: 'asdf5', status: 'done' },
            { id: 6, content: 'asdf6', status: 'done' },
          ]),
        ),
      },
    },
  ],
};
const TodoApi = {
  getTodoList: async (date: string): Promise<IFolders> => {
    // const { contents } = await Api.get('/api/v1/todos/' + date);
    return contents;
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
