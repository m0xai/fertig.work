import { ResourceModel } from "../../../shared/ResourceModel";

export class User extends ResourceModel<User> {
  public username?: string;
  public password?: string;
  public email?: string;

  constructor(model?: Partial<User>) {
    super(model);
  }
}
