export interface IUser {
  name: string;
  x: number;
  y: number;
  direction: 'up' | 'down' | 'left' | 'right';
  state: 'left' | 'right' | 'mid';
  cId: number;
}
export interface IChat {
  status: string;
  text: string;
  name: string;
  cId: number;
  date: number;
  id: string;
}
export interface IUsers {
  [key: string]: IUser;
}

export interface IMargin {
  top: number;
  left: number;
}
