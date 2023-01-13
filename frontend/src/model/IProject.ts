import { IUser } from './IUser';

export interface ISingleProject {
  name: string;
  description: string;
  isArchived: boolean;
  user: IUser;
}
