import { ResourceModel } from 'src/app/shared/ResourceModel';

export class TodoModel extends ResourceModel<TodoModel> {
  public name?: string;
  public description?: string;
  public isDone?: boolean;
  public isDraft?: boolean;

  constructor(model?: Partial<TodoModel>) {
    super(model);
  }
}
