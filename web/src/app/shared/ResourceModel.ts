import IResource from "./models/IResource";

export abstract class ResourceModel<T> implements IResource {
	public id?: number;
	public createdAt?: Date;
	public updatedAt?: Date;

	constructor(model?: Partial<T>) {
		if (model) {
			Object.assign(this, model);
		}
	}

	getId(): number {
		return this.id!;
	}

	public toJson(): any {
		return JSON.parse(JSON.stringify(this));
	}

	public isValid(): boolean {
		for (const member in this) {
			if (this[member] == null) {
				return false;
			}
		}
		return true;
	}
}
