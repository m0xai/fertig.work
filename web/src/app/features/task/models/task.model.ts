import { ResourceModel } from 'src/app/shared/ResourceModel';

export class Task extends ResourceModel<Task> {
  public name?: string;
  public description?: string;
  public isDone?: boolean;
  public isDraft?: boolean;
  public createdBy?: number;
  public taskList?: number;

  constructor(model?: Partial<Task>) {
    super(model);
  }
}

export enum ETaskPriority {
  VERYLOW = "Very Low",
  LOW = "Low",
  NORMAL = "NORMAL",
  HIGH = "High",
  VERYHIGH = "Very High"
}

export enum ETaskStatus {
  OPEN = "OPEN",
  REVIEW = "Review",
  APPROVED = "Approved",
  REJECTED = "Rejected",
}
