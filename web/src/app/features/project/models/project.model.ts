import { ResourceModel } from "../../../shared/ResourceModel";

export class Project extends ResourceModel<Project> {
	public title?: string;
	public description?: string;
	public isArchived?: boolean;
	public startOn?: Date;
	public createdBy?: number;

	constructor(model?: Partial<Project>) {
		super(model);
	}
}
