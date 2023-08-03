import { ResourceModel } from 'src/app/shared/ResourceModel';
import { UserModel } from "../../user/models/user";

export class Task extends ResourceModel<Task> {
  public name?: string;
  public description?: string;
  public isDone?: boolean;
  public isDraft?: boolean;
  public created?: UserModel

  constructor(model?: Partial<Task>) {
    super(model);
  }
}

export enum ETaskPriority {
  VERYLOW = "Very Low",
  LOW = "Low",
  NORMAL = "Normal",
  HIGH = "High",
  VERYHIGH = "Very High"
}

export enum ETaskStatus {
  OPEN = "Open",
  REVIEW = "Review",
  APPROVED = "Approved",
  REJECTED = "Rejected",
}
