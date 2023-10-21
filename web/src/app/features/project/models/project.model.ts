import { ResourceModel } from "../../../shared/ResourceModel";

export class Project extends ResourceModel<Project> {
	private title?: string;
	private description?: string;
	private isArchived?: boolean;
	private startOn?: Date;
	private createdBy?: number;

	constructor(model?: Partial<Project>) {
		super(model);
	}
}
