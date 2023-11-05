import { ResourceModel } from "../../../shared/ResourceModel";

export class Collaborator extends ResourceModel<Collaborator> {
	public user?: number;
	public project?: number;
	public role?: string;
	public isJoined?: boolean;
	public joinedOn?: Date;
	public isInvited?: boolean;
	public invitedOn?: Date;
	public isLeft?: boolean;
	public leftOn?: Date;

	constructor(model?: Partial<Collaborator>) {
		super(model);
	}
}
