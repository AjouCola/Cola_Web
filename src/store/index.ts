import { atom, selector } from 'recoil';

export interface IToDo {
  id: number;
  content: string;
}
export interface ITodoState {
  [key: string]: IToDo[];
}
export const todoState = atom<ITodoState>({
  key: 'todoState',
  default: {} as ITodoState,
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
