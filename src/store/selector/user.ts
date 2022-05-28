import Auth from '@utils/api/Auth';
import { AxiosResponse } from 'axios';
import { selector, selectorFamily } from 'recoil';

import { atom } from 'recoil';

export interface IUserInfo {
  state: string;
  createdDate: string;
  modifiedDate: string;
  id: number;
  role: string;
  email: string;
  name: string;
  ajouEmail: string;
  gitEmail: string | null;
  department: string;
  profilePath: string | null;
  roleKey: string;
  verified: boolean;
}

export const userState = atom<IUserInfo>({
  key: 'userState',
  default: {} as IUserInfo,
});

export const useUserSelector = selectorFamily({
  key: 'useUserSelector',
  get: () => async () => {
    const data = (await Auth.getUser()) as unknown as IUserInfo;
    return data;
  },
  set:
    () =>
    ({ set }) => {
      set(userState, {} as IUserInfo);
    },
});
