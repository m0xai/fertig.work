import IResource from './models/IResource';

export abstract class ResourceModel<T> implements IResource {
  public id?: number;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(model?: Partial<T>) {
    if (model) {
      Object.assign(this, model);
    }
    if (this.createdAt) {
      this.createdAt = new Date(this.createdAt);
    }
    if (this.updatedAt) {
      this.updatedAt = new Date(this.updatedAt);
    }
  }

  getId(): number {
    return this.id!;
  }

  public toJson(): any {
    return JSON.parse(JSON.stringify(this));
  }
}
