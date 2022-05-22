import { atom } from 'recoil';

export const todoModal = atom({
  key: 'todoModalState',
  default: false,
});

interface IContent {
  id: any;
  content: any;
}
export const todoModalContent = atom<IContent>({
  key: 'todoModalContentState',
  default: {
    id: null,
    content: null,
  },
});

export const todoEditMode = atom({
  key: 'todoEditModeState',
  default: null,
});
