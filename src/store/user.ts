import { atom } from 'recoil';

export interface IUserInfo {
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
