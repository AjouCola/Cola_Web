import { useSetRecoilState } from 'recoil';

import Api from './core';

// import { doings, toDos, dones } from '@constants/todoDummy';
import { IToDo, ITodoState, todoState } from '@store/index';

export interface ITodo {
  id: number;
  content: string;
  status: 'todo' | 'doing' | 'done';
}
export interface IItem {
  item_id: number;
  todos: IToDo[] | string;
}
export interface IFolder {
  name: string;
  color: string;
  item: IItem[];
}
export interface IFolders {
  date: string;
  folder_orders: number[];
  folders: IFolder[];
}

const TodoApi = {
  getTodoList: async (date: Date): Promise<ITodoFolder[]> => {
    const results: [IItemDto[], IFolderDto[]] = await Promise.all([
      Api.get(`/api/v1/item/` + date.toISOString().slice(0, 10)) as unknown as IItemDto[],
      Api.get('/api/v1/folder') as unknown as IFolders,
    ]);

    const [ItemDtos, FolderDtos] = results;

    const folderList = ItemDtos.map((itemDto, idx) => {
      const parsedTodos = JSON.parse(itemDto.todos);

      const folder = FolderDtos.find((folder) => folder.folderId === itemDto.folderId);

      return {
        todos: parsedTodos,
        ...folder,
        progress: itemDto.progress,
      } as ITodoFolder;
    });

    return folderList;
  },
  saveTodoList: async (date: Date, todoList: ITodoFolder[]): Promise<boolean> => {
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
