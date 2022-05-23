import { atom } from 'recoil';

export interface IUserInfo {
  createdDate: string;
  modifiedDate: string;
  id: number;
  role: string;
  email: string;
  name: string | null;
  ajouEmail: string;
  gitEmail: string;
  department: string;
  profilePath: string | null;
  roleKey: string;
  verified: boolean;
}
export const userState = atom<IUserInfo>({
  key: 'userState',
  default: {} as IUserInfo,
});
