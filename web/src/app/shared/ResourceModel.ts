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

	static isEqual(obj1: any, obj2: any) {
		const props1 = Object.getOwnPropertyNames(obj1);
		const props2 = Object.getOwnPropertyNames(obj2);
		if (props1.length != props2.length) {
			return false;
		}
		for (const element of props1) {
			const val1: any = obj1[element];
			const val2: any = obj2[element];
			const isObjects = this.isObject(val1) && this.isObject(val2);
			if ((isObjects && !this.isEqual(val1, val2)) || (!isObjects && val1 !== val2)) {
				return false;
			}
		}
		return true;
	}

	static isObject(object: any) {
		return object != null && typeof object === "object";
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
