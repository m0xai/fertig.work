import { IUser } from './IUser';

export interface IRole {
  name: string;
  description: string;
  parentRole?: IRole;
  responsibleUser?: IUser;
}
