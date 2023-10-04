import { ResourceModel } from "../../../shared/ResourceModel";

export class TaskList extends ResourceModel<TaskList> {
	public title?: string;

	// tasks omitted here
	constructor(model?: Partial<TaskList>) {
		super(model);
	}
}
