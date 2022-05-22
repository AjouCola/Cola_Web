import { useSetRecoilState } from 'recoil';

import Api from './core';

import { doings, toDos, dones } from '@constants/todoDummy';
import { IToDo, ITodoState, todoState } from '@store/index';

export const getTodoList = async (date: Date): Promise<ITodoState> => {
  console.log('getTodolist', date);
  const data: ITodoState = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        '할 일': toDos,
        '하는 중': doings,
        '다 함': dones,
      } as ITodoState);
    }, 1500);
  });
  console.log('todo data', data);
  return data;
};

export const saveTodoList = async (date: Date, todoList: ITodoState): Promise<boolean> => {
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
};
