import { ResourceModel } from 'src/app/shared/ResourceModel';

export class Task extends ResourceModel<Task> {
  public name?: string;
  public description?: string;
  public isDone?: boolean;
  public priority?: ETaskPriority;
  public isDraft?: boolean;
  public createdBy?: number;
  public taskList?: number;
  public status?: ETaskStatus;

  public static create() {
    return new Task();
  }

  public withName(value: string) {
    this.name = value;
    return this;
  }

  public withDescription(value: string) {
    this.description = value;
    return this;
  }

  public withIsDone(value: boolean) {
    this.isDone = value;
    return this;
  }

  public withIsDraft(value: boolean) {
    this.isDraft = value;
    return this;
  }

  public withCreatedBy(value: number) {
    this.createdBy = value;
    return this;
  }

  public withTaskList(value: number) {
    this.taskList = value;
    return this;
  }

  public withStatus(value: ETaskStatus) {
    this.status = value;
    return this;
  }

  public withPriority(value: ETaskPriority) {
    this.priority = value;
    return this;
  }

  public build() {
    return new Task(this);
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
