export interface Todo {
  id: number;
  name: string;
  description: string;
  isDone: boolean;
  isDraft: boolean;
  createdAt: Date;
  updatedAt: Date;
}
