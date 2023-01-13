import { IRole } from './IRole';

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  isActive: string;
  role: IRole;
}
